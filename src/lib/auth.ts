// @ts-nocheck

import { NextAuthOptions, User, getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';

import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await prisma.users.findFirst({
          where: { email: credentials.email },
        });

        if (dbUser?.provider === 'google') {
          return null;
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          dbUser?.password || ''
        );

        if (dbUser && validPassword) {
          const { password, ...dbUserWithoutPassword } = dbUser;
          return dbUserWithoutPassword as User;
        }

        return null;
      },
    }),
  ],
};
