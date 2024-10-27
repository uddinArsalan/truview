import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - about (about page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - "/" (homepage)
     */                                           
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!^/$).*)'  // Explicitly exclude the homepage "/"
  ],
};

export default withMiddlewareAuthRequired();
