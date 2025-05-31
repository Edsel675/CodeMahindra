import httpx
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def get_commit_diff(repo: str, sha: str):
    url = f"https://api.github.com/repos/{repo}/commits/{sha}"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    response = httpx.get(url, headers=headers)
    if response.status_code != 200:
        print(f"❌ Error obteniendo diff: {response.status_code}")
        return []

    data = response.json()
    return [(f["filename"], f.get("patch", "")) for f in data.get("files", [])]
