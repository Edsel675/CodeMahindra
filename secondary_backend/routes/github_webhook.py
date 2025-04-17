from fastapi import APIRouter, Request
from controllers.github_controller import handle_github_event

router = APIRouter()

@router.post("/")
async def receive_github_webhook(request: Request):
    payload = await request.json()
    await handle_github_event(payload)
    return {"status": "received"}
