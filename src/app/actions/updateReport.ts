// @ts-nocheck
'use server';

import prisma from '@/lib/prisma';
import uniqId from 'generate-unique-id';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function updateReport(id: string) {
  try {
    await prisma.reports.update({
      where: {
        id: id,
      },
      data: {
        status: 'cleared',
      },
    });
    revalidatePath('/dashboard');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
