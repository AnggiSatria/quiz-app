import {
  IRequestUploadVideo,
  IResponseVideo,
} from "@/packages/shared/interfaces/video.interface";
import axios from "axios";

export const getVideo = async (type: string) => {
  const response = await axios.get(`/api/video?video_type=${type}`);

  return response.data as IResponseVideo[];
};

export const postVideo = async (payload: IRequestUploadVideo) => {
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("video_type", payload.video_type);

  return await axios.post(`/api/video/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patchVideo = async ({
  payload,
  id,
}: {
  payload: IRequestUploadVideo;
  id: string;
}) => {
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("video_type", payload.video_type);

  return await axios.patch(`/api/video/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteVideo = async (id: string) => {
  return await axios.delete(`/api/video/${id}`);
};
