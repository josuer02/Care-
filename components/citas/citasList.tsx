import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AppointmentList() {
  // This is just example data. You'll need to fetch real data from your backend.
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "2024-08-28",
      time: "10:00",
    },
    {
      id: 2,
      patient: "Jane Doe",
      doctor: "Dr. Johnson",
      date: "2024-08-29",
      time: "14:30",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.patient}</TableCell>
            <TableCell>{appointment.doctor}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
