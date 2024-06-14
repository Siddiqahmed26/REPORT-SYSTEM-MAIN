import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    let results = await prisma.reports.findMany({
      select: {
        id: false,
        username: false,
        description: true,
        category: true,
        coordinates: true,
        status: false,
      },
      where: {
        OR: [
          { status: 'cleared' }, // Include records where status is 'cleared'
          { category: 'SOS' }, // Include records where category is 'SOS'
        ],
      },
    });
    revalidatePath('/dashboard');
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log('Error at Coordinates route ' + error);
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
