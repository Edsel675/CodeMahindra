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