export function Field({ label, value }: { label: string; value: string }) {
  const isEmpty = value === "미등록";

  return (
    <div className="flex flex-col gap-1">
      <span className="text-admin-label text-left text-[12px] font-medium">
        {label}
      </span>

      <div className="bg-admin-box flex h-8 items-center rounded-[10px] px-4">
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
