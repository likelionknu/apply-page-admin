# apply-page-admin

LIKELION KNU 지원 시스템의 관리자 웹 애플리케이션입니다.  
사용자 관리, 모집 공고 관리, 공고별 지원서 검토/상태 변경 작업을 수행합니다.

## 주요 기능

- Google OAuth 로그인 (ADMIN 권한 사용자만 접근 허용)
- 사용자 관리
- 사용자 목록 조회
- 사용자 상세 조회 (모달)
- 사용자 권한(USER/ADMIN) 변경
- 사용자 강제 삭제
- 관리자 계정 숨기기 필터
- 모집 공고 관리
- 공고 목록 조회 및 상태 필터(전체/예정/모집 중/종료)
- 공고 생성
- 공고 수정
- 공고 삭제
- 공고 상세 관리
- 지원서 목록 조회
- 지원서 상세 조회 (질문/답변 포함)
- 지원서 평가(PASS/FAIL/HOLD) 변경
- 지원서 상태 변경
- 지원서 메모 등록
- 지원서 삭제
- 1차/최종 결과 발송 API 트리거

## 기술 스택

- React 19
- TypeScript 5
- Vite 7 (`rolldown-vite`)
- Tailwind CSS 4
- React Router DOM 7
- Axios
- react-responsive
- ESLint + Prettier

## 프로젝트 구조

```text
src
├─ routes
│  └─ AppRouters.tsx
├─ shared
│  ├─ apis            # axios 인스턴스, Google OAuth 처리
│  ├─ components      # Header/Footer/Modal/Button/Input
│  └─ styles
└─ features
   ├─ main            # 로그인 페이지
   ├─ userlist        # 사용자 관리
   ├─ announce        # 공고 생성/수정
   ├─ status          # 공고 목록/상태 관리
   └─ specific        # 공고 상세 + 지원서 검토
```

## 라우트

- `/` : Google OAuth 콜백 처리 (`code` 수신 후 로그인 API 호출)
- `/login` : 관리자 로그인 페이지
- `/admin/user-list` : 사용자 관리
- `/admin/announcements` : 공고 페이지(현재 플레이스홀더)
- `/admin/announcements/management` : 공고 목록/상태 관리
- `/admin/announcements/create` : 공고 생성
- `/admin/announcements/edit/:recruitId` : 공고 수정
- `/admin/announcements/specific/:id` : 공고 상세 및 지원서 관리

## 시작하기

### 요구 사항

- Node.js 20 이상 (CI는 Node.js 24.12.0 사용)
- npm 또는 pnpm

### 설치 및 실행

```bash
npm install
npm run dev
```

또는

```bash
pnpm install
pnpm dev
```

### 빌드/검증

```bash
npm run build
npm run lint
npm run preview
```

## 인증 및 세션 동작

- 로그인 성공 시 `sessionStorage`에 `accessToken`, `refreshToken`, `userName` 저장
- 공통 axios 인스턴스(`src/shared/apis/index.ts`)에서 Authorization 헤더 자동 주입
- 401 응답 시 `/v1/auth/reissue`로 토큰 재발급 시도
- 재발급 실패 시 세션 초기화 후 `/`로 이동
- 일반 사용자 계정으로 로그인하면 `/login?reason=no-access`로 이동

## 배포

- Vercel 배포 구성 사용 (`vercel.json` SPA rewrite)
- GitHub Actions: `main` 브랜치 push 시 자동 빌드/배포
- 워크플로우 파일: `.github/workflows/vercel.yml`

## 참고 사항

- `src/features/announce/pages/AdminAnnouncementPage.tsx`는 현재 안내용 플레이스홀더입니다.
- 테스트 코드는 아직 구성되어 있지 않습니다.
