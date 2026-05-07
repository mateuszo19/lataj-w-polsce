import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from './components/Auth/AuthContext';

export const metadata: Metadata = {
  title: "Lataj w Polsce",
  description: "Mapa Polski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="pl">
          <body className="h-screen">{children}</body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}
