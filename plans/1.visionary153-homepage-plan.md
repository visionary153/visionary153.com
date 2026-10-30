# visionary153.com 홈페이지 plan

- 생성: 2026-10-28 11:40
- 수정: 2026-10-28 15:30
- 상태: 구현 완료, 사용자 확인·배포 대기

## 목표

visionary153(개발자·사업체) 프로덕트 소개 홈페이지를 `visionary153.com`에 정적 사이트로 배포한다.

- 메시지: "기술로, 사람을 이롭게" — 기술이 사람을 이롭게 한다는 철학
- 한국어 `/ko/`, 영어 `/en/` 지원. `/`는 브라우저 언어(또는 사용자가 고른 언어)로 이동
- 현재 소개할 프로덕트: 로또부자(영문 Lotto Wealthy) — 대표 화면 3개와 기능
- 파비콘·메타 태그(OG, hreflang, canonical, JSON-LD)·sitemap·robots·ads.txt·app-ads.txt
- 개인정보처리방침 페이지 (`/ko/privacy/`, `/en/privacy/`)

### 확정 사항 (사용자 결정)

- 스택: Next.js(App Router) + SSG(`output: 'export'`), TypeScript, CSS Modules
- 배포: **Cloudflare Pages** (GitHub 연결, 빌드 결과 `out/`)
- 디자인: Claude Design 시안 https://claude.ai/artifact/1j4Kq6aCrJUYrteqq5sQ3t 를 소스 그대로 옮긴다. 단, 2026-10-28 수정:
  1. 첫 섹션(히어로)은 높이를 낮추고 단순하게 — 앱 소개로 빨리 넘어가도록
  2. 두 번째 섹션(철학, "기술은 결국 사람을 위한 것이어야 합니다")은 삭제
- 제품 표기: **로또부자 / Lotto Wealthy**
- 연락처는 이메일 `visionary153.dev@gmail.com`만. GitHub 링크 없음. "153"의 의미 소개 없음
- 폰 목업: 실제 스크린샷은 사용자가 나중에 제공 → 그 전까지 시안의 HTML 목업을 컴포넌트로 옮겨 둔다
- 폰트: IBM Plex Sans KR (`next/font/google`, 빌드 시 자체 호스팅)

## 구조

```
src/app/
├─ (root)/layout.tsx, page.tsx     /  언어 감지 후 이동 (스크립트 없으면 언어 선택 링크)
├─ (site)/[lang]/layout.tsx        <html lang>, 언어별 메타, 헤더·푸터
├─ (site)/[lang]/page.tsx          홈
├─ (site)/[lang]/privacy/page.tsx  개인정보처리방침
├─ (site)/[lang]/opengraph-image.tsx
├─ icon.svg, apple-icon, manifest, sitemap, robots
src/components/  섹션·공용 컴포넌트, mockups/ (폰 목업 3개)
src/dictionaries/ ko.ts, en.ts
src/lib/  site 설정(도메인·이메일 등 상수), i18n
public/   로고 SVG, ads.txt, app-ads.txt, _headers
```

## 작업 체크리스트

- [x] 1. 프로젝트 생성 (create-next-app), ESLint + Prettier, `output: 'export'` 설정, CLAUDE.md 작성
- [x] 2. 디자인 토큰(라이트/다크 CSS 변수), 폰트, 로고 자산
- [x] 3. i18n: 사전(ko/en), `[lang]` 정적 경로, `/` 언어 이동, 언어 전환 링크
- [x] 4. 홈: 헤더, 히어로(낮고 단순하게), 프로덕트(로또부자 + 폰 목업 3개 + 칩 + 안내문), 다음 프로덕트, 문의, 푸터
- [x] 5. 개인정보처리방침 페이지 (ko/en)
- [x] 6. 메타: title/description, OG·Twitter, hreflang·canonical, JSON-LD, OG 이미지, 파비콘·manifest, sitemap, robots
- [x] 7. ads.txt·app-ads.txt 자리(게시자 ID 나오면 채움), Cloudflare `_headers`
- [x] 8. 검증: lint, 타입체크, 빌드, 산출물 확인, 로컬 실행 확인
- [ ] 9. Cloudflare Pages 배포 안내 (사용자가 GitHub push 후 연결)

## 기록

- 2026-10-28 11:40 가정: 칩 "회원가입 없이 바로 사용"은 앱이 서버·계정 없이 동작하므로 유지 (사용자 미확인).
- 2026-10-28 11:40 가정: ads.txt·app-ads.txt는 게시자 ID가 아직 없어 주석만 있는 파일로 둔다.
- 2026-10-28 15:05 결정: `/`의 hreflang x-default는 `/`(언어 이동 페이지), 하위 페이지는 `/ko/…`.
- 2026-10-28 15:05 결정: 확장자 없이 내보내지는 `apple-icon`, `/{lang}/opengraph-image-*`는 `_headers`에서 `Content-Type: image/png` 지정.
- 2026-10-28 15:05 미구현: `favicon.ico`는 만들지 않음 (`icon.svg` + `apple-icon` PNG로 대체, 아주 오래된 브라우저만 영향).
- 2026-10-28 15:05 가정: 개인정보처리방침의 보호책임자는 "visionary153" + 이메일로 표기 (실명 표기 여부는 사용자 확인 필요).

### 검증 (2026-10-28 15:05)

- 통과: `npm run lint`, `npm run typecheck`, `npm run build` (정적 페이지 16개, `out/` 생성)
- 통과: 산출물 확인 — `/`, `/ko/`, `/en/`, `/ko/privacy/`, `/en/privacy/`, `404.html`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `icon.svg`, `apple-icon`(180 PNG), `icon-192/512.png`, OG 이미지(1200×630 PNG, 언어별), `ads.txt`, `app-ads.txt`, `_headers`
- 통과: `<head>` 확인 — title·description·canonical·hreflang(ko/en/x-default)·OG·Twitter·theme-color·JSON-LD. privacy 페이지도 OG 이미지 상속 확인
- 통과: 로컬 실행(serve) + headless Chrome 캡처 — 데스크톱 라이트/다크, 영어, 390px(가로 넘침 없음), 개인정보처리방침, OG 이미지
- 통과: `/` 언어 이동 — 영어 브라우저 → `/en/`, 한국어 브라우저 → `/ko/`. 없는 경로는 404
- 미실행: Cloudflare Pages 실제 배포 (GitHub push는 사용자가 진행)

### 변경 (2026-10-28 15:30)

- `/` 언어 이동: 저장된 선택 → 브라우저 선호 언어 중 처음 맞는 ko/en → 못 정하면 **한국어(기본값)**. 이전에는 한국어가 아니면 모두 영어였음. 스크립트가 꺼져 있으면 `<noscript>` meta refresh로 `/ko/`.
- 검증 통과: lint, typecheck, build. Chrome 언어별 확인 — ko-KR → /ko/, en-US → /en/, ja-JP → /ko/
- 미실행: 스크립트 꺼진 브라우저 확인 (headless 테스트에서 결과를 얻지 못함)

### 결정 (2026-10-28)

- 폰 목업은 실제 앱 스크린샷 이미지(WebP + 설명적인 alt)로 교체한다 — SEO는 HTML 목업보다 alt·설명 문장·구조화 데이터가 좌우하고, HTML 재현은 앱과 계속 어긋나므로. 스크린샷을 받을 때까지 현재 HTML 목업(lotto-rich `design/` 시안 기반, 예시 데이터)을 그대로 둔다.

### 변경 (2026-10-28 문구·레이아웃 수정)

- 히어로 소개 문구 변경, "프로덕트 보기" 버튼 삭제
- 프로덕트: 부제 "일상에 작은 이로움을 더하는 앱" 삭제, "프로덕트"를 큰 제목(h2)으로
- 문의: "함께 이야기해요"·답장 안내 문구 삭제, "문의"를 큰 제목으로, 메일 버튼 축소(높이 46, 좌우 18px)
- 1100px 이하: 폰 화면 3개를 세로로 쌓지 않고 가로 스와이프(scroll-snap). 다음 화면이 살짝 보이게 카드 여백까지 넓힘, 키보드 포커스 가능
- 검증 통과: lint, typecheck, build, Chrome 캡처(1440·1000·390px). 미실행: 실제 터치 기기에서 스와이프 확인
- 섹션 제목(프로덕트·문의) 44px → 20px(모바일 18px), 이전처럼 강조색 라벨로 되돌림 — 제품명 '로또부자'가 더 강조되도록. lint·build·캡처 확인 통과

### 변경 (2026-10-28 슬라이드)

- 1100px 이하: 폰 화면+설명을 한 장씩 보여 주는 슬라이드(`ScreenCarousel`, 라이브러리 없이 scroll-snap + 작은 스크립트). 4초마다 자동 넘김, 마지막 다음은 처음으로
- 자동 넘김 멈춤: 사용자가 스와이프·점 클릭·키 입력하면 멈춤(재생 버튼으로 다시 시작), 실제 마우스 hover·키보드 포커스 동안 일시정지, 화면 밖이면 쉼, 동작 줄이기 설정이면 처음부터 멈춤. 점 3개(이동) + 멈춤/재생 버튼(WCAG 2.2.2)
- 1100px 초과: 기존처럼 3장 나란히
- 검증 통과: lint, typecheck, build. CDP로 390px 모바일 에뮬레이션 실시간 확인 — 0s QR → 4.6s 번호 생성 → 8.8s 내 번호 → 13s 처음으로, pointerdown 후 5초간 멈춤 유지. 캡처로 점·버튼 표시 확인
- 미실행: 실제 휴대폰 터치 스와이프

### 변경 (2026-10-28 GTM·문구)

- 히어로 소개 문구 18→21px(모바일 16→18), 섹션 제목(프로덕트·문의) 20→24px(모바일 18→20), 색 유지
- 번호 생성 안내문("재미를 위한 기능…") 삭제
- Google 태그 관리자(GTM-N76Z8CCV) 추가: `(site)/[lang]` 레이아웃(/ko·/en 모든 페이지). `/`(언어 이동)·404에는 넣지 않음 — 이동 페이지가 페이지뷰를 중복으로 남기지 않도록
- 개인정보처리방침 수정: "쿠키를 사용하지 않습니다" → Google 애널리틱스(GTM)의 쿠키·수집 항목·거부 방법, 4항에 Google LLC(미국) 국외 이전 추가 (ko/en)
- 검증 통과: lint, typecheck, build. CDP로 /ko/ 로드 시 gtm.js 200, dataLayer gtm.js·gtm.dom·gtm.load 확인
- 미확인: GTM 컨테이너 안의 GA4 태그 게시 여부 (로드 후 GA 수집 요청은 관찰되지 않음)

### 변경 (2026-10-28 뱃지·슬라이드 재수정)

- 뱃지 문구: 회원가입 없이 무료 사용 / 알고리즘 기반 번호 생성 / 백업·복원 지원 / 연속 QR 당첨 확인 (en: Free, no sign-up / Algorithm-based number generator / Backup & restore / Continuous QR result check)
- 슬라이드: 재생·멈춤 버튼 삭제, 영구 정지(스와이프·점 클릭·키 입력 시) 삭제. 마우스가 슬라이드 위에 있을 때만 일시정지, 직접 넘기면 그 장부터 4초 다시 셈. 화면 밖 일시정지·키보드 포커스 일시정지·동작 줄이기 시 정지도 삭제(동작 줄이기면 미끄러짐 없이 바로 전환)
- 결정: 일시정지 버튼이 없어 WCAG 2.2.2(움직이는 콘텐츠 정지 수단)는 충족하지 않음 — 사용자 요청, 내용이 장식·보조 성격이라 수용
- 검증 통과: lint, typecheck, build. CDP 1000px 실시간 — 4.6초 자동 넘김, 점 클릭 후에도 계속, 마우스 올린 9초간 그대로, 내리면 재개, 동작 줄이기 설정에서도 자동 넘김
