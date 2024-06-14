import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-up',
  },
});

export const config = {
  matcher: ['/dashboard', '/history'],
};
