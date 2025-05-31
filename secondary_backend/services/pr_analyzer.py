import httpx
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def get_pr_diff(repo: str, pr_number: int):
    url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/files"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    response = httpx.get(url, headers=headers)
    if response.status_code != 200:
        print(f"❌ Error obteniendo diff PR: {response.status_code}")
        return []

    data = response.json()
    return [(f["filename"], f.get("patch", "")) for f in data]
