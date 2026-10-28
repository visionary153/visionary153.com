# visionary153.com

visionary153(개발자·사업체)의 프로덕트 소개 홈페이지. 업무 흐름은 `Project/claude-process/Default-Working-Process.md`를 따른다. Next.js 버전별 주의는 [AGENTS.md](AGENTS.md).

## 스택·배포

- Next.js 16 App Router + 정적 내보내기(`output: 'export'`, `trailingSlash: true`) → `out/`
- 배포: Cloudflare Pages (GitHub 연결, 빌드 `npm run build`, 출력 `out`). 서버 기능(rewrites, headers, proxy, 쿠키 등) 사용 불가 — 응답 헤더는 `public/_headers`
- 스타일: CSS Modules + `src/app/globals.css`의 CSS 변수(라이트/다크는 `prefers-color-scheme`)
- 폰트: IBM Plex Sans KR (`next/font/google`, 빌드 시 자체 호스팅). OG 이미지용 TTF는 `assets/fonts/`

## 구조

- `src/app/(root)/` — `/` 전용 루트 레이아웃. 저장된 언어 → 브라우저 언어 순으로 `/ko/`·`/en/`으로 이동
- `src/app/(site)/[lang]/` — 언어별 페이지(홈, `privacy/`), 메타, OG 이미지
- 루트 레이아웃이 둘이라 404는 `src/app/global-not-found.tsx`
- 문구는 모두 `src/dictionaries/ko.ts`·`en.ts` (en은 ko 타입을 따름). 도메인·이메일 등 상수는 `src/lib/site.ts`
- `src/components/mockups/` — 로또부자 앱 화면 HTML 목업. 실제 스크린샷을 받으면 교체 예정

## 규칙

- 제품 표기: 로또부자 / Lotto Wealthy. 연락처는 이메일만, GitHub 링크 없음
- 분석: Google 태그 관리자(`GTM_ID`, `src/lib/site.ts`)는 `(site)` 레이아웃에만. 수집 항목이 바뀌면 개인정보처리방침도 함께 고친다
- 로또부자 소개에 "당첨 확률 상승·예측" 표현 금지
- 확인: `npm run lint`, `npm run typecheck`(route 타입 생성 포함), `npm run build`, 로컬 확인은 `npm run preview`
- 포맷: Prettier (`npm run format`)
