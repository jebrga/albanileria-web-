import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto'
});

export const metadata = {
  title: 'Construcciones Pro - Presupuestos de Albañilería',
  description: 'Calcula presupuestos de albañilería de forma rápida y profesional. Contrapisos, cerámica, revoques y más.',
  keywords: 'albañilería, presupuestos, construcción, contrapisos, cerámica, revoques',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${roboto.variable}`}>
        <Header />
        <main style={{ minHeight: '70vh' }}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
