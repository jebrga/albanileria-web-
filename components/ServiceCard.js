import Link from 'next/link';
import styles from './ServiceCard.module.css';
import { formatCurrency } from '@/lib/calculations';

export default function ServiceCard({ service }) {
    return (
        <Link href={`/calculadora?service=${service.id}`} className={styles.card}>
            <div className={styles.cardIcon}>{service.icon}</div>

            <h3 className={styles.cardTitle}>{service.name}</h3>

            <p className={styles.cardDescription}>{service.description}</p>

            <div className={styles.cardPrice}>
                <span className={styles.priceLabel}>Desde</span>
                <span className={styles.priceAmount}>
                    {formatCurrency(service.pricePerUnit)}
                </span>
                <span className={styles.priceUnit}>/ {service.unit}</span>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.viewDetails}>
                    Ver detalles →
                </span>
            </div>
        </Link>
    );
}
