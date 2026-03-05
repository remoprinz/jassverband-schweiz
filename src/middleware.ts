import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const res = (response ?? NextResponse.next()) as NextResponse;
  res.headers.set('x-pathname', request.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
