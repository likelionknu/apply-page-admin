interface AnnouncementButtonProps {
  text: string;
}

const AnnouncementButton = ({ text }: AnnouncementButtonProps) => {
  return (
    <div className="bg-admin-box flex h-9 w-28 cursor-pointer items-center justify-center rounded-[10px] text-sm font-medium text-white hover:opacity-70">
      {text}
    </div>
  );
};

export default AnnouncementButton;
