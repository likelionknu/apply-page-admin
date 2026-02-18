interface AnnouncementTitleTextProps {
  text: string;
}

export default function AnnouncementTitleText({
  text,
}: AnnouncementTitleTextProps) {
  return <div className="justify-start text-xl font-medium text-white">{text}</div>;
}
