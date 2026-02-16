function AddQuestion({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      className="tracking-tight-custom text-admin-blue cursor-pointer text-[15px] font-medium"
      onClick={onAdd}
    >
      <span className="text-[20px]">+</span> 새 질문 추가
    </div>
  );
}

export default AddQuestion;
