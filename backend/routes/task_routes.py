from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
import os
import base64
import requests

from database import get_db
from schemas.task import TaskCreate, TaskUpdate, TaskOut
from controllers.task_controller import (
    get_all_tasks,
    get_task_by_id,
    create_task,
    update_task,
    delete_task,
    create_task_from_jira,
)

router = APIRouter(prefix="/tasks", tags=["Tasks"])

# ----- CRUD de Tasks -----

@router.get("/", response_model=List[TaskOut])
def list_tasks(db: Session = Depends(get_db)):
    return get_all_tasks(db)

@router.get("/{task_id}", response_model=TaskOut)
def retrieve_task(task_id: int, db: Session = Depends(get_db)):
    try:
        return get_task_by_id(task_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/", response_model=TaskOut, status_code=201)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(task, db)

@router.put("/{task_id}", response_model=TaskOut)
def update_existing_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    try:
        return update_task(task_id, task, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{task_id}", status_code=204)
def delete_existing_task(task_id: int, db: Session = Depends(get_db)):
    try:
        delete_task(task_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"detail": "Task deleted successfully"}

# ----- Integración con Jira -----

JIRA_BASE_URL = os.getenv("JIRA_BASE_URL", "https://your-domain.atlassian.net/rest/api/3")
JIRA_EMAIL = os.getenv("JIRA_EMAIL", "")
JIRA_API_TOKEN = os.getenv("JIRA_API_TOKEN", "")

def get_jira_headers():
    auth_str = f"{JIRA_EMAIL}:{JIRA_API_TOKEN}"
    auth_token = base64.b64encode(auth_str.encode("ascii")).decode("ascii")
    return {
        "Authorization": f"Basic {auth_token}",
        "Content-Type": "application/json"
    }

@router.get("/jira/issues")
def get_jira_issues():
    headers = get_jira_headers()
    params = {"jql": "project = SCRUM"}  # <- tu clave real de proyecto

    try:
        response = requests.get(f"{JIRA_BASE_URL}/search", headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/jira/webhook")
async def jira_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Webhook para recibir eventos desde Jira.
    """
    data = await request.json()
    print("📩 Webhook de Jira recibido:", data)

    try:
        task = create_task_from_jira(data, db)
        return {"status": "created", "task_id": task.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/jira/update")
def update_jira_issue(issue_id: str, transition_id: str):
    headers = get_jira_headers()
    body = {
        "transition": {"id": transition_id}
    }
    try:
        url = f"{JIRA_BASE_URL}/issue/{issue_id}/transitions"
        response = requests.post(url, json=body, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

