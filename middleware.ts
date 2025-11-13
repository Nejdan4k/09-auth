import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('accessToken')?.value

  const authRoutes = ['/sign-in', '/sign-up']
  const privateRoutes = ['/profile', '/notes']

  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    const url = req.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url)
  }

  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    const url = req.nextUrl.clone()
    url.pathname = '/profile'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}
