export default function Footer() {
  return (
    <footer className="bg-admin-box text-gray2 mt-75 w-full">
      <div className="mx-auto max-w-360 space-y-2 px-10 py-12 text-[14px]">
        <p className="text-admin-white">
          © 2026 LIKELION KNU. All rights reserved.
        </p>
        <p className="text-admin-sub leading-7 whitespace-pre-line">
          {`실습실 : 경기도 용인시 기흥구 강남로 40 강남대학교 후생관 104호
            동아리실 : 경기도 용인시 기흥구 강남로 40 강남대학교 후생관 멋쟁이사자처럼
            프로젝트 개발 : 프로젝트 코어`}
        </p>
      </div>
    </footer>
  );
}
