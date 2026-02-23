export function MobileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const isEmpty = value === "미등록";

  return (
    <div className="flex">
      <span className="text-admin-label flex w-18 items-center text-left text-[13px] font-medium">
        {label}
      </span>

      <div className="flex h-7 items-center rounded-[10px] px-4">
        <span
          className={`text-[13px] font-medium ${
            isEmpty ? "text-admin-disable" : "text-admin-white"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
