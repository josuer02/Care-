import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      select: { id: true, name: true, avatarUrl: true }
    })
    return NextResponse.json(doctors)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching doctors' }, { status: 500 })
  }
}
