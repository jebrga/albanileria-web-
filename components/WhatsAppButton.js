'use client';

import { useConfig } from './ConfigProvider';
import { openWhatsApp } from '@/lib/whatsapp';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
    const { config } = useConfig();

    const handleClick = () => {
        const message = '¡Hola! Me gustaría solicitar información sobre sus servicios de albañilería.';
        const encodedMessage = encodeURIComponent(message);
        const link = `https://wa.me/${config.phone}?text=${encodedMessage}`;
        openWhatsApp(link);
    };

    return (
        <button
            className={styles.whatsappFloat}
            onClick={handleClick}
            aria-label="Contactar por WhatsApp"
            title="Contactar por WhatsApp"
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="white"
            >
                <path d="M16 0C7.164 0 0 7.164 0 16c0 2.824.736 5.488 2.016 7.792L.064 30.496l6.88-1.92C9.216 30.288 12.512 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.312c-2.496 0-4.864-.672-6.88-1.856l-.496-.288-5.024 1.4 1.344-4.896-.32-.512A13.248 13.248 0 012.688 16c0-7.36 5.984-13.312 13.312-13.312S29.312 8.64 29.312 16 23.36 29.312 16 29.312zm7.296-9.952c-.4-.2-2.368-1.168-2.736-1.296-.368-.128-.64-.2-.912.2-.272.4-1.056 1.296-1.296 1.568-.24.272-.48.304-.88.096-.4-.208-1.68-.624-3.2-1.984-1.184-1.056-1.984-2.368-2.216-2.768-.232-.4-.024-.616.176-.816.176-.176.4-.464.6-.688.2-.224.272-.384.4-.64.128-.256.064-.48-.032-.672-.096-.192-.912-2.192-1.248-3.008-.32-.784-.64-.672-.912-.688-.24-.016-.496-.016-.752-.016s-.688.096-1.056.48c-.368.384-1.408 1.376-1.408 3.36 0 1.984 1.44 3.904 1.64 4.16.192.256 2.816 4.304 6.816 6.032.96.416 1.696.656 2.272.848.96.304 1.84.256 2.528.16.768-.112 2.368-.976 2.704-1.92.336-.944.336-1.76.24-1.92-.096-.16-.352-.256-.752-.464z" />
            </svg>
        </button>
    );
}
