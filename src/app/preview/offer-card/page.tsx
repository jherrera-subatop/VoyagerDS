import ListingArea from "@/features/ListingArea/ListingArea";

export default function ListingAreaPreviewPage() {
  return (
    <div style={{
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      minHeight:      "100vh",
      background:     "#FFFFFF",
      padding:        40,
    }}>
      <div style={{
        background:   "#F2F4F3",
        borderRadius: 8,
        padding:      24,
      }}>
        <ListingArea />
      </div>
    </div>
  );
}
