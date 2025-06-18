import { IRequestCreateUser } from "@/packages/shared/interfaces/users.interface";
import axios from "axios";

export const getUserById = async (id: string) => {
  return await axios.get(`/api/user/${id}`);
};

export const postUser = async (payload: IRequestCreateUser) => {
  return await axios.post(`/api/user`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
