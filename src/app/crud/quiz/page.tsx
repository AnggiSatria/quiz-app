"use client";

import {
  useCreateQuiz,
  useDeletedQuiz,
  useReadQuiz,
} from "@/packages/shared/utils/service/quiz";
import {
  IRequestCreateQuiz,
  IParamsQuiz,
  IResponseQuiz,
} from "@/packages/shared/interfaces/quiz.interface";
import { useState } from "react";
import { useReadMasterImages } from "@/packages/shared/utils/service/master-images";
import Image from "next/image";
import { IResponseMasterImage } from "@/packages/shared/interfaces/master-images.interface";

export default function QuizPage() {
  const [form, setForm] = useState<IRequestCreateQuiz>({
    question: "",
    quiz_type: "numerisasi",
    level: "ONE",
    answer: {
      options: ["", "", "", ""],
      correct: "",
    },
    url_image: undefined,
    shuffle: "ONE",
  });

  const [image, setImage] = useState<File | null>(null);

  const [filter, setFilter] = useState<IParamsQuiz>({
    type: "numerisasi",
    level: "ONE",
  });

  const { data: quizzes = [], refetch } = useReadQuiz(filter);
  const { data: masterImages = [] } = useReadMasterImages("");
  const { mutations: createQuiz } = useCreateQuiz();
  const { mutations: deleteQuiz } = useDeletedQuiz();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "options" && typeof index === "number") {
      const updatedOptions = [...form.answer.options];
      updatedOptions[index] = value;
      setForm({ ...form, answer: { ...form.answer, options: updatedOptions } });
    } else if (name === "shuffle") {
      setForm({ ...form, shuffle: value as "ONE" | "TWO" | "THREE" });
    } else if (name in form) {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, answer: { ...form.answer, [name]: value } });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("question", form.question);
    formData.append("quiz_type", form.quiz_type);
    formData.append("level", form.level);
    formData.append("answer", JSON.stringify(form.answer));
    formData.append("shuffle", form.shuffle); // sudah string "ONE", "TWO", atau "THREE"
    if (image) formData.append("file", image);

    await createQuiz.mutateAsync(formData);
    await refetch();

    setForm({
      question: "",
      quiz_type: "numerisasi",
      level: "ONE",
      answer: {
        options: ["", "", "", ""],
        correct: "",
      },
      url_image: undefined,
      shuffle: "ONE",
    });
    setImage(null);
  };

  const handleDelete = async (id: string) => {
    await deleteQuiz.mutateAsync(id);
    await refetch();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="border p-2 w-full"
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleInput}
        />

        <select
          className="border p-2 w-full"
          name="quiz_type"
          value={form.quiz_type}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              quiz_type: e.target.value as "numerisasi" | "literasi",
              answer: { ...prev.answer, options: ["", "", "", ""] },
            }));
            setFilter((prev) => ({ ...prev, type: e.target.value }));
          }}
        >
          <option value="numerisasi">Numerisasi</option>
          <option value="literasi">Literasi</option>
        </select>

        <select
          className="border p-2 w-full"
          name="level"
          value={form.level}
          onChange={(e) => {
            handleInput(e);
            setFilter((prev) => ({ ...prev, level: e.target.value }));
          }}
        >
          {["ONE", "TWO", "THREE", "FOUR", "FIVE"].map((lvl, i) => (
            <option key={i} value={lvl}>
              Level {i + 1}
            </option>
          ))}
        </select>

        {form.answer.options.map((opt, i) =>
          form.quiz_type === "literasi" ? (
            <select
              key={i}
              className="border p-2 w-full"
              name="options"
              value={opt}
              onChange={(e) => handleInput(e, i)}
            >
              <option value="">Select Image Option {i + 1}</option>
              {masterImages.map((img: IResponseMasterImage) => (
                <option key={img.id} value={img.id}>
                  {img.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              key={i}
              className="border p-2 w-full"
              name="options"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleInput(e, i)}
            />
          )
        )}

        {form.quiz_type === "literasi" && (
          <div className="col-span-2 flex flex-wrap gap-4">
            {form.answer.options.map((id, i) => {
              const img = masterImages.find(
                (img: IResponseMasterImage) => img.id === id
              );
              return (
                img && (
                  <div key={i} className="flex flex-col items-center">
                    <Image
                      src={img.url}
                      alt={img.name}
                      className="w-24 h-24 object-cover border rounded"
                      width={96}
                      height={96}
                    />
                    <span className="text-xs">{img.name}</span>
                  </div>
                )
              );
            })}
          </div>
        )}

        {form.quiz_type === "literasi" ? (
          <select
            className="border p-2 w-full"
            name="correct"
            value={form.answer.correct}
            onChange={handleInput}
          >
            <option value="">Select Correct Answer</option>
            {masterImages.map((img: IResponseMasterImage) => (
              <option key={img.id} value={img.id}>
                {img.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="border p-2 w-full"
            name="correct"
            placeholder="Correct Answer"
            value={form.answer.correct}
            onChange={handleInput}
          />
        )}

        <input
          className="border p-2 w-full"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <select
          className="border p-2 w-full"
          name="shuffle"
          value={form.shuffle}
          onChange={handleInput}
        >
          <option value="">Select Shuffle Level</option>
          {["ONE", "TWO", "THREE"].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="grid gap-4">
        {quizzes?.map((quiz: IResponseQuiz) => (
          <div
            key={quiz.id}
            className="border p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
          >
            <div>
              <h2 className="font-semibold mb-1">{quiz.question}</h2>
              {quiz.url_image && (
                <Image
                  src={quiz.url_image}
                  alt="Quiz"
                  className="w-full max-w-xs mb-2 rounded border"
                  width={320}
                  height={320}
                />
              )}
              <p className="text-sm text-gray-500 mb-1">
                Type: {quiz.quiz_type}, Level: {quiz.level}, Shuffle:{" "}
                {String(quiz.shuffle)}
              </p>
              <ul className="list-disc pl-5 text-sm">
                {quiz.answer.options.map((opt, i) => (
                  <li
                    key={i}
                    className={
                      opt === quiz.answer.correct
                        ? "font-bold text-green-600"
                        : ""
                    }
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleDelete(quiz.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
