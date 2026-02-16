interface DescriptionTextProps {
  text: string;
  mt: number;
}

const AnnouncementDateText = ({ text, mt }: DescriptionTextProps) => {
  return (
    <div
      className={`text-admin-sub line-clamp-1 w-full justify-start text-lg font-medium mt-${mt}`}
    >
      {text}
    </div>
  );
};

export default AnnouncementDateText;
