export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "미등록";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "미등록";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const isAM = hours < 12;
  const period = isAM ? "오전" : "오후";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${year}년 ${month}월 ${day}일 ${period} ${hours}시 ${minutes}분`;
};
