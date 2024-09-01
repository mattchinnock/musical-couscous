export interface Answer {
  id: number;
  body: string;
  creation: number;
  score: number;
  user_id: string;
  username: string;
  question_id: number;
  accepted: boolean;
}