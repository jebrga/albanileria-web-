import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('admin-session');

        if (!sessionCookie) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const session = JSON.parse(sessionCookie.value);

        return NextResponse.json({
            authenticated: true,
            user: {
                email: session.email,
                role: session.role
            }
        });

    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
