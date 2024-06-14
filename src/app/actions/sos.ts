// @ts-nocheck
'use server';

import prisma from '@/lib/prisma';
import uniqId from 'generate-unique-id';
import { getServerSession } from 'next-auth';

export async function sos(coordinates: any) {
  try {
    const id = uniqId();
    const session = await getServerSession();
    const user = session?.user;
    await prisma.reports.create({
      data: {
        id: id,
        username: user?.name || '',
        description: '',
        category: 'SOS',
        coordinates: coordinates,
        status: 'cleared',
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
