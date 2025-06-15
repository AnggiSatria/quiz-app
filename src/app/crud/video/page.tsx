"use client";

import { useState } from "react";
import {
  useCreateVideo,
  useReadVideo,
  useDeletedVideo,
  useUpdateVideo,
} from "@/packages/shared/utils/service/video";
import { IResponseVideo } from "@/packages/shared/interfaces/video.interface";

export default function VideoPage() {
  const [type, setType] = useState<"numerisasi" | "literasi">("numerisasi");
  const [file, setFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  const { data: videos = [], refetch } = useReadVideo(type);
  const { mutations: createVideo } = useCreateVideo();
  const { mutations: deleteVideo } = useDeletedVideo();
  const { mutations: updateVideo } = useUpdateVideo(editId ?? "");

  const handleUpload = async () => {
    if (!file) return;
    await createVideo.mutateAsync({ file, video_type: type });
    setFile(null);
    await refetch();
  };

  const handleUpdate = async () => {
    if (!editFile || !editId) return;
    await updateVideo.mutateAsync({ file: editFile, video_type: type });
    setEditId(null);
    setEditFile(null);
    await refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteVideo.mutateAsync(id);
    await refetch();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Videos</h1>

      <div className="mb-4">
        <label className="font-medium mr-2">Select Video Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "numerisasi" | "literasi")}
          className="border p-2 rounded"
        >
          <option value="numerisasi">Numerisasi</option>
          <option value="literasi">Literasi</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Video
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos?.map((video: IResponseVideo) => (
          <div
            key={video?.id}
            className="border rounded p-4 shadow flex flex-col gap-2"
          >
            <video
              controls
              src={video?.url}
              className="w-full h-48 bg-black rounded"
            />
            <p className="text-sm text-gray-500">Type: {video?.video_type}</p>
            <div className="flex gap-2">
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(video?.id)}
              >
                Delete
              </button>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setEditId(video.id)}
              >
                Edit
              </button>
            </div>

            {editId === video?.id && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
                  className="border p-1 rounded mb-2"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded"
                  onClick={handleUpdate}
                >
                  Save Update
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
