from fastapi import APIRouter, Request
from controllers.github_controller import handle_github_event

router = APIRouter()

@router.post("/")
async def receive_github_webhook(request: Request):
    payload = await request.json()
    event_type = request.headers.get("X-GitHub-Event")

    print("\n--- HEADERS DEL REQUEST ---")
    for key, value in request.headers.items():
        print(f"{key}: {value}")
    print("--- FIN DE HEADERS ---\n")

    await handle_github_event(payload, event_type)
    return {"status": "received"}
