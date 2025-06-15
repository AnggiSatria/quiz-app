import {
  IParamsQuiz,
  IRequestUpdateQuiz,
  IResponseQuiz,
} from "@/packages/shared/interfaces/quiz.interface";
import axios from "axios";

export const getQuiz = async ({ type, level }: IParamsQuiz) => {
  const response = await axios.get(
    `/api/quiz?quiz_type=${type}&level=${level}`
  );

  return response.data as IResponseQuiz[];
};

export const postQuiz = async (payload: FormData) => {
  return await axios.post(`/api/quiz`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patchQuiz = async ({
  payload,
  id,
}: {
  payload: IRequestUpdateQuiz;
  id: string;
}) => {
  return await axios.patch(`/api/quiz?id=${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteQuiz = async (id: string) => {
  return await axios.delete(`/api/quiz/${id}`);
};
