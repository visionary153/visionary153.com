# 로또부자 소개 → 웹 체험 링크 plan

- 생성: 2026-10-30 17:00
- 수정: 2026-10-30 17:30
- 상태: 구현 완료, 사용자 확인 대기

## 목표

AdSense 심사(등록 사이트 visionary153.com)에서 루트 사이트와 실제 콘텐츠가 있는 lotto-rich.visionary153.com이 이어져 보이도록, 로또부자 소개에 "웹에서 체험하기" 링크를 둔다.

## 기록

- 브랜치: `feature/lotto-web-link-plan`
- `LOTTO_RICH_WEB_URL` 상수(site.ts), 사전 `lotto.webCta` (ko "웹에서 체험하기", en "Try it on the web" (처음엔 "(Korean)"을 붙였다가 사용자 요청으로 뺌))
- Products 카드의 소개 문구(tagline) 아래 테두리 버튼(`.webCta`, accent 테두리·글자, hover 시 accent-soft 배경)
- 버튼이 세로 flex 부모에서 가로로 늘어나 `align-self: flex-start` 추가
- 검증 통과: prettier(변경 파일), lint, typecheck, build(ko·en 링크 확인), 로컬 정적 서버 캡처 PC·모바일 360px
