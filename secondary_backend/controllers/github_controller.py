from services.github_service import analizar_push_commit, analizar_pull_request
import json

async def handle_github_event(payload: dict, event_type: str):
    print(f"\n--- GitHub Webhook recibido ({event_type}) ---")
    print(json.dumps(payload, indent=2))
    print("--- Fin del webhook ---\n")

    if event_type == "push":
        await analizar_push_commit(payload)

    elif event_type == "pull_request":
        action = payload.get("action")
        if action in ["opened", "synchronize", "reopened"]:
            await analizar_pull_request(payload)

    else:
        print(f"⚠️ Evento no manejado: {event_type}")
