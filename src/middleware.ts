import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

const isPublicPage = createRouteMatcher(['/auth']);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
    if (!isPublicPage(request) && !convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, '/auth');
    }
    /* TODO: redirect user away from "/auth" if authenticated */
    if (isPublicPage(request) && convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, '/');
    }
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
