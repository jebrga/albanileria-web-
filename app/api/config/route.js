import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/config - Obtener toda la configuración
export async function GET() {
    try {
        const config = await prisma.config.findMany();

        // Convertir a objeto key-value
        const configObj = config.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        return NextResponse.json(configObj);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching config' }, { status: 500 });
    }
}

// PUT /api/config - Actualizar configuración (solo admin)
export async function PUT(request) {
    try {
        // Verificar sesión
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('admin-session');

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(sessionCookie.value);
        if (session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { key, value } = await request.json();

        const updated = await prisma.config.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating config' }, { status: 500 });
    }
}
