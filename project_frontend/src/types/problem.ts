export interface TestCase {
    id: string;
    input: string;
    output: string;
  }
  
  export interface Problem {
    id: string;
    name: string;
    description: string;
    input_format: string;
    output_format: string;
    sample_input: string;
    sample_output: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    creation_date: string;
    expiration_date: string;
    acceptance_rate: number;
    testcases: TestCase[];
    // No need to include 'solution' and 'language' here
  }
  
  export type ProblemFormData = Omit<Problem, 'id' | 'acceptance_rate'> & {
    solution: string;  // New attribute for the solution code
    language: string;  // New attribute for the language of the solution
  };


  // New interface for problem list data
export interface ProblemListData {
  id: string;
  status: string;  // The problem's solved status solved or not_solved
  difficulty: string;  // The problem's difficulty Easy, Medium or Hard
  acceptance: number;  // The acceptance rate for the problem
  name: string;  // The title of the problem
  expirationDate: string; // when it expires
}

