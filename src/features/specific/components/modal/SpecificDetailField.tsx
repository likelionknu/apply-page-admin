interface SpecificDetailFieldProps {
  label: string;
  value: string;
}

export function SpecificDetailField({ label, value }: SpecificDetailFieldProps) {
  const isEmpty = value === "미등록";

  return (
    <div className="flex flex-col gap-1">
      <span className="text-admin-label text-left text-[12px] font-medium">
        {label}
      </span>

      <div className="bg-admin-box flex h-11 items-center rounded-[10px] px-5">
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
