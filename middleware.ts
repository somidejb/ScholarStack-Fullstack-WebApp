import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: [
        '/',
        '/books/:id',
        '/api/webhook/(.*)',
    ],
    ignoredRoutes: [
        '/api/webhook/(.*)',
    ]
});
 
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};