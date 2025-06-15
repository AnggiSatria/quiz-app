import {
  IRequestMasterImage,
  IResponseMasterImageList,
} from "@/packages/shared/interfaces/master-images.interface";
import axios from "axios";

export const getMasterImages = async (order: string) => {
  const response = await axios.get(`/api/master-image?orderBy=${order}`);

  return response.data as IResponseMasterImageList;
};

export const postMasterImages = async (payload: IRequestMasterImage) => {
  return await axios.post(`/api/master-image`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patchMasterImage = async ({
  payload,
  id,
}: {
  payload: IRequestMasterImage;
  id: string;
}) => {
  return await axios.patch(`/api/master-image?id=${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteMasterImage = async (id: string) => {
  return await axios.delete(`/api/master-image?id=${id}`);
};
