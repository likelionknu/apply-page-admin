import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/Modal";

function PendingPage() {
  return (
    <div className="bg-black1 h-dvh w-dvw">
      <Header />
      <Modal>
        <Modal.Title>🦁 관리자페이지입니다 🦁</Modal.Title>
        <Modal.Description>
          <span>
            최고의 환경에서 여러분들을 맞이하기 위해 조금만 기다려주세요.
          </span>
        </Modal.Description>
      </Modal>
      <Footer />
    </div>
  );
}

export default PendingPage;
