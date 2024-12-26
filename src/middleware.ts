import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('user_token');

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/sign_in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*']
};
