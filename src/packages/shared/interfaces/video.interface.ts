export interface IResponseVideo {
  id: string;
  url: string;
  video_type: "numerisasi" | "literasi";
}

export interface IRequestUploadVideo {
  file: File;
  video_type: "numerisasi" | "literasi";
}

export interface IRequestUpdateVideo {
  file: File;
  video_type: "numerisasi" | "literasi";
}
