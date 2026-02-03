import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email y contraseña requeridos' },
                { status: 400 }
            );
        }

        // Buscar usuario en la base de datos
        console.log('[LOGIN] Buscando usuario:', email);
        const user = await prisma.user.findUnique({
            where: { email }
        });

        console.log('[LOGIN] Usuario encontrado:', user ? 'SÍ' : 'NO');
        if (!user) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        // Verificar contraseña
        console.log('[LOGIN] Verificando contraseña...');
        console.log('[LOGIN] Hash en DB:', user.password);
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('[LOGIN] Contraseña válida:', validPassword);

        if (!validPassword) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        // Crear sesión simple (en producción usar JWT firmado)
        const sessionData = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const response = NextResponse.json({
            success: true,
            user: {
                email: user.email,
                role: user.role
            }
        });

        // Guardar sesión en cookie (simple, en producción usar JWT)
        response.cookies.set('admin-session', JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 días
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}
