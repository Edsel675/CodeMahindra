from fastapi import FastAPI
from routes.github_webhook import router as github_router

app = FastAPI(
    title="CodeMahindra GitHub Webhook Analyzer",
    version="1.0"
)

# Registrar rutas
app.include_router(github_router, prefix="/webhook/github", tags=["GitHub Webhook"])
