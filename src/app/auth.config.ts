import { NextAuthConfig } from 'next-auth';

const protectedRoutes = ['/dashboard', '/tickets', '/users', '/protected'];

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [
        // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
        // while this file is also used in non-Node.js environments
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));

            if (isOnProtectedRoute) {
                return isLoggedIn;
                 // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
} satisfies NextAuthConfig;