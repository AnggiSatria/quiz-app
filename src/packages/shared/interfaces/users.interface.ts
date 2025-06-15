export interface IRequestCreateUser {
  name: string;
  quiz_type: "numerisasi" | "literasi";
  correctAnswers: number; // jumlah jawaban benar
}
