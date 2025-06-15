import {
  deleteMasterImage,
  getMasterImages,
  patchMasterImage,
  postMasterImages,
} from "./fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IRequestMasterImage } from "@/packages/shared/interfaces/master-images.interface";

export const useCreateMasterImage = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestMasterImage) =>
      postMasterImages(payload),
    mutationKey: ["post-master-image"],
  });

  return { mutations };
};

export const useReadMasterImages = (order: string) => {
  return useQuery({
    queryKey: ["read-master-images"],
    queryFn: async () => await getMasterImages(order),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useUpdatedMasterImage = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestMasterImage) =>
      patchMasterImage({ payload, id }),
    mutationKey: ["updated-master-image"],
  });

  return { mutations };
};

export const useDeletedMasterImage = () => {
  const mutations = useMutation({
    mutationFn: async (id: string) => deleteMasterImage(id),
    mutationKey: ["deleted-master-image"],
  });

  return { mutations };
};
