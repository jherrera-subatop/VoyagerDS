"use client";
import type { JSX } from "react";

const PJS = "var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif)";

interface RelatedCardProps {
  href: string;
  imageSrc: string;
  name: string;
  year: string;
  price: string;
}

function SubasCoinIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 size-icon-sm" aria-hidden>
      <path d="M11.4 22L2.7 18.4C1.4 17.9 1.4 16.1 2.7 15.6L11.4 12C11.8 11.8 12.2 11.8 12.7 12L21.3 15.6C22.6 16.1 22.6 17.9 21.3 18.4L12.7 22C12.2 22.2 11.8 22.2 11.4 22Z" fill="#9AFCF4" />
      <path d="M12 23C11.7 23 11.4 22.9 11.1 22.8L2.3 19.1C1.5 18.8 1 18.1 1 17.2 1 16.3 1.5 15.6 2.3 15.2L11.1 11.6C11.7 11.3 12.3 11.3 12.9 11.6L21.7 15.2C22.5 15.6 23 16.3 23 17.2 23 18.1 22.5 18.8 21.7 19.1L12.9 22.8C12.6 22.9 12.3 23 12 23ZM12 12.4C11.8 12.4 11.7 12.5 11.6 12.5L2.8 16.2C2.3 16.4 2.1 16.8 2.1 17.2 2.1 17.6 2.3 18 2.8 18.2L11.6 21.9C11.8 22 12.2 22 12.4 21.9L21.2 18.2C21.7 18 21.9 17.6 21.9 17.2 21.9 16.8 21.7 16.4 21.2 16.2L12.4 12.5C12.3 12.5 12.2 12.4 12 12.4Z" fill="#367976" />
      <path d="M12 1C7.5 1 3.7 4.6 3.7 9.1 3.7 13.6 7.5 17.4 12 17.4 16.6 17.4 20.2 13.6 20.2 9.1 20.2 4.6 16.5 1 12 1Z" fill="#367976" />
      <path d="M14.9 10.8C14.9 9.2 13.6 8.8 12.5 8.5L12.4 8.5V6.7C12.9 6.8 13.4 7 13.7 7.4L14.8 6.3C14.2 5.5 13.3 5.1 12.4 5V3.7H11.8V5C10.4 5.2 9.2 6.1 9.2 7.6 9.2 9.2 10.5 9.7 11.6 10 11.7 10 11.7 10 11.8 10V11.7C11.2 11.6 10.6 11.3 10.2 10.8L9.1 12C9.8 12.9 10.8 13.3 11.8 13.4V14.7H12.4V13.4C13.8 13.2 14.9 12.3 14.9 10.8ZM10.9 7.4C10.9 7 11.3 6.7 11.8 6.7V8.3C11.3 8.1 10.9 7.9 10.9 7.4ZM12.4 11.7V10.2C12.9 10.4 13.2 10.6 13.2 11 13.2 11.4 12.9 11.7 12.4 11.7Z" fill="white" />
    </svg>
  );
}

function HeartIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="size-icon-sm fill-current" aria-hidden style={{ color: "color-mix(in oklch, var(--color-vault) 40%, oklch(1 0 0))" }}>
      <path d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z" fill="currentColor" />
    </svg>
  );
}

function RelatedCard({ href, imageSrc, name, year, price }: RelatedCardProps): JSX.Element {
  return (
    <div
      className="relative w-full rounded"
      style={{
        backgroundColor: "var(--color-surface-card, #FFFFFF)",
        borderBottom: "8px solid var(--color-live, #ED8936)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
        borderRadius: "var(--radius-sm, 4px)",
      }}
    >
      {/* Image area */}
      <div className="relative w-full h-28">
        {/* Price badge */}
        <div
          className="absolute inline-flex items-center gap-1 pointer-events-none z-10"
          style={{
            top: 8, left: 8,
            backgroundColor: "var(--color-vault, #22005C)",
            borderRadius: 9999,
            padding: "3px 10px 3px 4px",
          }}
        >
          <SubasCoinIcon />
          <span style={{
            fontFamily: PJS,
            fontSize: 12,
            fontWeight: 700,
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}>
            {price}
          </span>
        </div>

        {/* Image link */}
        <a href={href} className="relative block w-full h-full" style={{ zIndex: 1 }}>
          <img
            loading="lazy"
            src={imageSrc}
            alt=""
            className="object-cover object-center w-full h-full overflow-hidden"
            style={{ borderRadius: "var(--radius-sm, 4px) var(--radius-sm, 4px) 0 0" }}
          />
        </a>

        {/* Empty badge slot */}
        <div className="absolute flex items-center gap-2 bottom-2 left-2" style={{ zIndex: 2 }} />

        {/* Favorite button */}
        <div className="absolute bottom-0 right-0 mb-2 mr-2 rounded-full" style={{ zIndex: 2, boxShadow: "0 8px 16px rgba(0,0,0,0.10)" }}>
          <button
            aria-label="me interesa"
            className="flex items-center justify-center w-6 h-6 rounded-full focus:outline-none"
            style={{ backgroundColor: "var(--color-surface-card, #FFFFFF)", boxShadow: "var(--shadow-card, 0 8px 16px oklch(0.22 0.18 285 / 6%))" }}
          >
            <HeartIcon />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="h-12 px-4 pt-3 description">
        <a href={href} className="block focus:outline-none">
          <h4 style={{
            fontFamily: PJS,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '20px',
            color: "#191C1C",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {name}
          </h4>
          <p style={{
            fontFamily: PJS,
            fontSize: 13,
            fontWeight: 400,
            lineHeight: '18px',
            color: "var(--color-vault-mid, #3B1782)",
            margin: 0,
          }}>
            {year}
          </p>
        </a>
      </div>
    </div>
  );
}

export default function Related(): JSX.Element {
  return (
    <div
      className="w-full px-5 py-6 mt-4 rounded"
      style={{
        width: "317px",
        backgroundColor: "var(--color-surface-card, #FFFFFF)",
        boxShadow: "var(--shadow-card, 0 8px 16px oklch(0.22 0.18 285 / 6%))",
        borderRadius: "var(--radius-sm, 4px)",
      }}
    >
      <h3
        style={{
          fontFamily:  PJS,
          fontSize:    22,
          fontWeight:  700,
          lineHeight:  '28px',
          color:       "var(--color-vault-mid, #3B1782)",
          margin:      0,
          paddingLeft: 12,
          borderLeft:  "4px solid var(--color-vault-mid, #3B1782)",
        }}
      >
        Ofertas Relacionadas
      </h3>

      <div id="related-offers" className="grid grid-cols-2 gap-2 mt-3">
        <RelatedCard
          href="/oferta/61484"
          imageSrc="/demo/bronco.jpg"
          name="BMW X1"
          year="2025"
          price="US$ 14,999"
        />
        <RelatedCard
          href="/oferta/61487"
          imageSrc="/demo/bronco.jpg"
          name="Ford Ranger"
          year="2001"
          price="US$ 1,499"
        />
        <RelatedCard
          href="/oferta/61486"
          imageSrc="/demo/bronco.jpg"
          name="Nissan Versa"
          year="2021"
          price="US$ 2,499"
        />
        <RelatedCard
          href="/oferta/61488"
          imageSrc="/demo/bronco.jpg"
          name="BMW X5"
          year="2008"
          price="US$ 2,999"
        />
      </div>
    </div>
  );
}
