import type { ResolvingMetadata } from 'next';
import PrivacyContent, { privacyMetadata } from '@/site/PrivacyContent';

export function generateMetadata(_props: PageProps<'/privacy'>, parent: ResolvingMetadata) {
  return privacyMetadata('ko', parent);
}

export default function PrivacyPage() {
  return <PrivacyContent locale="ko" />;
}
