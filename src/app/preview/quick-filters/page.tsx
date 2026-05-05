import QuickFilters from "@/features/QuickFilters/QuickFilters";

export default function QuickFiltersPreviewPage() {
  return (
    <>
      <style>{`
        .vmc-offer-card:hover,
        .vmc-category-card:hover {
          transform: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
          background: #FFFFFF !important;
        }
      `}</style>
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      "100vh",
        background:     "#FFFFFF",
        padding:        40,
      }}>
        <QuickFilters />
      </div>
    </>
  );
}
