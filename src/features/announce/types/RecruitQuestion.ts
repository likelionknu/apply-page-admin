export interface Recruit {
  title: string;
  start_at: string | Date;
  end_at: string | Date;
  questions: RecruitQuestions[];
}

export interface RecruitQuestions {
  question: string;
  priority: number;
}
