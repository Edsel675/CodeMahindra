export interface Task {
    id: string;
    title: string;
    taskType?: string;
    priority?: string;
    status?: string;
    estimatedTime?: number;
    affectedModule?: string;
    tag?: string;
    reward?: number;
    employee_id?: string;
  }

