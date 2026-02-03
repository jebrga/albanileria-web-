import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/quotes - Obtener todos los presupuestos
export async function GET() {
    try {
        const quotes = await prisma.quote.findMany({
            include: { service: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(quotes);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching quotes' }, { status: 500 });
    }
}

// POST /api/quotes - Crear presupuesto
export async function POST(request) {
    try {
        const data = await request.json();

        const quote = await prisma.quote.create({
            data: {
                serviceId: data.serviceId,
                area: data.area,
                options: JSON.stringify(data.options || {}),
                total: data.total,
                discount: data.discount || 0,
                finalPrice: data.finalPrice
            },
            include: { service: true }
        });

        return NextResponse.json(quote);
    } catch (error) {
        console.error('Error creating quote:', error);
        return NextResponse.json({ error: 'Error creating quote' }, { status: 500 });
    }
}
