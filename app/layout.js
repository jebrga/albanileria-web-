import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Providers from '@/components/Providers';
import { ConfigProvider } from '@/components/ConfigProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto'
});

export const metadata = {
  title: 'Albañilería GBA Norte - Presupuestos Económicos Los Polvorines, Grand Bourg | Ezequiel Gauna',
  description: 'Precios justos para reformas y albañilería en GBA Norte. Descuentos hasta 25% en efectivo. Calculadora gratis. Servimos Los Polvorines, Grand Bourg, Tortuguitas y zona norte.',
  keywords: 'albañilería GBA Norte, presupuestos económicos Los Polvorines, remodelaciones baratas Grand Bourg, reformas Tortuguitas, albañil barato, cerámica económica, contrapisos económicos, revoque barato, ampliaciones',
  authors: [{ name: 'Ezequiel Gauna' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Albañilería GBA Norte - Presupuestos Económicos',
    description: 'Precios justos para reformas. Descuentos hasta 25% en efectivo. Los Polvorines, Grand Bourg, Tortuguitas.',
    type: 'website',
    locale: 'es_AR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${roboto.variable}`}>
        <ThemeProvider>
          <ConfigProvider>
            <Providers>
              <Header />
              <main style={{ minHeight: '70vh' }}>
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
            </Providers>
          </ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
