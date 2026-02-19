// GoogleLogin.ts
const GoogleLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    "client_id=" +
    CLIENT_ID +
    "&" +
    "redirect_uri=" +
    encodeURIComponent(REDIRECT_URI) +
    "&" +
    "response_type=code&" +
    "scope=email profile openid&" +
    "access_type=offline&" +
    "prompt=select_account";

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isAndroid = /android/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  // 카카오, 인스타, 라인, 페이스북 인앱 브라우저 식별
  const isInApp = /kakao|instagram|fbav|fb_iab|line|naver/.test(userAgent);

  if (isInApp) {
    if (isAndroid) {
      // 안드로이드: intent 스키마를 이용해 크롬으로 강제 실행
      // 그 후 사용자가 다시 로그인 버튼을 누르게 유도하거나,
      // 바로 구글 로그인 URL로 intent를 날릴 수도 있습니다.
      // 현재 페이지를 크롬으로 엽니다.
      const intentUrl = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
      window.location.href = intentUrl;
      console.log("REDIRECT_URI:", REDIRECT_URI);

      return;
    } else if (isIOS) {
      // iOS: 강제로 사파리를 띄우는 방법이 막혀있으므로 안내 메시지 출력
      alert(
        "구글 보안 정책으로 인해 인앱 브라우저에서는 로그인이 불가능합니다.\n오른쪽 상단 메뉴(...)를 눌러 '브라우저로 열기(Safari)'를 선택해주세요.",
      );
      return;
    }
  }

  // 일반 브라우저
  window.location.href = googleAuthUrl;
};

export default GoogleLogin;
