
import { NextRequest, NextResponse } from 'next/server';

const PRIVATE_PREFIXES = ['/profile', '/notes'];
const PUBLIC_EXACT = ['/sign-in', '/sign-up'];

function isPrivate(pathname: string) {
  return PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isPublic(pathname: string) {
  return PUBLIC_EXACT.includes(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value ?? null;

  
  if (!accessToken && isPrivate(pathname)) {
    const url = new URL('/sign-in', request.url);
    return NextResponse.redirect(url);
  }

 
  if (accessToken && isPublic(pathname)) {
    const url = new URL('/profile', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};


