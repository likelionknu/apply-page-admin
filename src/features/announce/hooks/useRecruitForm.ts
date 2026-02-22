import { useState } from "react";
import type { Recruit } from "../types/RecruitQuestion";

const initialRecruitInfo: Recruit = {
  title: "",
  start_at: "",
  end_at: "",
  questions: [
    { priority: 1, question: "" },
    { priority: 2, question: "" },
    { priority: 3, question: "" },
  ],
};

export function useRecruitForm(initialValue: Recruit = initialRecruitInfo) {
  const [recruitInfo, setRecruitInfo] = useState<Recruit>(initialValue);

  const handleAddQuestion = () => {
    setRecruitInfo((prev) => {
      const nextPriority = prev.questions.length + 1;

      return {
        ...prev,
        questions: [
          ...prev.questions,
          {
            priority: nextPriority,
            question: "",
          },
        ],
      };
    });
  };

  const handleDeleteQuestion = (targetIndex: number) => {
    if (recruitInfo.questions.length === 1) return;

    setRecruitInfo((prev) => {
      const filteredQuestions = prev.questions.filter(
        (_, index) => index !== targetIndex,
      );

      const newQuestions = filteredQuestions.map((item, index) => ({
        ...item,
        priority: index + 1,
      }));

      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecruitInfo((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDateChange = (key: "start_at" | "end_at", value: string) => {
    if (!value) return;

    const dateObj = new Date(value);
    setRecruitInfo((prev) => ({ ...prev, [key]: dateObj.toISOString() }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    setRecruitInfo((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = { ...newQuestions[index], question: value };
      return { ...prev, questions: newQuestions };
    });
  };

  const handlePriorityChange = (
    currentPriority: number,
    newPriority: number,
  ) => {
    if (currentPriority === newPriority) return;

    setRecruitInfo((prev) => {
      const questions = [...prev.questions];

      const targetIndex = questions.findIndex(
        (q) => q.priority === currentPriority,
      );
      const swapIndex = questions.findIndex((q) => q.priority === newPriority);

      if (targetIndex === -1 || swapIndex === -1) return prev;

      questions[targetIndex] = {
        ...questions[targetIndex],
        priority: newPriority,
      };
      questions[swapIndex] = {
        ...questions[swapIndex],
        priority: currentPriority,
      };

      questions.sort((a, b) => a.priority - b.priority);

      return { ...prev, questions };
    });
  };

  return {
    recruitInfo,
    setRecruitInfo,
    handleAddQuestion,
    handleDeleteQuestion,
    handleTitleChange,
    handleDateChange,
    handleQuestionChange,
    handlePriorityChange,
  };
}
