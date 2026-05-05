import type { JSX } from 'react';
import Related from '@/features/Related/Related';

export default function RelatedPreviewPage(): JSX.Element {
  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      minHeight:      '100vh',
      padding:        48,
    }}>
      <Related />
    </div>
  );
}
