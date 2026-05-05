import type { JSX } from 'react';

const STYLES = `
  body { background: #FFFFFF !important; }
  .preview-page { background: #FFFFFF !important; }
  .vmc-profile-link-demo {
    display:        inline-flex;
    align-items:    center;
    font-family:    var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size:      16px;
    font-weight:    700;
    color:          var(--voyager-color-vault-mid, #3B1782);
    text-decoration: none;
    border-radius:  4px;
    padding:        6px 10px;
  }
  .vmc-profile-link-demo svg {
    width: 12px;
    height: 12px;
    margin-left: 8px;
    fill: currentColor;
    transition: transform 150ms cubic-bezier(0.3,0,0,1);
  }
  /* Frozen hover */
  .vmc-profile-link-demo.is-hover {
    background-color: #E4E6E5;
  }
  .vmc-profile-link-demo.is-hover svg {
    transform: translateX(3px);
  }
  /* Frozen pressed */
  .vmc-profile-link-demo.is-active {
    background-color: color-mix(in srgb, #3B1782 22%, #FFFFFF);
    transform: scale(0.97);
  }
  .vmc-profile-link-demo.is-active svg {
    transform: translateX(3px);
  }
`;

function ChevronRight(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.4369 2.89369C5.27624 4.05435 5.27624 5.93616 6.4369 7.09682L11.3405 12.0004L6.43691 16.9039C5.27625 18.0646 5.27625 19.9464 6.43691 21.107C7.59758 22.2677 9.47938 22.2677 10.64 21.107L17.5052 14.2422C18.0891 13.6582 18.3977 12.903 18.4307 12.1382C18.4678 11.2815 18.1593 10.4127 17.5052 9.75858L10.64 2.89369C9.47937 1.73303 7.59757 1.73303 6.4369 2.89369Z" />
    </svg>
  );
}

const labelStyle = {
  fontFamily:    "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
  fontSize:      11,
  fontWeight:    600,
  color:         'rgba(0,0,0,0.40)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  marginBottom:  8,
};

export default function ProfileLinkPreviewPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="preview-page" style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        minHeight:      '100vh',
        backgroundColor: '#FFFFFF',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>

          {/* Default */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={labelStyle}>Default</p>
            <a href="#" className="vmc-profile-link-demo">
              Ir al perfil
              <ChevronRight />
            </a>
          </div>

          {/* Hover */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={labelStyle}>Hover</p>
            <a href="#" className="vmc-profile-link-demo is-hover">
              Ir al perfil
              <ChevronRight />
            </a>
          </div>

          {/* Pressed */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={labelStyle}>Pressed</p>
            <a href="#" className="vmc-profile-link-demo is-active">
              Ir al perfil
              <ChevronRight />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
