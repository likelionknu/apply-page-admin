function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="bg-admin-box flex-1 cursor-pointer rounded-[10px] px-8 py-2 text-[14px] font-medium text-white contain-paint"
    >
      {children}
    </button>
  );
}

export default Button;
