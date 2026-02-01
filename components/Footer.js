import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>
                            <span className={styles.footerIcon}>🏗️</span>
                            Ezequiel Gauna
                        </h3>
                        <p className={styles.footerDescription}>
                            Trabajos de albañilería profesionales con más de 10 años de experiencia.
                            Calidad garantizada y presupuestos transparentes.
                        </p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerSubtitle}>Navegación</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/">Inicio</Link></li>
                            <li><Link href="/calculadora">Calculadora</Link></li>
                            <li><Link href="/mis-presupuestos">Mis Presupuestos</Link></li>
                            <li><Link href="/contacto">Contacto</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerSubtitle}>Servicios</h4>
                        <ul className={styles.footerLinks}>
                            <li>Contrapisos</li>
                            <li>Colocación de Cerámica</li>
                            <li>Revoques</li>
                            <li>Aberturas</li>
                            <li>Encadenamientos</li>
                            <li>Paredes</li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerSubtitle}>Contacto</h4>
                        <ul className={styles.footerLinks}>
                            <li>📞 +54 9 11 1234-5678</li>
                            <li>📧 info@construcciones.com</li>
                            <li>📍 Buenos Aires, Argentina</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© {currentYear} Trabajos de Albañilería - Ezequiel Gauna. Todos los derechos reservados.</p>
                    <p className={styles.footerCredit}>
                        Hecho con 💪 para profesionales de la construcción
                    </p>
                </div>
            </div>
        </footer>
    );
}
