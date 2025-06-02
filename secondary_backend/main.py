from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from github import get_grouped_commits, get_pull_requests

app = FastAPI(
    title="CodeMahindra GitHub Webhook Analyzer",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/commits")
async def get_commits(branch: str = Query(default="main")):
    return await get_grouped_commits(branch)

@app.get("/pull-requests")
async def pull_requests_endpoint():
    return await get_pull_requests()
