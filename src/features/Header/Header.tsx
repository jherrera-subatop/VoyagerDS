import type { JSX } from 'react';
import type { HeaderProps } from './types';

function AvatarIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const STYLES = `
  /* ── Botón INGRESA (guest) — mismo estilo que pill logged-in ── */
  .vmc-header-btn {
    display:        inline-flex;
    align-items:    center;
    gap:            10px;
    height:         38px;
    padding:        0 16px 0 4px;
    border:         1.5px solid var(--voyager-color-live, #ED8936);
    border-radius:  9999px;
    background:     linear-gradient(135deg,
                      rgba(237,137,54,0.14) 0%,
                      rgba(237,137,54,0.05) 100%);
    color:          #FFFFFF;
    font-family:    var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size:      13px;
    font-weight:    700;
    letter-spacing: 0.02em;
    cursor:         pointer;
    transition:     background 150ms cubic-bezier(0.3,0,0,1),
                    transform  150ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-header-btn__icon {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           30px;
    height:          30px;
    border-radius:   9999px;
    border:          1.5px solid rgba(237,137,54,0.50);
    background:      rgba(237,137,54,0.15);
    flex-shrink:     0;
  }
  .vmc-header-btn:hover {
    background: linear-gradient(135deg, rgba(237,137,54,0.42) 0%, rgba(237,137,54,0.22) 100%);
  }
  .vmc-header-btn:active {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--voyager-color-live, #ED8936) 55%, oklch(0 0 0)) 0%,
      color-mix(in oklch, var(--voyager-color-live, #ED8936) 35%, oklch(0 0 0)) 100%);
    border-color: color-mix(in oklch, var(--voyager-color-live, #ED8936) 70%, oklch(0 0 0));
    transform: scale(0.97);
  }
  .vmc-header-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.6); outline-offset: 2px; }

  /* ── Pill usuario logueado ── */
  .vmc-header-user {
    display:        inline-flex;
    align-items:    center;
    gap:            10px;
    height:         38px;
    padding:        0 16px 0 4px;
    border-radius:  9999px;
    border:         1.5px solid var(--voyager-color-live, #ED8936);
    background:     linear-gradient(135deg,
                      rgba(237,137,54,0.14) 0%,
                      rgba(237,137,54,0.05) 100%);
    color:          #FFFFFF;
    font-family:    var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size:      13px;
    font-weight:    400;
    cursor:         pointer;
    transition:     background 150ms cubic-bezier(0.3,0,0,1),
                    border-color 150ms cubic-bezier(0.3,0,0,1),
                    transform    150ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-header-user:hover {
    background: linear-gradient(135deg, rgba(237,137,54,0.42) 0%, rgba(237,137,54,0.22) 100%);
  }
  .vmc-header-user:active {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--voyager-color-live, #ED8936) 55%, oklch(0 0 0)) 0%,
      color-mix(in oklch, var(--voyager-color-live, #ED8936) 35%, oklch(0 0 0)) 100%);
    border-color: color-mix(in oklch, var(--voyager-color-live, #ED8936) 70%, oklch(0 0 0));
    transform: scale(0.97);
  }
  .vmc-header-user:focus-visible { outline: 2px solid rgba(255,255,255,0.6); outline-offset: 2px; }
  .vmc-header-user__icon {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           30px;
    height:          30px;
    border-radius:   9999px;
    border:          1.5px solid rgba(237,137,54,0.50);
    background:      rgba(237,137,54,0.15);
    flex-shrink:     0;
  }
  .vmc-header-user strong {
    font-weight: 700;
    color:       var(--voyager-color-live, #ED8936);
  }
`;

export default function Header({ className, onIngresa, onUserClick, user }: HeaderProps): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <header
        className={className}
        style={{
          width:           '100%',
          maxWidth:        1024,
          height:          64,
          backgroundColor: 'var(--voyager-color-vault, #22005C)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'flex-end',
          paddingLeft:     24,
          paddingRight:    24,
          boxSizing:       'border-box',
          flexShrink:      0,
        }}
      >
        {user !== undefined ? (
          <button
            type="button"
            className="vmc-header-user"
            onClick={onUserClick}
            aria-label={`Bienvenido, ${user}`}
          >
            <span className="vmc-header-user__icon">
              <AvatarIcon />
            </span>
            Bienvenido, <strong>{user}</strong>
          </button>
        ) : (
          <button
            type="button"
            className="vmc-header-btn"
            onClick={onIngresa}
            aria-label="Ingresar a la plataforma"
          >
            <span className="vmc-header-btn__icon">
              <AvatarIcon />
            </span>
            Ingresa
          </button>
        )}
      </header>
    </>
  );
}
