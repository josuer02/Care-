import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    let patient = await prisma.patient.findFirst({
      where: { email: body.patientEmail },
    })

    let isFirstVisit = false;

    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          name: body.patientName,
          email: body.patientEmail,
          phone: body.patientPhone,
        },
      })
      isFirstVisit = true;
    }

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
      const startDate = new Date(date);
      const endDate = new Date(date);
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);

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

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
  }

  try {
    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json({ error: 'Error cancelling appointment' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        date: new Date(body.date),
        time: body.time,
        doctor: {
          connect: { id: body.doctorId },
        },
        notes: body.notes,
      },
    });
    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Error updating appointment' }, { status: 500 });
  }
}
