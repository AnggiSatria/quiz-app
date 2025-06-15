export interface IImageAnswer {
  id: string;
  name: string;
  url: string;
}

export interface IRequestCreateQuiz {
  question: string;
  quiz_type: "numerisasi" | "literasi";
  level: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  answer: {
    options: string[] | IImageAnswer[];
    correct: string | IImageAnswer;
  };
  url_image?: string;
  shuffle: "ONE" | "TWO" | "THREE";
}

export interface IRequestUpdateQuiz {
  question?: string;
  quiz_type?: "numerisasi" | "literasi";
  level?: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  answer?: {
    options: string[] | IImageAnswer[];
    correct: string | IImageAnswer;
  };
  url_image?: string;
  shuffle: "ONE" | "TWO" | "THREE";
}

export interface IResponseQuiz {
  id: string;
  question: string | IImageAnswer;
  quiz_type: "numerisasi" | "literasi";
  level: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  answer: {
    options: string[] | IImageAnswer[];
    correct: string | IImageAnswer;
  };
  url_image?: string;
  shuffle: "ONE" | "TWO" | "THREE";
}

export interface IParamsQuiz {
  type: string;
  level: string;
  shuffle: string;
}
