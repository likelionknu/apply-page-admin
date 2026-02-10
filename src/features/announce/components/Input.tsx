interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
}

function Input({ type = "text", placeholder, value }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className="bg-black3 w-full rounded-[10px] px-7 py-4"
    />
  );
}

export default Input;
