from pydantic import BaseModel

class ProblemTopicBase(BaseModel):
    topic_id: int
    problem_id: int

class ProblemTopicCreate(ProblemTopicBase):
    pass

class ProblemTopicOut(ProblemTopicBase):
    class Config:
        from_attributes = True
