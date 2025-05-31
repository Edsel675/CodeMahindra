from services.commit_analyzer import get_commit_diff
from services.pr_analyzer import get_pr_diff

async def analizar_push_commit(payload: dict):
    repo = payload["repository"]["full_name"]
    sha = payload["after"]

    print(f"🔁 Analizando commit {sha} en repo {repo}")
    diffs = get_commit_diff(repo, sha)

    for archivo, patch in diffs:
        print(f"\n📄 Archivo: {archivo}")
        print("—" * 60)
        print(patch)
        print("—" * 60)

async def analizar_pull_request(payload: dict):
    repo = payload["repository"]["full_name"]
    pr_number = payload["pull_request"]["number"]

    print(f"🔁 Analizando Pull Request #{pr_number} en repo {repo}")
    diffs = get_pr_diff(repo, pr_number)

    for archivo, patch in diffs:
        print(f"\n📄 Archivo: {archivo}")
        print("—" * 60)
        print(patch)
        print("—" * 60)
