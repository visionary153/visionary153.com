import Script from 'next/script';
import { ADSENSE_CLIENT } from '@/lib/site';

/**
 * Google AdSense 스크립트. <head>에 직접 두면 AdSense가 head 맨 앞에 스크립트를 끼워 넣어 hydration 불일치가 나므로
 * 페이지가 뜬 뒤 불러온다. 소유확인은 레이아웃 metadata의 google-adsense-account 메타 태그가 맡는다.
 */
export default function AdSenseScript() {
  return (
    <Script
      id="adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
