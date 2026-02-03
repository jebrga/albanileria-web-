import { NextResponse } from 'next/server';

export async function POST(request) {
    const response = NextResponse.json({ success: true });

    // Eliminar cookie de sesión
    response.cookies.delete('admin-session');

    return response;
}

export async function GET(request) {
    const response = NextResponse.json({ success: true });

    // Eliminar cookie de sesión
    response.cookies.delete('admin-session');

    return response;
}
