import httpx
from collections import defaultdict
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO = "ReyliCruz/CodeMahindra-Repository-Test"
USERNAME = os.getenv("GITHUB_USERNAME")  # Usuario actual a filtrar

def human_date(date: datetime) -> str:
    return date.strftime("%B %d, %Y")

def relative_day(date: datetime) -> str:
    delta = datetime.utcnow() - date
    if delta.days == 0:
        return "today"
    elif delta.days == 1:
        return "yesterday"
    else:
        return f"{delta.days} days ago"

def humanize_date(date_str):
    date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
    delta = datetime.utcnow() - date
    if delta.days == 0:
        return "today"
    elif delta.days == 1:
        return "yesterday"
    else:
        return f"{delta.days} days ago"

# ✅ Solo commits del usuario actual
async def get_grouped_commits(branch: str = "main"):
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    url = f"https://api.github.com/repos/{REPO}/commits?sha={branch}&per_page=100"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()

    grouped = defaultdict(list)

    for item in data:
        author_login = item["author"]["login"] if item.get("author") else None
        commit_author_name = item["commit"]["author"]["name"]

        if author_login != USERNAME and commit_author_name != USERNAME:
            continue

        date_str = item["commit"]["author"]["date"]
        date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
        group_key = human_date(date)

        grouped[group_key].append({
            "message": item["commit"]["message"],
            "author": author_login or commit_author_name,
            "date": relative_day(date),
            "retro": "Analizando",
            "hash": item["sha"][:7],
            "verified": item["commit"].get("verification", {}).get("verified", False),
            "branch": branch
        })

    return dict(grouped)


# ✅ Solo PRs abiertos por el usuario o donde es reviewer asignado
async def get_pull_requests():
    url = f"https://api.github.com/repos/{REPO}/pulls?state=all&per_page=100"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        prs = response.json()

        pull_requests = []

        for pr in prs:
            is_author = pr["user"]["login"] == USERNAME

            # Obtener reviewers asignados
            reviewers_url = pr["_links"]["self"]["href"] + "/requested_reviewers"
            reviewers_resp = await client.get(reviewers_url, headers=headers)
            reviewers_data = reviewers_resp.json() if reviewers_resp.status_code == 200 else {}
            reviewers = [r["login"] for r in reviewers_data.get("users", [])]

            is_reviewer = USERNAME in reviewers

            if not (is_author or is_reviewer):
                continue

            # Determinar estado y fecha legible
            if pr.get("merged_at"):
                status = "merged"
                date_label = f"merged {humanize_date(pr['merged_at'])}"
            elif pr.get("closed_at"):
                status = "closed"
                date_label = f"closed {humanize_date(pr['closed_at'])}"
            else:
                status = "open"
                date_label = f"open {humanize_date(pr['created_at'])}"

            comments_count = pr.get("comments", 0) + pr.get("review_comments", 0)

            pull_requests.append({
                "title": pr["title"],
                "number": pr["number"],
                "author": pr["user"]["login"],
                "date": date_label,
                "status": status,
                "retro": "Analizando",
                "comments": comments_count
            })

    return pull_requests
