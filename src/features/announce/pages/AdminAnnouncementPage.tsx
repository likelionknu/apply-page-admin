import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";

function AdminAnnouncementPage() {
  return (
    <div className="bg-black1 text-white1 flex w-full flex-col">
      <Header />
      <div className="mx-auto mt-30 flex min-h-screen w-full max-w-360 flex-col items-center gap-6">
        공고 생성 페이지
      </div>
      <Footer />
    </div>
  );
}
export default AdminAnnouncementPage;
