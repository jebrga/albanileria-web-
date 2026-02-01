// Funciones para gestionar servicios y datos

import servicesData from '@/data/services.json';

/**
 * Obtiene todos los servicios disponibles
 * @returns {Array} - Array de servicios
 */
export function getAllServices() {
    return servicesData.services;
}

/**
 * Obtiene un servicio por su ID
 * @param {string} id - ID del servicio
 * @returns {Object|null} - Servicio o null si no existe
 */
export function getServiceById(id) {
    return servicesData.services.find(s => s.id === id) || null;
}

/**
 * Filtra servicios por categoría
 * @param {string} category - Categoría a filtrar
 * @returns {Array} - Array de servicios filtrados
 */
export function getServicesByCategory(category) {
    return servicesData.services.filter(s => s.category === category);
}

/**
 * Busca servicios por término de búsqueda
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} - Array de servicios que coinciden
 */
export function searchServices(searchTerm) {
    const term = searchTerm.toLowerCase();
    return servicesData.services.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
    );
}

/**
 * Obtiene todas las categorías únicas de servicios
 * @returns {Array} - Array de categorías
 */
export function getAllCategories() {
    const categories = servicesData.services.map(s => s.category);
    return [...new Set(categories)];
}
