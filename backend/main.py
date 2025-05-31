from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine

# Import all routers
from routes.position_routes import router as position_router
from routes.team_routes import router as team_router
from routes.bot_routes import router as bot_router
from routes.employee_routes import router as employee_routes
from routes.employee_bot_routes import router as employee_bot_router
from routes.achievement_routes import router as achievement_router
from routes.employee_achievement_routes import router as employee_achievement_router
from routes.badge_routes import router as badge_router
from routes.employee_badge_routes import router as employee_badge_router
from routes.notification_routes import router as notification_router
from routes.topic_routes import router as topic_router
from routes.problem_routes import router as problem_router
from routes.problem_topic_routes import router as problem_topic_router
from routes.testcase_routes import router as testcase_router
from routes.solution_routes import router as solution_router
from routes.comment_routes import router as comment_router
from routes.employee_comment_routes import router as employee_comment_router
from routes.product_routes import router as product_router
from routes.employee_product_routes import router as employee_product_router
from routes.task_routes import router as task_router
from routes.suggestion_routes import router as suggestion_router
from routes.resource_routes import router as resource_router
from routes.suggestion_resource_routes import router as suggestion_resource_router
from routes.auth import router as auth_router
from routes.users import router as users_router
from routes.ranking_route import router as ranking_router
from routes.employee_xp_history_route import router as employee_xp_history_router
from routes.purchase_routes import router as purchase_router


# Initialize the FastAPI app
app = FastAPI(
    title="Code Mahindra API",
    description="Modular backend for managing users, challenges, resources, and more",
    version="1.0.0"
)

# Set up CORS (customize this for your frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # No le cambien
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(position_router)
app.include_router(team_router)
app.include_router(bot_router)
app.include_router(employee_routes)
app.include_router(employee_bot_router)
app.include_router(achievement_router)
app.include_router(employee_achievement_router)
app.include_router(badge_router)
app.include_router(employee_badge_router)
app.include_router(notification_router)
app.include_router(topic_router)
app.include_router(problem_router)
app.include_router(problem_topic_router)
app.include_router(testcase_router)
app.include_router(solution_router)
app.include_router(comment_router)
app.include_router(employee_comment_router)
app.include_router(product_router)
app.include_router(employee_product_router)
app.include_router(task_router)
app.include_router(suggestion_resource_router)
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(users_router)
app.include_router(ranking_router)
app.include_router(employee_xp_history_router)
app.include_router(purchase_router)

# Health check route
@app.get("/")
def read_root():

    return {"message": "🚀 API is running successfully!"}
