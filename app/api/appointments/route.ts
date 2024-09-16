import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Primero, busca si el paciente ya existe
    let patient = await prisma.patient.findFirst({
      where: { email: body.patientEmail },
    })

    let isFirstVisit = false;

    if (!patient) {
      // Si el paciente no existe, créalo
      patient = await prisma.patient.create({
        data: {
          name: body.patientName,
          email: body.patientEmail,
          phone: body.patientPhone,
        },
      })
      isFirstVisit = true;
    }

    // Ahora crea la cita usando el paciente existente o recién creado
    const appointment = await prisma.appointment.create({
      data: {
        patient: {
          connect: { id: patient.id },
        },
        doctor: {
          connect: { id: body.doctorId },
        },
        date: new Date(body.date),
        time: body.time,
        notes: body.notes,
        isFirstVisit: isFirstVisit,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Error creating appointment' }, { status: 500 })
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const doctorId = searchParams.get('doctorId');

  if (date && doctorId) {
    try {
      // Convertir la fecha seleccionada al inicio y fin del día en UTC
      const startDate = new Date(date);
      const endDate = new Date(date);
      startDate.setUTCHours(0, 0, 0, 0);  // Inicio del día en UTC
      endDate.setUTCHours(23, 59, 59, 999);  // Fin del día en UTC

      const appointments = await prisma.appointment.findMany({
        where: {
          doctorId: parseInt(doctorId),
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          time: true,
        },
      });

      const occupiedTimes = appointments.map((apt) => apt.time);
      return NextResponse.json(occupiedTimes);
    } catch (error) {
      console.error('Error fetching appointments by date and doctorId:', error);
      return NextResponse.json(
        { error: 'Error fetching appointments by date and doctorId' },
        { status: 500 }
      );
    }
  } else {
    try {
      const appointments = await prisma.appointment.findMany({
        include: {
          patient: true,
          doctor: true,
        },
      });
      return NextResponse.json(appointments);
    } catch (error) {
      console.error('Error fetching all appointments:', error);
      return NextResponse.json(
        { error: 'Error fetching all appointments' },
        { status: 500 }
      );
    }
  }
}
