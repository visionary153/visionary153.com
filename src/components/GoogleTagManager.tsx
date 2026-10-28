import Script from 'next/script';
import { GTM_ID } from '@/lib/site';

// Google 태그 관리자 기본 설치 코드 (head 스크립트)
const gtmSnippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export function GoogleTagManagerScript() {
  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {gtmSnippet}
    </Script>
  );
}

/** 스크립트가 꺼진 브라우저용 — body 맨 앞에 둔다 */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
