import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteVideo, getVideo, patchVideo, postVideo } from "./fetcher";
import {
  IRequestUpdateVideo,
  IRequestUploadVideo,
} from "@/packages/shared/interfaces/video.interface";

export const useCreateVideo = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestUploadVideo) => postVideo(payload),
    mutationKey: ["post-video"],
  });

  return { mutations };
};

export const useReadVideo = (type: string) => {
  return useQuery({
    queryKey: ["read-video", type],
    queryFn: async () => await getVideo(type),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!type,
  });
};

export const useUpdateVideo = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestUpdateVideo) =>
      patchVideo({ payload, id }),
    mutationKey: ["updated-video"],
  });

  return { mutations };
};

export const useDeletedVideo = () => {
  const mutations = useMutation({
    mutationFn: async (id: string) => deleteVideo(id),
    mutationKey: ["deleted-video"],
  });

  return { mutations };
};
