import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto, Roboto_Mono } from "next/font/google";
import { StoreProvider } from "@/providers/StoreProvider";
import { ModalStoreProvider } from "@/providers/ModalStoreProvider";
import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VMC Subastas — Voyager",
  description: "Plataforma de subastas de vehículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${roboto.variable} ${robotoMono.variable} antialiased`}
        style={{
          minHeight: "100vh",
          /* Fallbacks si los tokens CSS aún no cargan (evita pantalla “en blanco”) */
          backgroundColor: "var(--vmc-color-background-primary, #F8FAF9)",
          color: "var(--vmc-color-text-primary, #191C1C)",
        }}
      >
        <StoreProvider>
          <ModalStoreProvider>
            {children}
          </ModalStoreProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
