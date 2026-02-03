'use client';

import { useState } from 'react';
import styles from './BeforeAfterGallery.module.css';

const PROJECTS = [
    {
        id: 1,
        title: "Renovación de Baño",
        location: "Los Polvorines",
        description: "Revestimiento completo con cerámica económica",
        before: "/images/gallery/bathroom-before.jpg",
        after: "/images/gallery/bathroom-after.jpg",
        savings: "15%"
    },
    {
        id: 2,
        title: "Contrapiso Patio",
        location: "Grand Bourg",
        description: "Contrapiso para futura terraza cubierta",
        before: "/images/gallery/patio-before.jpg",
        after: "/images/gallery/patio-after.jpg",
        savings: "8%"
    },
    {
        id: 3,
        title: "Ampliación Cocina",
        location: "Tortuguitas",
        description: "Anexo de 12m² para agrandar cocina",
        before: "/images/gallery/kitchen-before.jpg",
        after: "/images/gallery/kitchen-after.jpg",
        savings: "10%"
    },
    {
        id: 4,
        title: "Revoque Exterior",
        location: "Pablo Nogués",
        description: "Revoque grueso + fino en frente de casa",
        before: "/images/gallery/exterior-before.jpg",
        after: "/images/gallery/exterior-after.jpg",
        savings: "7%"
    }
];

export default function BeforeAfterGallery() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className={styles.gallery}>
            <div className={styles.header}>
                <h2 className={styles.title}>📸 Trabajos Reales del GBA Norte</h2>
                <p className={styles.subtitle}>
                    Fotos crudas, sin retoques. Así quedaron realmente las reformas de nuestros clientes.
                </p>
            </div>

            <div className={styles.grid}>
                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className={styles.projectCard}
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className={styles.imagesContainer}>
                            <div className={styles.imageWrapper}>
                                <div className={styles.placeholder}>
                                    📷 ANTES
                                </div>
                                <span className={styles.label}>Antes</span>
                            </div>
                            <div className={styles.divider}>→</div>
                            <div className={styles.imageWrapper}>
                                <div className={styles.placeholder}>
                                    ✨ DESPUÉS
                                </div>
                                <span className={styles.label}>Después</span>
                            </div>
                        </div>

                        <div className={styles.projectInfo}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectLocation}>📍 {project.location}</p>
                            <p className={styles.projectDescription}>{project.description}</p>
                            <div className={styles.savingsBadge}>
                                Ahorro {project.savings} en efectivo
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.notice}>
                <p>
                    💡 <strong>Nota:</strong> Las fotos reales se cargarán próximamente. Estas son placeholders
                    de demostración. Todos los trabajos son verificables con referencias de vecinos del barrio.
                </p>
            </div>
        </div>
    );
}
