'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState({
        phone: process.env.NEXT_PUBLIC_PHONE || '5491161234567',
        email: 'ezequielgauna@albanileria.com',
        zone: process.env.NEXT_PUBLIC_ZONE || 'GBA Norte',
        company_name: 'Trabajos de Albañilería - Ezequiel Gauna'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const response = await fetch('/api/config');
                if (response.ok) {
                    const data = await response.json();
                    if (data && Object.keys(data).length > 0) {
                        setConfig(data);
                    }
                }
            } catch (error) {
                console.error('Error fetching config:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ config, loading }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    return useContext(ConfigContext);
}
