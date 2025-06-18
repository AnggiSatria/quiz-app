export interface AnswerResult {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  point: number;
}

export interface IResponseUser {
  id: string;
  name: string;
  score: number;
  quiz_type: "numerisasi" | "literasi";
  list_score: AnswerResult[];
}
