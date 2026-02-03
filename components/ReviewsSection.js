'use client';

import { useState } from 'react';
import styles from './ReviewsSection.module.css';

const REVIEWS = [
    {
        id: 1,
        name: "Mariela Rodríguez",
        location: "Los Polvorines",
        date: "Enero 2026",
        rating: 5,
        verified: true,
        comment: "Excelente trabajo en mi baño. Me explicaron cada paso del proceso y el resultado fue mejor de lo esperado. Muy agradecida con el descuento en efectivo, realmente se nota la diferencia.",
        service: "Revestimiento de Baño"
    },
    {
        id: 2,
        name: "Carlos Martínez",
        location: "Grand Bourg",
        date: "Diciembre 2025",
        rating: 5,
        verified: true,
        comment: "Trabajo honesto y precios justos. Hicieron el contrapiso de mi patio y quedó perfecto. Recomiendo 100%, son de palabra y cumplen lo que prometen.",
        service: "Contrapiso"
    },
    {
        id: 3,
        name: "Laura Pérez",
        location: "Tortuguitas",
        date: "Noviembre 2025",
        rating: 5,
        verified: true,
        comment: "No soy experta en construcción y tenía miedo de que me 'cagaran'. Pero estos muchachos fueron muy didácticos, me explicaron todo paso a paso. Muy conformes con la ampliación de la cocina.",
        service: "Ampliación"
    },
    {
        id: 4,
        name: "Roberto Gómez",
        location: "Pablo Nogués",
        date: "Octubre 2025",
        rating: 5,
        verified: true,
        comment: "Hice una ampliación importante y cumplieron todo en plazo. Los precios son accesibles para gente laburante como uno. Muy recomendables.",
        service: "Ampliación y Revoque"
    },
    {
        id: 5,
        name: "Ana Fernández",
        location: "Los Polvorines",
        date: "Enero 2026",
        rating: 5,
        verified: true,
        comment: "Contraté para poner cerámica en el living y la cocina. Trabajo prolijo y rápido. El descuento por pago en efectivo es real, no es verso. Lo recomiendo.",
        service: "Cerámica"
    }
];

export default function ReviewsSection() {
    const [showAll, setShowAll] = useState(false);
    const displayedReviews = showAll ? REVIEWS : REVIEWS.slice(0, 3);

    const renderStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    return (
        <div className={styles.reviewsSection}>
            <div className={styles.header}>
                <h2 className={styles.title}>💬 Lo que Dicen Nuestros Clientes</h2>
                <p className={styles.subtitle}>
                    Opiniones reales de vecinos del GBA Norte que confiaron en nosotros
                </p>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>5.0</div>
                        <div className={styles.statStars}>{renderStars(5)}</div>
                        <div className={styles.statLabel}>{REVIEWS.length} reseñas</div>
                    </div>
                </div>
            </div>

            <div className={styles.reviewsGrid}>
                {displayedReviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                            <div className={styles.avatar}>
                                {review.name.charAt(0)}
                            </div>
                            <div className={styles.reviewMeta}>
                                <div className={styles.reviewName}>
                                    {review.name}
                                    {review.verified && (
                                        <span className={styles.verifiedBadge} title="Cliente verificado">
                                            ✓
                                        </span>
                                    )}
                                </div>
                                <div className={styles.reviewLocation}>
                                    📍 {review.location} · {review.date}
                                </div>
                            </div>
                        </div>

                        <div className={styles.rating}>
                            {renderStars(review.rating)}
                        </div>

                        <div className={styles.service}>
                            Servicio: <strong>{review.service}</strong>
                        </div>

                        <p className={styles.comment}>
                            "{review.comment}"
                        </p>
                    </div>
                ))}
            </div>

            {REVIEWS.length > 3 && (
                <div className={styles.loadMore}>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Ver menos reseñas' : `Ver todas las ${REVIEWS.length} reseñas`}
                    </button>
                </div>
            )}

            <div className={styles.addReview}>
                <p>
                    ¿Ya trabajaste con nosotros? <strong>Dejanos tu opinión por WhatsApp</strong> 💬
                </p>
            </div>
        </div>
    );
}
