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
