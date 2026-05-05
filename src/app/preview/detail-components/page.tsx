import type { JSX } from 'react';
import Visitas from '@/features/Visitas/Visitas';
import GalleryMain from '@/features/GalleryMain/GalleryMain';
import AuctionConditions from '@/features/AuctionConditions/AuctionConditions';

const labelStyle: React.CSSProperties = {
  fontFamily:    "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
  fontSize:      11,
  fontWeight:    600,
  color:         'rgba(0,0,0,0.40)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom:  8,
};

export default function DetailComponentsPreviewPage(): JSX.Element {
  return (
    <div style={{
      display:         'flex',
      flexWrap:        'wrap',
      gap:             48,
      padding:         48,
      alignItems:      'flex-start',
      backgroundColor: '#E8EAEB',
      minHeight:       '100vh',
    }}>

      <div>
        <p style={labelStyle}>Visitas</p>
        <Visitas />
      </div>

      <div>
        <p style={labelStyle}>Gallery Main</p>
        <div style={{ width: 449, height: 362, borderRadius: 4, overflow: 'hidden' }}>
          <GalleryMain images={[
            '/demo/bronco.jpg',
            '/demo/bronco2.jpg',
            '/demo/bronco.jpg',
            '/demo/bronco2.jpg',
          ]} />
        </div>
      </div>

      <div>
        <p style={labelStyle}>Auction Conditions</p>
        <AuctionConditions />
      </div>

    </div>
  );
}
