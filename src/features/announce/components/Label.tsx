function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="tracking-tight-custom text-[14px] font-medium text-[#6d6d6d]">
      {children}
    </label>
  );
}

export default Label;
