import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inter as FontSans } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { AlertDialogStoreProvider } from '@/providers/alert-dialog-store-provider';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '24 點',
  description: '24 點',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div
          className="absolute h-full w-full opacity-30"
          style={{
            backgroundImage: `url(/b2.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: '-999',
          }}
        />
        <AlertDialogStoreProvider>{children}</AlertDialogStoreProvider>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
