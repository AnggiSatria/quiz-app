import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserById, postUser } from "./fetcher";
import { IRequestCreateUser } from "@/packages/shared/interfaces/users.interface";

export const useCreateUser = ({
  navigate,
}: {
  navigate: (id: string) => void;
}) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCreateUser) => postUser(payload),
    mutationKey: ["post-user"],
    onSuccess: (res) => {
      console.log(res);
      navigate(res?.data?.id);
    },
  });

  return { mutations };
};

export const useReadUserById = (id: string) => {
  return useQuery({
    queryKey: ["read-user-by-id", id],
    queryFn: async () => await getUserById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
  });
};
