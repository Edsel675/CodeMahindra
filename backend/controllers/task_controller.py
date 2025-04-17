from sqlalchemy.orm import Session
from models.task import Task
from schemas.task import TaskCreate, TaskUpdate
from typing import List


def get_all_tasks(db: Session):
    tasks = db.query(Task).all()
    return [
        {
            "id": task.id,
            "title": task.title,
            "taskType": task.tasktype,
            "priority": task.priority,
            "status": task.status,
            "estimatedTime": task.estimatedtime,
            "affectedModule": task.affectedmodule,
            "tag": task.tag,
            "reward": task.reward,
            "employee_id": task.employee_id,
            "createdAt": task.created_at.isoformat() if task.created_at else None,
        }
        for task in tasks
    ]


def get_task_by_id(task_id: int, db: Session):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise Exception("Task not found")
    return task


def create_task(task_data: TaskCreate, db: Session):
    new_task = Task(**task_data.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


def update_task(task_id: int, task_data: TaskUpdate, db: Session):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise Exception("Task not found")
    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(task_id: int, db: Session):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise Exception("Task not found")
    db.delete(task)
    db.commit()
    return


# 🆕 Función para crear un Task desde un issue de Jira
def create_task_from_jira(data: dict, db: Session):
    issue = data.get("issue", {})
    fields = issue.get("fields", {})

    title = fields.get("summary", "No title")
    task_type = fields.get("issuetype", {}).get("name")
    priority = fields.get("priority", {}).get("name")
    status = fields.get("status", {}).get("name")
    estimated_time = fields.get("timeoriginalestimate", 0)  # en segundos
    tags = fields.get("labels", [])
    tags_str = ", ".join(tags)

    new_task = Task(
        title=title,
        tasktype=task_type,
        priority=priority,
        status=status,
        estimatedtime=(estimated_time // 3600) if estimated_time else None,
        tag=tags_str
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task
