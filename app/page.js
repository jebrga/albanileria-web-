import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import ProjectGallery from '@/components/ProjectGallery';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import ReviewsSection from '@/components/ReviewsSection';
import { getAllServices } from '@/lib/services';
import styles from './page.module.css';

export default function Home() {
  const services = getAllServices();

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Presupuestos Claros y al Alcance <br />
              <span className={styles.heroHighlight}>para Arreglar tu Casa sin que te Duela el Bolsillo</span>
            </h1>

            <p className={styles.heroSubtitle}>
              En estos tiempos, cada reforma cuenta. Precios justos para familias como la tuya en el GBA Norte
              – sin sorpresas ni letra chica. <strong>Servimos Los Polvorines, Grand Bourg, Tortuguitas y zona norte.</strong>
            </p>

            <div className={styles.heroButtons}>
              <Link href="/calculadora" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                📐 Calcular Presupuesto Gratis Ahora
              </Link>
              <a
                href="https://wa.me/5491131840652?text=Hola! Me gustaría solicitar información sobre sus servicios de albañilería."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem', background: '#25D366' }}
              >
                💬 Hablame por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Lo que Dicen Nuestros Clientes del Barrio
          </h2>
          <p className={styles.sectionSubtitle}>
            Vecinos del GBA Norte que confiaron en nosotros y ahorraron en sus reformas
          </p>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.reviews}>
        <div className="container">
          <ReviewsSection />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Rápido y Didáctico</h3>
              <p>Te explicamos cada paso sin apuros. Entendemos que es tu casa y querés saber todo.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💸</div>
              <h3>Opciones Económicas</h3>
              <p>Cuotas con Mercado Pago o descuentos en efectivo (hasta 10% OFF). Vos elegís.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛠️</div>
              <h3>Reformas y Ampliaciones</h3>
              <p>Desde contrapisos hasta extensiones modestas. Trabajos adaptados a tu presupuesto.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📲</div>
              <h3>Precios Actualizados 2026</h3>
              <p>Aprovechá antes de la próxima inflación. Precios honestos y reales para hoy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Before/After Projects */}
      <section className={styles.gallery}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Nuestros Trabajos
          </h2>
          <p className={styles.sectionSubtitle}>
            Antes y después de nuestros proyectos realizados. Haz clic en cualquier imagen para ampliarla.
          </p>

          <ProjectGallery />
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Nuestros Servicios
          </h2>
          <p className={styles.sectionSubtitle}>
            Selecciona el servicio que necesitas y obtén un presupuesto personalizado
          </p>

          <div className={styles.servicesGrid}>
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              ¿Listo para comenzar tu reforma?
            </h2>
            <p className={styles.ctaSubtitle}>
              Calculá tu presupuesto gratis ahora y descubrí cuánto podés ahorrar con efectivo.
              <strong> Cada peso cuenta en estos tiempos.</strong>
            </p>
            <Link href="/calculadora" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1.25rem 2.5rem' }}>
              Empezar Ahora →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
