const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Crear usuario admin
    // Crear usuario admin
    const hashedPassword = await bcrypt.hash('max123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@albanileria.com' },
        update: {
            password: hashedPassword
        },
        create: {
            email: 'admin@albanileria.com',
            password: hashedPassword,
            role: 'ADMIN'
        }
    });
    console.log('✅ Admin user created:', admin.email);

    // Configuración básica
    const configs = [
        { key: 'phone', value: '5491161234567' },
        { key: 'email', value: 'ezequielgauna@albanileria.com' },
        { key: 'zone', value: 'GBA Norte (Los Polvorines, Grand Bourg, Tortuguitas)' },
        { key: 'company_name', value: 'Trabajos de Albañilería - Ezequiel Gauna' }
    ];

    for (const config of configs) {
        await prisma.config.upsert({
            where: { key: config.key },
            update: { value: config.value },
            create: config
        });
    }
    console.log('✅ Config created');

    // Descuentos
    const discounts = [
        {
            type: 'CASH_SMALL',
            percent: 10,
            minArea: 0,
            maxArea: 20,
            description: '8-10% descuento en efectivo para obras pequeñas (0-20m²)',
            isActive: true
        },
        {
            type: 'CASH_MEDIUM',
            percent: 15,
            minArea: 20,
            maxArea: 50,
            description: '12-18% descuento en efectivo para obras medianas (20-50m²)',
            isActive: true
        },
        {
            type: 'CASH_LARGE',
            percent: 22,
            minArea: 50,
            maxArea: null,
            description: '20-25% descuento en efectivo para obras grandes (+50m²)',
            isActive: true
        }
    ];

    for (const discount of discounts) {
        await prisma.discount.create({
            data: discount
        });
    }
    console.log('✅ Discounts created');

    // Medios de pago
    await prisma.paymentMethod.createMany({
        data: [
            {
                name: 'Efectivo',
                isActive: true,
                details: '{"message": "Descuento automático según tamaño de obra"}'
            },
            {
                name: 'Mercado Pago',
                isActive: true,
                details: '{"installments": 6, "noInterest": true, "message": "Hasta 6 cuotas sin interés"}'
            },
            {
                name: 'Ualá',
                isActive: true,
                details: '{"installments": 3, "noInterest": true}'
            }
        ]
    });
    console.log('✅ Payment methods created');

    // Servicios (migrar desde services.json)
    const services = [
        {
            name: 'Contrapisos',
            icon: '🔨',
            description: 'Preparación de base para pisos. Incluye materiales y mano de obra.',
            pricePerUnit: 8500,
            laborCost: 3500,
            unit: 'm²',
            order: 1
        },
        {
            name: 'Colocación de Cerámica',
            icon: '🔲',
            description: 'Instalación profesional de cerámica. Precio base con pastina incluida.',
            pricePerUnit: 12000,
            laborCost: 5500,
            unit: 'm²',
            order: 2
        },
        {
            name: 'Revoques',
            icon: '🎨',
            description: 'Revoque grueso y fino. Terminación lisa lista para pintar.',
            pricePerUnit: 9500,
            laborCost: 4200,
            unit: 'm²',
            order: 3
        },
        {
            name: 'Aberturas',
            icon: '🚪',
            description: 'Instalación de puertas y ventanas. Materiales opcionales.',
            pricePerUnit: 15000,
            laborCost: 8000,
            unit: 'unidad',
            order: 4
        },
        {
            name: 'Encadenamientos',
            icon: '⚡',
            description: 'Estructura de hormigón armado para refuerzo.',
            pricePerUnit: 18000,
            laborCost: 9000,
            unit: 'm',
            order: 5
        },
        {
            name: 'Paredes',
            icon: '🧱',
            description: 'Construcción de mampostería con ladrillos comunes o huecos.',
            pricePerUnit: 11000,
            laborCost: 4800,
            unit: 'm²',
            order: 6
        }
    ];

    for (const service of services) {
        await prisma.service.create({
            data: service
        });
    }
    console.log('✅ Services created');

    console.log('🎉 Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
