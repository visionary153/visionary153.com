# 배포 전 SEO·인증 태그 보강 plan

- 생성: 2026-10-29 14:24
- 수정: 2026-10-29 15:00
- 상태: 배포 설정 완료, 첫 배포 대기(사용자 실행)

## 목표

`visionary153.com` 배포 전에 검색 등록·링크 미리보기·파비콘을 갖추고 빌드한다.

- 네이버 서치어드바이저 소유확인 메타 태그 (`naver-site-verification`)를 `/`와 언어별 페이지 `<head>`에 넣는다
- 루트 `/`에도 OG·트위터 카드를 넣는다 (미리보기 봇은 JS 리다이렉트를 따라가지 않음)
- `favicon.ico`를 추가한다 (SVG를 지원하지 않는 브라우저·검색엔진이 `/favicon.ico`를 직접 요청)

## 작업 체크리스트

- [x] `src/lib/site.ts`에 `NAVER_SITE_VERIFICATION` 상수, `(root)`·`(site)` 레이아웃 `verification.other`에 적용
- [x] OG 이미지 렌더링을 `src/lib/brandImages.tsx`로 옮기고 `(root)/opengraph-image.tsx` 추가 (한국어)
- [x] `(root)` 레이아웃에 openGraph·twitter 메타 추가
- [x] `src/app/favicon.ico` 생성 (16·32·48px PNG 포함)
- [x] 포맷, lint, typecheck, build, 결과 `<head>` 확인

## 기록
### 기록 (2026-10-29 14:45)

- 가정: favicon은 PNG 아이콘을 따로 두지 않고 `src/app/favicon.ico` 하나(16·32·48px PNG 포함)로 대신함 — Next가 `/favicon.ico`를 내보내고 모든 페이지에 `<link rel="icon" sizes="48x48">`를 넣어 줌. 생성은 브랜드 아이콘(`appIconResponse`와 같은 그라데이션+심볼)을 next/og로 그려 ICO로 묶음(일회성 스크립트, 저장소에 넣지 않음). 브랜드 색·심볼이 바뀌면 다시 만들어야 함
- 루트 OG 이미지가 확장자 없이 `/opengraph-image-<해시>`로 나와서 `public/_headers`에 Content-Type을 추가함
- 루트 `/`의 OG 문구·이미지는 한국어(기본 언어) 홈과 같게 함
- 검증 통과: prettier(변경 파일), lint, typecheck, build. `out/`의 `/`·`/ko/`·`/en/privacy/` `<head>`에 naver-site-verification, og:image, twitter:image, favicon.ico, icon.svg, apple-touch-icon이 있는지 확인. 루트 OG 이미지(1200×630) 육안 확인
- 미실행: 실제 배포 뒤 네이버 소유확인, 카카오톡·슬랙 미리보기 (배포 전이라 불가)

### 기록 (2026-10-29 15:00 배포 설정)

- 결정(사용자): Cloudflare Pages 대신 **Workers 정적 자산**으로 배포. wrangler 4.155의 `pages project create`가 Workers로 위임되며 실패해서(설정 파일 없음) 선택지를 물음
- 추가: `wrangler.jsonc`(assets `out/`, `force-trailing-slash`, `404-page`), `.github/workflows/deploy.yml`(main push·수동 실행 → npm ci·lint·typecheck·build → wrangler-action으로 `wrangler deploy`, wrangler 4.155.0 고정), `.gitignore`에 `.wrangler`. CLAUDE.md 배포 항목 수정
- 가정: 커스텀 도메인은 설정 파일에 넣지 않고 대시보드에서 연결 — 넣으면 API 토큰에 Zone 권한까지 필요
- 검증 통과: `wrangler deploy --dry-run` (out/ 469개 파일 읽음)
- 미실행: 첫 배포 — Claude Code 권한 분류기가 운영 배포를 막음. 사용자가 직접 실행하거나 push로 Actions 배포
