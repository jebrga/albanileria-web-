'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>🏗️</span>
                        <span className={styles.logoText}>
                            <strong>Ezequiel Gauna</strong>
                        </span>
                    </Link>

                    <nav className={styles.nav}>
                        <Link
                            href="/"
                            className={isActive('/') ? styles.navLinkActive : styles.navLink}
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/calculadora"
                            className={isActive('/calculadora') ? styles.navLinkActive : styles.navLink}
                        >
                            Calculadora
                        </Link>
                        <Link
                            href="/mis-presupuestos"
                            className={isActive('/mis-presupuestos') ? styles.navLinkActive : styles.navLink}
                        >
                            Mis Presupuestos
                        </Link>
                        <Link
                            href="/contacto"
                            className={isActive('/contacto') ? styles.navLinkActive : styles.navLink}
                        >
                            Contacto
                        </Link>
                    </nav>

                    <Link href="/calculadora" className="btn btn-primary">
                        📐 Calcular Presupuesto
                    </Link>
                </div>
            </div>
        </header>
    );
}
