import Header from "../../../shared/components/Header";
import SideNav from "../components/SideNav";

function AdminAnnouncementPage() {
  return (
    <div className="min-h-screen w-full items-center bg-black">
      <div className="flex justify-center">
        <Header />
        <SideNav />
        <div className="mt-36 flex w-360 flex-col gap-6 p-10 text-white">
          <div className="text-center text-[30px] text-white">
            공고 리스트 페이지
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminAnnouncementPage;
