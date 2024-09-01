export interface Question {
  id: number;
  title: string;
  body: string;
  creation: number;
  score: number;
  user_id: string;
  username: string;
  answer_count: number;
}