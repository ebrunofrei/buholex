// No ejecutar el middleware en /api, /_next ni archivos estáticos
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
