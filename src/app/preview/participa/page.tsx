import type { JSX } from 'react';
import Participa from '@/features/Participa/Participa';
import Related from '@/features/Related/Related';

export default function ParticipaPreviewPage(): JSX.Element {
  return (
    <div style={{
      display:         'flex',
      alignItems:      'flex-start',
      justifyContent:  'center',
      gap:             48,
      minHeight:       '100vh',
      padding:         48,
      backgroundColor: '#E8EAEB',
    }}>
      <Participa />
      <Related />
    </div>
  );
}
