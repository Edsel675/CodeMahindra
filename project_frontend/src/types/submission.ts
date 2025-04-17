export interface Submission {
    id: string;
    sent_date: string;
    status: 'Accepted' | 'Failed';
    code: string;
    runtime: string;
    memory: string;
    inTeam: boolean;
    language: string;
  }
  
  export interface Comment {
    id: string;
    userName: string;
    profilePic: string;
    comment: string;
    postDate: string;
  }

  /*
  [
    {
      "description": "string",
      "employee_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "problem_id": 0,
      "id": 0,
      "messageDate": "2025-04-17T21:34:43.572Z"
    }
  ]

  {
    "description": "string",
    "employee_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "problem_id": 0
  }*/