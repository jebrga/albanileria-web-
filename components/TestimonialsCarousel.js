'use client';

import { useState, useEffect } from 'react';
import styles from './TestimonialsCarousel.module.css';

const TESTIMONIALS = [
    {
        id: 1,
        name: "Mariela R.",
        location: "Los Polvorines",
        testimonial: "Excelente trabajo en mi baño. Me explicaron cada paso y ahorré un montón pagando en efectivo.",
        savings: "20%",
        avatar: "M"
    },
    {
        id: 2,
        name: "Carlos M.",
        location: "Grand Bourg",
        testimonial: "Trabajo honesto y precios justos. Recomiendo 100%. Hicieron el contrapiso de mi patio perfecto.",
        savings: "15%",
        avatar: "C"
    },
    {
        id: 3,
        name: "Laura P.",
        location: "Tortuguitas",
        testimonial: "Me explicaron todo paso a paso, sin apuros. Muy didácticos y profesionales.",
        savings: "18%",
        avatar: "L"
    },
    {
        id: 4,
        name: "Roberto G.",
        location: "Pablo Nogués",
        testimonial: "Amplié mi casa con ellos. Precios accesibles y cumplieron todo en plazo. Muy conformes.",
        savings: "22%",
        avatar: "R"
    }
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const goToPrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const goToSlide = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    const currentTestimonial = TESTIMONIALS[currentIndex];

    return (
        <div className={styles.carousel}>
            <div className={styles.testimonialCard}>
                <div className={styles.avatar}>
                    {currentTestimonial.avatar}
                </div>

                <div className={styles.content}>
                    <p className={styles.testimonialText}>
                        "{currentTestimonial.testimonial}"
                    </p>

                    <div className={styles.author}>
                        <strong>{currentTestimonial.name}</strong>
                        <span className={styles.location}>{currentTestimonial.location}</span>
                    </div>

                    <div className={styles.savings}>
                        🔥 Ahorró <strong>{currentTestimonial.savings}</strong> en efectivo
                    </div>
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.navButton}
                    onClick={goToPrev}
                    aria-label="Testimonio anterior"
                >
                    ‹
                </button>

                <div className={styles.dots}>
                    {TESTIMONIALS.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Ir a testimonio ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    className={styles.navButton}
                    onClick={goToNext}
                    aria-label="Testimonio siguiente"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
