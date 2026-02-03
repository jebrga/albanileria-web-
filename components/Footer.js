'use client';

import Link from 'next/link';
import { useConfig } from './ConfigProvider';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { config } = useConfig();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>
                            <span className={styles.footerIcon}>🏗️</span>
                            {config.company_name}
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
                            <li>📞 {config.phone.replace(/(\d{2})(\d{1})(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3 $4-$5').replace(/^(\d{11,13})$/, (m) => m)}</li>
                            <li>📧 {config.email}</li>
                            <li>📍 {config.zone}</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© {currentYear} {config.company_name}. Todos los derechos reservados.</p>
                    <p className={styles.footerCredit}>
                        Hecho con 💪 para profesionales de la construcción
                    </p>
                </div>
            </div>
        </footer>
    );
}
