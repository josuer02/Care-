// app/api/patients/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const patient = await prisma.patient.findFirst({
        where: { email },
        select: { name: true, phone: true }
      })

    if (patient) {
      return NextResponse.json({ exists: true, ...patient })
    } else {
      return NextResponse.json({ exists: false })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error checking patient' }, { status: 500 })
  }
}
