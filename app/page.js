import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import ProjectGallery from '@/components/ProjectGallery';
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
              Trabajos de Albañilería <br />
              <span className={styles.heroHighlight}>Ezequiel Gauna</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Especialistas en trabajos de albañilería con más de 10 años de experiencia.
              Calcula tu presupuesto de forma rápida, transparente y profesional.
            </p>

            <div className={styles.heroButtons}>
              <Link href="/calculadora" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                📐 Calcular Presupuesto Ahora
              </Link>
              <Link href="/contacto" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                📞 Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Rápido y Fácil</h3>
              <p>Obtén tu presupuesto en menos de 5 minutos sin complicaciones</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💎</div>
              <h3>Transparente</h3>
              <p>Desglose detallado de materiales y mano de obra</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Precios Actualizados</h3>
              <p>Valores del mercado actualizados constantemente</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💾</div>
              <h3>Guarda y Compara</h3>
              <p>Guarda múltiples presupuestos y compáralos</p>
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
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className={styles.ctaSubtitle}>
              Calcula tu presupuesto ahora y da el primer paso hacia tu obra soñada
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
