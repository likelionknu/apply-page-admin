interface AnnouncementQuestionProps {
  order: number;
  content: string;
}

export const AnnouncementQuestion = ({
  order,
  content,
}: AnnouncementQuestionProps) => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="bg-admin-box flex h-9 w-28 items-center rounded-[10px] px-3.5 py-2.5">
        <div className="text-sm font-medium text-[#5A5A5A]">
          순서 {order}
        </div>
      </div>

      <div className="bg-admin-box flex h-9 w-full items-center rounded-[10px] px-7.5 py-2.5 text-base font-medium text-white">
        {content}
      </div>
    </div>
  );
};
