"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { format } from "date-fns";

export function AppointmentForm() {
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<
    { id: number; name: string; avatarUrl?: string }[]
  >([]);
  const [isNewPatient, setIsNewPatient] = useState<boolean>(true);
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    if (patientEmail) {
      fetch(`/api/patients?email=${patientEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            setIsNewPatient(false);
            setPatientName(data.name);
            setPatientPhone(data.phone);
          } else {
            setIsNewPatient(true);
          }
        })
        .catch((error) => console.error("Error checking patient:", error));
    }
  }, [patientEmail]);

  useEffect(() => {
    if (date && doctor) {
      const formattedDate = format(date, "yyyy-MM-dd");
      console.log(
        `Fetching appointments for date: ${formattedDate} and doctor: ${doctor}`
      );
      fetch(`/api/appointments?date=${formattedDate}&doctorId=${doctor}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Received occupied times:", data);
          setOccupiedTimes(data);
        })
        .catch((error) =>
          console.error("Error fetching existing appointments:", error)
        );
    } else {
      setOccupiedTimes([]);
    }
  }, [date, doctor]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{8}$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !doctor ||
      !date ||
      !time
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (!emailRegex.test(patientEmail)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    if (!phoneRegex.test(patientPhone)) {
      setError("El número de teléfono debe tener 8 dígitos.");
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          patientEmail,
          patientPhone,
          doctorId: parseInt(doctor),
          date: date?.toISOString(),
          time,
          notes,
          isNewPatient,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cita");
      }

      const appointmentData = await response.json();

      localStorage.setItem(
        "appointmentData",
        JSON.stringify({
          patientName,
          doctorName: doctors.find((d) => d.id.toString() === doctor)?.name,
          doctorAvatar: doctors.find((d) => d.id.toString() === doctor)
            ?.avatarUrl,
          date: date?.toISOString(),
          time,
        })
      );

      router.push("/cita-confirmada");
    } catch (err) {
      setError(
        "Hubo un error al crear la cita. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Agendar Cita</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email del paciente
            </label>
            <Input
              type="email"
              id="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              placeholder="Ingrese el email del paciente"
              className={
                !emailRegex.test(patientEmail)
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }
            />
          </div>

          <div>
            <label
              htmlFor="patient"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del paciente
            </label>
            <Input
              type="text"
              id="patient"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Ingrese el nombre del paciente"
              disabled={!isNewPatient}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono del paciente
            </label>
            <div className="flex items-center">
              <span className="mr-2">+502</span>
              <Input
                type="tel"
                id="phone"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="Ingrese un número de teléfono"
                className="w-full"
                disabled={!isNewPatient}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="doctor"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor
            </label>
            <Select onValueChange={setDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id.toString()}>
                    {`Dr. ${doc.name}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {date
                    ? format(date, "PPP", { locale: es })
                    : "Selecciona una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={(selectedDate: Date | undefined) =>
                    setDate(selectedDate || null)
                  }
                  initialFocus
                  className="w-full"
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Hora
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time || "Seleccione una hora"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "08:00",
                    "08:30",
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "11:00",
                    "11:30",
                    "12:00",
                    "12:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                  ].map((t) => (
                    <Button
                      key={t}
                      onClick={() => setTime(t)}
                      disabled={occupiedTimes.includes(t)}
                      variant={time === t ? "default" : "outline"}
                      size="sm"
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notas
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Agregar notas sobre la consulta (max 1000 caracteres)"
              maxLength={1000}
            />
          </div>

          <Button type="submit" className="w-full">
            Crear Cita
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
