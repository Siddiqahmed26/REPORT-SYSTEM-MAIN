// @ts-nocheck

import prisma from '@/lib/prisma';
import generateUniqueId from 'generate-unique-id';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (user) return NextResponse.json({ ok: false }, { status: 401 });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.users.create({
      data: {
        id: generateUniqueId(),
        email: email,
        name: name,
        password: hashedPassword,
        provider: 'credentials',
      },
    });
  } catch (error) {
    console.log('Error at register route ' + error);
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
