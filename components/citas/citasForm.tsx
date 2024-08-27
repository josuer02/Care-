"use client";

import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";

export function AppointmentForm() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<string>("");
  const [otp, setOtp] = useState(["", "", "", "", "", "", "", ""]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Agendar Cita</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
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
              placeholder="Ingrese el nombre del paciente"
            />
          </div>

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
              placeholder="Ingrese el email del paciente"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefono del paciente
            </label>
            <div className="flex items-center">
              <span className="mr-2">+502</span>
              <Input
                type="number"
                id="phone"
                placeholder="Ingrese un numero de telefono"
                min="10000000"
                max="99999999"
                className="w-full"
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doctor1">Dr. Esteban</SelectItem>
                <SelectItem value="doctor2">Dr. Josue</SelectItem>
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
                  {date ? date.toDateString() : "Selecciona una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
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
                <div className="flex justify-between">
                  <Select
                    onValueChange={(value) =>
                      setTime(
                        (prev) => `${value}:${prev.split(":")[1] || "00"}`
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      setTime(
                        (prev) => `${prev.split(":")[0] || "00"}:${value}`
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Minuto" />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <Textarea
              id="notes"
              placeholder="Agregar notas sobre la consulta (max 1000 caracteres)"
              maxLength={1000}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
