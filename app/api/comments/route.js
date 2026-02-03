import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/comments - Obtener comentarios aprobados
export async function GET() {
    try {
        const comments = await prisma.comment.findMany({
            where: { isApproved: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 });
    }
}

// POST /api/comments - Crear comentario (requiere moderación)
export async function POST(request) {
    try {
        const data = await request.json();

        const comment = await prisma.comment.create({
            data: {
                name: data.name,
                comment: data.comment,
                service: data.service,
                rating: data.rating || 5,
                isApproved: false // Requiere aprobación admin
            }
        });

        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating comment' }, { status: 500 });
    }
}
