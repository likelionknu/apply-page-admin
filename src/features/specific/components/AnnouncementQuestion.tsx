interface AnnouncementQuestionProps {
  order: number;
  content: string;
}

export const AnnouncementQuestion = ({
  order,
  content,
}: AnnouncementQuestionProps) => {
  return (
    <div className="flex flex-col gap-2.5 lg:w-full lg:flex-row lg:items-center lg:gap-3">
      <div className="bg-admin-box flex h-9.25 w-22.75 items-center rounded-[10px] px-3.5 py-2.5 lg:h-full lg:w-28">
        <div className="text-xs font-medium text-[#5A5A5A] lg:text-sm">
          순서 {order}
        </div>
      </div>

      <div className="bg-admin-box flex w-full items-center rounded-[10px] px-5 py-3 text-xs font-medium text-white lg:px-7.5 lg:py-2.5 lg:text-base">
        {content}
      </div>
    </div>
  );
};
