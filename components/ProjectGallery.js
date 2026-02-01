'use client';

import { useState } from 'react';
import styles from './ProjectGallery.module.css';

const projects = [
    {
        id: 1,
        title: 'Contrapiso Living',
        description: 'Nivelación perfecta en tiempo récord para hogar familiar',
        beforeImage: '/proyectos/living_contrapiso_antes.png',
        afterImage: '/proyectos/living_contrapiso_despues.png',
    },
    {
        id: 2,
        title: 'Cocina con Cerámica',
        description: 'Transformación completa con cerámicos modernos',
        beforeImage: '/proyectos/cocina_ceramica_antes.png',
        afterImage: '/proyectos/cocina_ceramica_despues.png',
    },
    {
        id: 3,
        title: 'Instalación de Aberturas',
        description: 'Ventanas y puertas modernas en casa familiar',
        beforeImage: '/proyectos/aberturas_antes.png',
        afterImage: '/proyectos/aberturas_despues.png',
    },
    {
        id: 4,
        title: 'Contrapiso Industrial',
        description: 'Base sólida con malla de acero y terminación lisa',
        beforeImage: '/proyectos/contrapiso_antes.png',
        afterImage: '/proyectos/contrapiso_despues.png',
    },
    {
        id: 5,
        title: 'Baño Completo',
        description: 'Instalación precisa de cerámica premium',
        beforeImage: '/proyectos/ceramica_antes.png',
        afterImage: '/proyectos/ceramica_despues.png',
    },
    {
        id: 6,
        title: 'Revoque Exterior',
        description: 'Terminación impecable que protege y embellece',
        beforeImage: '/proyectos/revoque_antes.png',
        afterImage: '/proyectos/revoque_despues.png',
    },
];

export default function ProjectGallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imageSrc, title) => {
        setSelectedImage({ src: imageSrc, title });
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className={styles.projectsGrid}>
                {projects.map(project => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.beforeAfter}>
                            <div className={styles.imageContainer} onClick={() => openModal(project.beforeImage, `${project.title} - ANTES`)}>
                                <img src={project.beforeImage} alt={`${project.title} antes`} />
                                <div className={styles.label}>ANTES</div>
                                <div className={styles.zoomIcon}>🔍</div>
                            </div>
                            <div className={styles.imageContainer} onClick={() => openModal(project.afterImage, `${project.title} - DESPUÉS`)}>
                                <img src={project.afterImage} alt={`${project.title} después`} />
                                <div className={styles.label}>DESPUÉS</div>
                                <div className={styles.zoomIcon}>🔍</div>
                            </div>
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>

            {/* Modal para ampliar imagen */}
            {selectedImage && (
                <div className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>✕</button>
                        <h3 className={styles.modalTitle}>{selectedImage.title}</h3>
                        <img src={selectedImage.src} alt={selectedImage.title} className={styles.modalImage} />
                    </div>
                </div>
            )}
        </>
    );
}
