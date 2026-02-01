// Utilidades para integración con WhatsApp

import configData from '@/data/config.json';

/**
 * Genera un link de WhatsApp con mensaje predefinido
 * @param {Object} budgetData - Datos del presupuesto (opcional)
 * @param {string} customMessage - Mensaje personalizado (opcional)
 * @returns {string} - URL de WhatsApp
 */
export function generateWhatsAppLink(budgetData = null, customMessage = '') {
    const phone = configData.company.phone;
    let message = customMessage;

    if (budgetData && !customMessage) {
        message = formatBudgetMessage(budgetData);
    } else if (!customMessage) {
        message = '¡Hola! Me gustaría solicitar información sobre sus servicios de albañilería.';
    }

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Formatea un presupuesto como mensaje de WhatsApp
 * @param {Object} budget - Presupuesto a formatear
 * @returns {string} - Mensaje formateado
 */
function formatBudgetMessage(budget) {
    let message = `*Consulta de Presupuesto*\n\n`;

    if (budget.name) {
        message += `Presupuesto: *${budget.name}*\n\n`;
    }

    message += `*Servicios Solicitados:*\n\n`;

    budget.items.forEach((item, index) => {
        message += `${index + 1}. *${item.serviceName}*\n`;
        message += `   📏 Cantidad: ${item.quantity} ${item.unit}\n`;

        if (item.options && item.options.length > 0) {
            message += `   ⚙️ Opciones: ${item.options.map(o => o.label).join(', ')}\n`;
        }

        message += `   💰 Subtotal: $${item.subtotal.toLocaleString('es-AR')}\n\n`;
    });

    message += `*TOTAL: $${budget.total.toLocaleString('es-AR')}*\n\n`;
    message += `Me gustaría más información sobre este presupuesto y coordinar una visita para evaluar el trabajo.`;

    return message;
}

/**
 * Abre WhatsApp en una nueva ventana/pestaña
 * @param {string} link - Link de WhatsApp
 */
export function openWhatsApp(link) {
    window.open(link, '_blank', 'noopener,noreferrer');
}

/**
 * Contactar por WhatsApp con mensaje genérico
 */
export function contactViaWhatsApp() {
    const link = generateWhatsAppLink();
    openWhatsApp(link);
}

/**
 * Enviar presupuesto por WhatsApp
 * @param {Object} budget - Presupuesto a enviar
 */
export function sendBudgetViaWhatsApp(budget) {
    const link = generateWhatsAppLink(budget);
    openWhatsApp(link);
}
