import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomBox from "../molecules/CustomBox";
import { useSearchParams } from "next/navigation";
import { useReadUserById } from "@/packages/shared/utils/service/user/hooks";
import { AnswerResult } from "@/packages/shared/interfaces/user.interface";

export default function TemplateContentResults() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const shuffle = searchParams.get("shuffle") || "ONE";
  const { data: userData, isLoading } = useReadUserById(id);
  const user = userData?.data;
  const storageKey = `quiz-answers-${user?.quiz_type}-${shuffle}`;
  const allAnswers: AnswerResult[] = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
  );
  const [objUser, setObjUser] = useState({
    ...user,
    list_score: allAnswers,
  });

  useEffect(() => {
    if (!isLoading) {
      setObjUser({
        ...user,
        list_score: allAnswers,
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full">
      <div className="w-full absolute h-[500px] bottom-[150px] xl:bottom-[50px]">
        <Image
          src="/assets/bg-image-lp-content.png"
          alt="bg-content"
          fill
          quality={100}
          className="object-contain"
          priority
        />
      </div>

      <div className="inline-flex w-[95%] xl:w-1/2 left-1/2 -translate-x-1/2 absolute rounded-md h-[350px] z-20 bottom-[120px]">
        <CustomBox data={objUser} shuffle={shuffle} />
      </div>

      {/* Layer mountain */}
      <div className="w-full absolute bottom-0 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
        <Image
          src="/assets/bg-image-lp-mountain.png"
          alt="bg-mountain"
          fill
          quality={100}
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
