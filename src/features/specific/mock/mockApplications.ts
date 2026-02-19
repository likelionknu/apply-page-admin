import type { SpecificApplication } from "@specific/components/modal/SpecificDetailmodal";

export interface ApplicationRow extends SpecificApplication {
  depart: string;
  memo: string;
  submitted_at: string;
  evaluation: string;
  status: string;
}

// 질문 답변 카드 목업에 사용할 예시 본문
const SAMPLE_ANSWER = `앵당도 딤돔 임다 논안 핫도젠는 이봄아내도든가. 콩컹겡에 목딜아소처럼 더블은 퀵센헤덴아의 여자슬으로, 으르망으며 매은느그, 난티로셈을 한톤테죠 곰닙니다. 으그도 머노라. 아한알박 개업애와 하안우조 힝량다, 브쯔느리니어오 엔미지다 컬로라 킷지돈옵지안 갑음딩디들, 애아다 길쪽에서 오왓욱케 안뉴거거너뇨고 암합살끼는 사슈앗왔느넴이기 소으밍는 주스다가 넉슨 아디진다 지잘 제마.

애소고로부터 멜괄르하잉히더밧 호엽런선랄초다 옥사경을 자라언옷은제틀, 물커드 솝빠란핸 은 물즈지모가 아가메라 예안아켈세야한테 겅잇다. 타툴조이두 아나이노 호겔르와 피다가기가 상모, 락래를 융아롤 아자 와모녠 헤비이게 씻일탈채를 레베다. 존시잔 딤하궐을 에오정돈들의 아제저다이의 이싱확난 거디버게 헤일킹다, 케티더다 소고마랑샤뜨리에 으줄조싱밀말란는가. 너 일날 살안이 티질빈 서디난슾고 란적다 아실살언에서 버더의 보이젯IH란 어머렌오에게, 애비흣나다. 샌왈바가 홍호앙 샤엔팔강 웅바이를 존디살학리여모대르, 정밀사에 실르기를 젠비지중은 여마참젠은 안상이에.

아비이는 가실항에서 헌디고 께젤일을 나스 다숨은 사거비도들 그걱멸덤고 다데덜 조합복, 엔콩리거 헤점군느 사앨봉이 찾아른벌리냐고 보엔테밀어야 젓거 니의거는, 베이볼에, 운형이 으락거다, 율돌뉴순은 싱디격로다 상코니언은 복잔다. 신깅이 랄강널스가 매조흔에, 두치 암빙깅의 단알트니무 인앤을, 배은는 엔산훙궁느이 금랭빠 키마으요다. 킁니요 포찌르 최왁가등인 안틀읻털게 빠강디은 더란으로 나오웰와가 수우룰란으로 나오웰와가 수우룰란으로 나오웰와가 수우룰란으로 나오웰와가`;

// 상세 모달 질문 3개에 재사용하는 목업 데이터
const SAMPLE_QUESTIONS: NonNullable<SpecificApplication["questions"]> = [
  {
    question: "강남대학교 멋쟁이사자처럼에 왜 지원하게 되었나요?",
    submittedCount: 798,
    answer: SAMPLE_ANSWER,
  },
  {
    question: "강남대학교 멋쟁이사자처럼에 왜 지원하게 되었나요?",
    submittedCount: 798,
    answer: SAMPLE_ANSWER,
  },
  {
    question: "강남대학교 멋쟁이사자처럼에 왜 지원하게 되었나요?",
    submittedCount: 798,
    answer: SAMPLE_ANSWER,
  },
];

// 공고 상세 페이지에서 사용하는 지원서 목록 목업 데이터
export const APPLICATIONS: ApplicationRow[] = [
  {
    application_id: 1,
    name: "황형진",
    email: "hyeongjin123@gmail.com",
    academicStatus: "재학",
    phone: "010-1234-1234",
    grade: "4학년",
    depart: "ICT융합공학부",
    department: "ICT융합공학부",
    studentId: "202100000",
    finalSubmittedAt: "2026년 1월 30일 오후 8시 51분",
    submissionStatus: "최종제출",
    questions: SAMPLE_QUESTIONS,
    memo: "안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    submitted_at: "최종 제출되지 않음",
    evaluation: "미등록",
    status: "임시저장",
  },
  {
    application_id: 7,
    name: "황형진",
    email: "hyeongjin123@gmail.com",
    academicStatus: "재학",
    phone: "010-1234-1234",
    grade: "4학년",
    depart: "ICT융합공학부",
    department: "ICT융합공학부",
    studentId: "202100000",
    finalSubmittedAt: "2026년 1월 30일 오후 8시 51분",
    submissionStatus: "최종제출",
    questions: SAMPLE_QUESTIONS,
    memo: "미등록",
    submitted_at: "최종 제출되지 않음",
    evaluation: "PASS",
    status: "임시저장",
  },
  {
    application_id: 15,
    name: "황형진",
    email: "hyeongjin123@gmail.com",
    academicStatus: "재학",
    phone: "010-1234-1234",
    grade: "4학년",
    depart: "ICT융합공학부",
    department: "ICT융합공학부",
    studentId: "202100000",
    finalSubmittedAt: "2026년 1월 30일 오후 8시 51분",
    submissionStatus: "최종제출",
    questions: SAMPLE_QUESTIONS,
    memo: "미등록",
    submitted_at: "최종 제출되지 않음",
    evaluation: "미등록",
    status: "임시저장",
  },
];
