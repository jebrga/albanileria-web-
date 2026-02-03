import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/discounts - Obtener descuentos activos
export async function GET() {
    try {
        const discounts = await prisma.discount.findMany({
            where: { isActive: true },
            orderBy: { minArea: 'asc' }
        });

        return NextResponse.json(discounts);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching discounts' }, { status: 500 });
    }
}

// Helper: Calcular descuento según área
export async function calculateDiscount(area) {
    try {
        const discounts = await prisma.discount.findMany({
            where: { isActive: true }
        });

        // Encontrar descuento aplicable
        const applicable = discounts.find(d => {
            if (d.minArea === null && d.maxArea === null) return false;
            if (d.minArea !== null && area < d.minArea) return false;
            if (d.maxArea !== null && area > d.maxArea) return false;
            return true;
        });

        return applicable ? applicable.percent : 0;
    } catch (error) {
        return 0;
    }
}
