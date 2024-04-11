import { authMiddleware } from "@clerk/nextjs";
import { clerkApi } from "@clerk/nextjs/edge-middlewarefiles";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/books/:id",
        "/api/webhook/clerk",
    ],
    ignoredRoutes: [
        "/api/webhook/clerk",
    ]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};