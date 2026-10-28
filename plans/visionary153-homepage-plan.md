# visionary153.com 홈페이지 plan

- 생성: 2026-10-28 11:40
- 수정: 2026-10-28 15:05
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
