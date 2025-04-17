import json

async def handle_github_event(payload: dict):
    print("\n--- GitHub Webhook recibido ---")
    print(json.dumps(payload, indent=2))
    print("--- Fin del webhook ---\n")
