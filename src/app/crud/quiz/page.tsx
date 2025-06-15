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
  IImageAnswer,
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
    shuffle: "ONE",
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
      let updatedOptions;

      if (form.quiz_type === "literasi") {
        const selectedImage = masterImages.find((img) => img.id === value);
        if (selectedImage) {
          const current = form.answer.options as IImageAnswer[];
          updatedOptions = [...current];
          updatedOptions[index] = selectedImage;
        } else {
          updatedOptions = form.answer.options;
        }
      } else {
        const current = form.answer.options as string[];
        updatedOptions = [...current];
        updatedOptions[index] = value;
      }

      setForm({
        ...form,
        answer: {
          ...form.answer,
          options: updatedOptions,
        },
      });
    } else if (name === "correct") {
      if (form.quiz_type === "literasi") {
        const selectedImage = masterImages.find((img) => img.id === value);
        if (selectedImage) {
          setForm({
            ...form,
            answer: { ...form.answer, correct: selectedImage },
          });
        }
      } else {
        setForm({ ...form, answer: { ...form.answer, correct: value } });
      }
    } else if (name === "question") {
      setForm({ ...form, question: value });
    } else if (name === "level" || name === "shuffle") {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("question", form.question);
    formData.append("quiz_type", form.quiz_type);
    formData.append("level", form.level);
    formData.append("shuffle", form.shuffle);

    const answer = {
      options: form.answer.options.map((opt) =>
        typeof opt === "string" ? opt : opt.id
      ),
      correct:
        typeof form.answer.correct === "string"
          ? form.answer.correct
          : form.answer.correct.id,
    };

    formData.append("answer", JSON.stringify(answer));
    if (image) formData.append("file", image);

    await createQuiz.mutateAsync(formData);
    await refetch();

    setForm({
      question: "",
      quiz_type: "numerisasi",
      level: "ONE",
      shuffle: "ONE",
      answer: {
        options: ["", "", "", ""],
        correct: "",
      },
      url_image: undefined,
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
        {form.quiz_type === "literasi" ? (
          <select
            className="border p-2 w-full"
            name="question"
            value={form.question}
            onChange={handleInput}
          >
            <option value="">Select Question</option>
            {masterImages.map((img: IResponseMasterImage) => (
              <option key={img.id} value={img.id}>
                {img.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="border p-2 w-full"
            name="question"
            placeholder="Question"
            value={form.question}
            onChange={handleInput}
          />
        )}

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

        {form.answer.options.map((opt, i) => {
          console.log(opt);

          return form.quiz_type === "literasi" ? (
            <select
              key={i}
              className="border p-2 w-full"
              name="options"
              value={typeof opt === "string" ? opt : opt.id}
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
              value={typeof opt === "string" ? opt : opt.id}
              onChange={(e) => handleInput(e, i)}
            />
          );
        })}

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
            value={
              typeof form.answer.correct === "string"
                ? form.answer.correct
                : form.answer.correct.id
            }
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
            value={
              typeof form.answer.correct === "string"
                ? form.answer.correct
                : form.answer.correct.id
            }
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
          onChange={(e) => {
            handleInput(e);
            setFilter((prev) => ({ ...prev, shuffle: e.target.value }));
          }}
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
        {quizzes?.map((quiz: IResponseQuiz) => {
          return (
            <div
              key={quiz?.id}
              className="border p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div>
                {quiz?.quiz_type === "literasi" ? (
                  <div className="mb-2">
                    {typeof quiz?.question !== "string" &&
                      quiz?.question?.url && (
                        <Image
                          src={quiz?.question?.url}
                          alt={quiz?.question?.name}
                          className="w-32 h-32 object-cover border rounded"
                          width={128}
                          height={128}
                        />
                      )}
                    <p className="text-sm text-gray-600 text-center mt-1">
                      {typeof quiz?.question === "string"
                        ? quiz?.question
                        : quiz?.question?.name}
                    </p>
                  </div>
                ) : (
                  <h2 className="font-semibold mb-1">
                    {typeof quiz?.question === "string"
                      ? quiz?.question
                      : quiz?.question?.name}
                  </h2>
                )}

                {quiz?.url_image && (
                  <Image
                    src={quiz?.url_image}
                    alt="Quiz"
                    className="w-full max-w-xs mb-2 rounded border"
                    width={320}
                    height={320}
                  />
                )}
                <p className="text-sm text-gray-500 mb-1">
                  Type: {quiz?.quiz_type}, Level: {quiz?.level}, Shuffle:{" "}
                  {String(quiz?.shuffle)}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {quiz?.answer?.options?.map((opt, i) => {
                    const isCorrect =
                      (typeof opt === "string" ? opt : opt?.id) ===
                      (typeof quiz.answer.correct === "string"
                        ? quiz?.answer?.correct
                        : quiz?.answer?.correct.id);

                    const label =
                      ["A", "B", "C", "D"][i] || String.fromCharCode(65 + i); // fallback

                    return quiz.quiz_type === "literasi" &&
                      typeof opt !== "string" ? (
                      <div
                        key={i}
                        className={`border rounded p-2 flex flex-col items-center ${
                          isCorrect ? "border-green-500" : ""
                        }`}
                      >
                        <Image
                          src={opt.url}
                          alt={opt.name}
                          className="w-24 h-24 object-cover rounded"
                          width={96}
                          height={96}
                        />
                        <span className="text-xs mt-1">{`${label}. ${opt.name}`}</span>
                      </div>
                    ) : (
                      <div
                        key={i}
                        className={`p-2 border rounded ${
                          isCorrect
                            ? "text-green-600 font-bold border-green-500"
                            : ""
                        }`}
                      >
                        <span>{`${label}. ${
                          typeof opt === "string" ? opt : opt?.name
                        }`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
