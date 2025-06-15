import { deleteQuiz, getQuiz, patchQuiz, postQuiz } from "./fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IParamsQuiz,
  IRequestUpdateQuiz,
} from "@/packages/shared/interfaces/quiz.interface";

export const useCreateQuiz = () => {
  const mutations = useMutation({
    mutationFn: async (payload: FormData) => postQuiz(payload),
    mutationKey: ["post-quiz"],
  });

  return { mutations };
};

export const useReadQuiz = ({ type, level, shuffle }: IParamsQuiz) => {
  return useQuery({
    queryKey: ["read-quiz", type, level, shuffle],
    queryFn: async () => await getQuiz({ type, level, shuffle }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useUpdatedQuiz = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestUpdateQuiz) =>
      patchQuiz({ payload, id }),
    mutationKey: ["updated-quiz"],
  });

  return { mutations };
};

export const useDeletedQuiz = () => {
  const mutations = useMutation({
    mutationFn: async (id: string) => deleteQuiz(id),
    mutationKey: ["deleted-quiz"],
  });

  return { mutations };
};
