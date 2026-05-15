import HeaderMobile from "@/features/HeaderMobile/HeaderMobile";
import NavigationHeader from "@/features/NavigationHeader/NavigationHeader";
import { ListingCardsGrid } from "@/features/ListingArea/ListingArea";
import FooterMobile from "@/features/FooterMobile/FooterMobile";
import BannerPlaceholder from "@/components/ui/BannerPlaceholder";

export default function NavigationHeaderPreviewPage() {
  return (
    <main style={{ background: "var(--vmc-color-background-secondary)",
      minHeight: "100vh", display: "flex", justifyContent: "center", padding: "40px 0" }}>

      {/* 420px frame */}
      <div style={{ width: 420, display: "flex", flexDirection: "column",
        borderRadius: 4, overflow: "hidden",
        outline: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>

        {/* Header: full-width, manages own bg */}
        <HeaderMobile />

        {/* White content area */}
        <div style={{ background: "#FFFFFF", display: "flex", flexDirection: "column",
          gap: 16, padding: "24px 24px 16px" }}>
          <BannerPlaceholder height={126} label="Banner" />
          <NavigationHeader />
          <ListingCardsGrid />
          <BannerPlaceholder height={230} label="Centro de Ayuda" />
        </div>

        {/* Footer: full-width, manages own bg + padding */}
        <FooterMobile />
      </div>
    </main>
  );
}
