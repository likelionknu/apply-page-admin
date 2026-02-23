export function InfoRow({ label, value }: { label: string; value: string }) {
  const displayValue = !value || value.trim() === "" ? "미등록" : value;

  const isEmpty = displayValue === "미등록";

  return (
    <div className="border-admin-outline-2 mb-0 flex h-11 items-center border-b text-[12px]">
      <span className="text-admin-label w-21 shrink-0">{label}</span>
      <span className={isEmpty ? "text-admin-disable" : "text-admin-white"}>
        {displayValue}
      </span>
    </div>
  );
}
