import httpx
from collections import defaultdict
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO = "ReyliCruz/CodeMahindra-Repository-Test"

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
    """Convierte fecha ISO en formato legible como 'merged 2 days ago'"""
    date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
    delta = datetime.utcnow() - date
    if delta.days == 0:
        return "today"
    elif delta.days == 1:
        return "yesterday"
    else:
        return f"{delta.days} days ago"

async def get_grouped_commits():
    url = f"https://api.github.com/repos/{REPO}/commits"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    response = httpx.get(url, headers=headers)
    response.raise_for_status()
    data = response.json()

    grouped = defaultdict(list)

    for item in data:
        commit = item["commit"]
        date_str = commit["author"]["date"]
        date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
        group_key = human_date(date)

        grouped[group_key].append({
            "message": commit["message"],
            "author": item["author"]["login"] if item["author"] else commit["author"]["name"],
            "date": relative_day(date),
            "retro": "Analizando",
            "hash": item["sha"][:7],
            "verified": commit.get("verification", {}).get("verified", False)
        })

    return dict(grouped)

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
        if pr.get("merged_at"):
            date_label = f"merged {humanize_date(pr['merged_at'])}"
        elif pr.get("closed_at"):
            date_label = f"closed {humanize_date(pr['closed_at'])}"
        else:
            date_label = f"open {humanize_date(pr['created_at'])}"

        comments_count = pr.get("comments", 0) + pr.get("review_comments", 0)

        pull_requests.append({
            "title": pr["title"],
            "number": pr["number"],
            "author": pr["user"]["login"],
            "date": date_label,
            "retro": "Analizando",
            "comments": comments_count
        })

    return pull_requests