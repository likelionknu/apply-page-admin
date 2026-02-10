import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import Input from "../components/Input";
import Label from "../components/Label";
import DropdownImg from "../assets/dropdown.png";

const InputLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
};

const CancelIcon = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center rounded-[50%] bg-[#E55336] px-2 py-4">
      <div className="bg-gray2 h-1 w-5"></div>
    </div>
  );
};

const MOCK_QUESTION_LIST = [
  {
    id: 1,
    order: 1,
    value: "질문 1",
  },
  {
    id: 2,
    order: 2,
    value: "질문 2",
  },
  {
    id: 3,
    order: 3,
    value: "질문 3",
  },
];

function AdminAnnouncementCreatePage() {
  return (
    <div className="bg-black1 text-white1 flex w-full flex-col">
      <Header />
      <main className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6">
        <div className="w-full pb-75 md:px-31">
          <div className="tracking-tight-custom text-[30px] font-medium">
            모집 공고 등록
          </div>
          <div className="mt-10">
            <span className="tracking-tight-custom text-gray2 font-medium md:text-[20px]">
              공고 기본 정보
            </span>
            <div className="mt-8">
              <InputLayout>
                <Label>모집 공고 명을 입력해주세요.</Label>
                <Input placeholder="모집 공고 명" />
              </InputLayout>
              <div className="mt-7 flex gap-7">
                <InputLayout>
                  <Label>모집 시작일을 선택해주세요.</Label>
                  <Input type="date" placeholder="2025.01.03" />
                </InputLayout>
                <InputLayout>
                  <Label>모집 종료일을 선택해주세요.</Label>
                  <Input type="date" placeholder="2025.01.03" />
                </InputLayout>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <span className="tracking-tight-custom text-gray2 text-[20px] font-medium">
                공고 입력 질문 설정
              </span>
              <div className="tracking-tight-custom text-purple text-[15px] font-medium">
                <span className="text-[20px]">+</span> 새 질문 추가
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-7">
              {MOCK_QUESTION_LIST.map((item) => (
                <div className="flex items-center gap-5">
                  <div className="text-gray2 bg-black3 flex cursor-pointer items-center justify-between rounded-[10px] px-3 py-2 text-[14px] font-medium md:w-26.75">
                    <span>순서 {item.order}</span>
                    <img src={DropdownImg} alt="드랍다운" className="w-2.5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="질문 입력"
                    value={item.value}
                  />
                  <CancelIcon />
                </div>
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
