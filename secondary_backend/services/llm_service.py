import os
import json
import re
from datetime import datetime
from dotenv import load_dotenv
import google.generativeai as genai

# Cargar variables de entorno
dotenv_path = os.path.join(os.path.dirname(__file__), "../.env")
load_dotenv(dotenv_path)

# Configurar la clave de API de Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY no encontrada en .env")

genai.configure(api_key=gemini_api_key)

# Crear modelo
model = genai.GenerativeModel("gemini-pro")

async def analyze_with_llm(modified_files: list, event_id: int, event_type: str):
    """
    Analiza múltiples archivos modificados como parte de un PR o commit.
    Retorna una estructura completa del análisis para usar en frontend y backend.
    """
    analysis_result = {
        "id": f"{event_type}_{event_id}",
        "type": event_type,
        "date": datetime.utcnow().isoformat(),
        "files": [],
        "recommended_resources": [],
        "key_findings": []
    }

    for file in modified_files:
        try:
            prompt = build_prompt(file)
            print(f"\n🚀 Analizando: {file['file_path']}")
            response = model.generate_content(prompt)

            parsed = extract_json_from_response(response.text)

            # Estructura para un archivo
            file_analysis = {
                "file_path": file["file_path"],
                "language": file["language"],
                "overall_feedback": parsed.get("overall_feedback", ""),
                "quality_score": parsed.get("quality_score", 3),
                "suggestions": parsed.get("suggestions", []),
                "resources": parsed.get("resources", []),
                "key_findings": parsed.get("key_findings", [])
            }

            analysis_result["files"].append(file_analysis)
            analysis_result["recommended_resources"].extend(file_analysis["resources"])
            analysis_result["key_findings"].extend(file_analysis["key_findings"])

        except Exception as e:
            print(f"❌ Error al procesar {file['file_path']}: {str(e)}")

    return analysis_result

def build_prompt(file: dict) -> str:
    """
    Construye un prompt detallado y educativo para analizar código fuente.
    """
    return f"""
        Actúa como un mentor experto en revisión de código para desarrolladores junior.
        Analiza el siguiente archivo modificado como parte de un Pull Request.

        1. Detecta errores comunes, malas prácticas, problemas de seguridad, legibilidad y rendimiento.
        2. Proporciona comentarios por línea si es posible.
        3. Asigna un score general de calidad del 1 al 5.
        4. Resume los hallazgos más importantes (key_findings).
        5. Recomienda recursos útiles (videos, artículos, cursos).

        Archivo: {file['file_path']}
        Lenguaje: {file['language']}
        Líneas modificadas: {file['lines_changed']}
        Código:
        {file['code']}

        RESPONDE SÓLO con un JSON con la siguiente estructura:

        {{
        "overall_feedback": "Resumen global del archivo.",
        "quality_score": 4,
        "suggestions": [
            {{"line": 10, "comment": "Evita hardcodear valores.", "type": "security"}},
            {{"line": 22, "comment": "Considera dividir esta función en otras más pequeñas.", "type": "readability"}}
        ],
        "resources": [
            {{"title": "Curso de Clean Code", "url": "https://refactoring.guru/es"}}
        ],
        "key_findings": [
            "Falta manejo de errores.",
            "Uso inseguro de credenciales."
        ]
        }}
    """

def extract_json_from_response(text: str) -> dict:
    """
    Extrae el primer bloque JSON válido de una respuesta de texto.
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return json.loads(match.group())
    raise ValueError("No se encontró JSON válido en la respuesta del modelo.")