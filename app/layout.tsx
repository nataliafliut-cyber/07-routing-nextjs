import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode; // <-- Додали типізацію для modal
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          {modal} {/* <-- Додали рендер слота modal */}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}