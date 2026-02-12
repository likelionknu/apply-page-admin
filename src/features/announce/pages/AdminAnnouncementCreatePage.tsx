import { useState } from "react";
import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import Input from "../components/Input";
import Label from "../components/Label";
import WarringImg from "../assets/warring.png";
import RecruitQuestionItem from "../components/RecruitQuestionItem";

interface RecruitQuestions {
  question: string;
  priority: number;
}

interface RecruitQuestion {
  title: string;
  start_at: string | Date;
  end_at: string | Date;
  questions: RecruitQuestions[];
}

const InputLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
};

const Warring = () => {
  return (
    <div className="tracking-tight-custom border-red mt-4 flex items-center gap-7 rounded-[10px] border px-7 py-4 font-medium md:text-[15px]">
      <img src={WarringImg} alt="경고" className="w-4" />이 공고에 지원서를
      제출(임시저장 포함)한 사용자가 존재하다면 수정은 거부될 수 있어요
    </div>
  );
};

const formatDate = (date: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

function AdminAnnouncementCreatePage() {
  const [recruitInfo, setRecruitInfo] = useState<RecruitQuestion>({
    title: "",
    start_at: "",
    end_at: "",
    questions: [],
  });

  // 질문 추가
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
    setRecruitInfo((prev) => {
      const filterdQuestions = prev.questions.filter(
        (_, index) => index !== targetIndex,
      );

      const newQuestions = filterdQuestions.map((item, index) => ({
        ...item,
        priority: index + 1,
      }));

      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  // 제목 변경
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecruitInfo((prev) => ({ ...prev, title: e.target.value }));
  };

  // 날짜 변경
  const handleDateChange = (key: "start_at" | "end_at", value: string) => {
    if (!value) return;

    const dateObj = new Date(value);
    setRecruitInfo((prev) => ({ ...prev, [key]: dateObj.toISOString() }));
  };

  // 질문 내용 변경
  const handleQuestionChange = (index: number, value: string) => {
    setRecruitInfo((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = { ...newQuestions[index], question: value };
      return { ...prev, questions: newQuestions };
    });
  };

  // 우선순위 변경 및 정렬
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

  return (
    <div className="bg-black1 text-white1 flex w-full flex-col">
      <Header />
      <main className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6">
        <div className="w-full pb-75 md:px-31">
          <div className="tracking-tight-custom font-medium md:text-[30px]">
            모집 공고 등록
          </div>
          <Warring />
          <div className="mt-10">
            <span className="tracking-tight-custom text-gray2 font-medium md:text-[20px]">
              공고 기본 정보
            </span>
            <div className="mt-8">
              <InputLayout>
                <Label>모집 공고 명을 입력해주세요.</Label>
                <Input
                  placeholder="모집 공고 명"
                  value={recruitInfo.title}
                  onChange={handleTitleChange}
                />
              </InputLayout>
              <div className="mt-7 flex gap-7">
                <InputLayout>
                  <Label>모집 시작일을 선택해주세요.</Label>
                  <Input
                    type="date"
                    placeholder="2025.01.03"
                    value={formatDate(recruitInfo.start_at)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleDateChange("start_at", e.target.value)
                    }
                  />
                </InputLayout>
                <InputLayout>
                  <Label>모집 종료일을 선택해주세요.</Label>
                  <Input
                    type="date"
                    placeholder="2025.01.03"
                    value={formatDate(recruitInfo.end_at)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleDateChange("end_at", e.target.value)
                    }
                  />
                </InputLayout>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <span className="tracking-tight-custom text-gray2 text-[20px] font-medium">
                공고 입력 질문 설정
              </span>
              <div
                className="tracking-tight-custom text-purple cursor-pointer text-[15px] font-medium"
                onClick={handleAddQuestion}
              >
                <span className="text-[20px]">+</span> 새 질문 추가
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-7">
              {recruitInfo.questions.map((item, index) => (
                <RecruitQuestionItem
                  key={item.priority}
                  priority={item.priority}
                  question={item.question}
                  totalCount={recruitInfo.questions.length}
                  onPriorityChange={(newPriority) =>
                    handlePriorityChange(item.priority, newPriority)
                  }
                  onQuestionChange={(val) => handleQuestionChange(index, val)}
                  onDelete={() => handleDeleteQuestion(index)}
                />
              ))}
            </div>
          </div>
          <div className="mt-12 w-full text-right">
            <button
              type="button"
              className="text-gray2 bg-black3 cursor-pointer rounded-[10px] px-8 py-2 text-[14px] font-medium contain-paint"
            >
              등록
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default AdminAnnouncementCreatePage;
