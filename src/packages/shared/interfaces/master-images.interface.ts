export interface IRequestMasterImage {
  name: string;
  file?: File; // hanya diperlukan saat POST, tidak untuk PATCH
}

export interface IResponseMasterImage {
  id: string;
  name: string;
  url: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type IResponseMasterImageList = IResponseMasterImage[];
