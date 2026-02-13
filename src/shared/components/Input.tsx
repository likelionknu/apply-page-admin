interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type = "text", placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-admin-box w-full rounded-[10px] px-7 py-4"
    />
  );
}

export default Input;
