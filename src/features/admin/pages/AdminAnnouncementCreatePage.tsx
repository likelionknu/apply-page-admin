import Header from "../../../shared/components/Header";
import SideNav from "../components/SideNav";

function AdminAnnouncementCreatePage() {
  return (
    <div className="min-h-screen w-full items-center bg-black">
      <div className="flex justify-center">
        <Header />
        <SideNav />
        <div className="flex w-360 flex-col items-center gap-6">
          <div className="mt-100 text-center text-[30px] text-white">
            공고 생성 페이지
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminAnnouncementCreatePage;
