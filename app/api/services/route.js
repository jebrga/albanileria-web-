import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/services - Obtener todos los servicios activos
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching services' }, { status: 500 });
    }
}

// POST /api/services - Crear servicio (admin only)
export async function POST(request) {
    try {
        const data = await request.json();

        const service = await prisma.service.create({
            data
        });

        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating service' }, { status: 500 });
    }
}
