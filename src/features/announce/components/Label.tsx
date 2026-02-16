function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="tracking-tight-custom text-admin-label text-[13px] font-medium md:text-[14px]">
      {children}
    </label>
  );
}

export default Label;
