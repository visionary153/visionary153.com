# AdSense 도입 plan

- 생성: 2026-10-29 20:30
- 수정: 2026-10-29 21:00
- 상태: 구현 완료, 사용자 확인 대기

## 목표

AdSense에 등록한 사이트 `visionary153.com`의 소유확인을 통과하고, 광고 도입 전에 개인정보처리방침을 갱신한다. (광고 표시는 lotto-rich 웹)

## 작업 체크리스트

- [x] `public/ads.txt` 게시자 줄 (이전 작업에서 커밋되지 않은 변경을 이 브랜치에 포함)
- [x] `ADSENSE_CLIENT` 상수, `(root)`·`(site)` 레이아웃에 `google-adsense-account` 메타 + `AdSenseScript`(afterInteractive)
- [x] 개인정보처리방침 4항 "광고" 추가(ko/en): 제3자 광고 쿠키, 맞춤 광고·거부 방법(Google 광고 설정, aboutads.info), Google 광고 데이터 안내. 이후 항목 번호 +1, 국외 이전 문장에 광고 포함
- [x] CLAUDE.md 규칙 한 줄

## 기록

- 브랜치: `feature/adsense-plan` (main에서 생성)
- 처음엔 `<head>`에 일반 async 스크립트로 넣었으나, lotto-rich에서 AdSense가 head에 스크립트를 끼워 넣어 hydration 불일치가 나는 것을 확인 → 두 사이트 모두 메타 태그(소유확인) + next/script afterInteractive로 통일
- 검증 통과: prettier(변경 파일), lint·typecheck·build, out/ `/`·`/ko/`에 google-adsense-account 메타, `/ko/privacy/`에 "4. 광고"
- 미실행: AdSense 콘솔 소유확인(배포 후 사용자)
- 우려: visionary153.com은 콘텐츠가 적어 AdSense 심사에서 "콘텐츠 부족" 거절 가능
