import type { ResolvingMetadata } from 'next';
import PrivacyContent, { privacyMetadata } from '@/site/PrivacyContent';

export function generateMetadata(_props: PageProps<'/en/privacy'>, parent: ResolvingMetadata) {
  return privacyMetadata('en', parent);
}

export default function PrivacyPage() {
  return <PrivacyContent locale="en" />;
}
