"use client";

import { useState } from "react";
import {
  useCreateMasterImage,
  useReadMasterImages,
  useUpdatedMasterImage,
  useDeletedMasterImage,
} from "@/packages/shared/utils/service/master-images";
import {
  IRequestMasterImage,
  IResponseMasterImage,
} from "@/packages/shared/interfaces/master-images.interface";
import Image from "next/image";

export default function MasterImagesPage() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const { data, isLoading, refetch } = useReadMasterImages("desc");
  const { mutations: createMutation } = useCreateMasterImage();
  const { mutations: deleteMutation } = useDeletedMasterImage();
  const { mutations: updateMutation } = useUpdatedMasterImage(editId || "");

  const handleUpload = async () => {
    if (!name || !file) return;
    const payload: IRequestMasterImage = { name, file };
    await createMutation.mutateAsync(payload);
    setName("");
    setFile(null);
    refetch();
  };

  const handleUpdate = async () => {
    if (!editId || !editName) return;
    const payload: IRequestMasterImage = { name: editName };
    await updateMutation.mutateAsync(payload);
    setEditId(null);
    setEditName("");
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    refetch();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📦 Master Images</h1>

      {/* Upload Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Image name"
            className="border p-2 flex-1 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* Image List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((img: IResponseMasterImage) => (
            <div
              key={img.id}
              className="border rounded p-4 flex flex-col items-center text-center shadow"
            >
              <div className="flex w-full h-40">
                <Image
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover rounded mb-2"
                  width={160}
                  height={160}
                  layout="responsive"
                />
              </div>

              {editId === img.id ? (
                <div className="w-full">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-3 py-1 rounded w-full"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditName("");
                      }}
                      className="bg-gray-400 text-white px-3 py-1 rounded w-full"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-semibold">{img.name}</p>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(img.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => {
                        setEditId(img.id);
                        setEditName(img.name);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded w-full"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
