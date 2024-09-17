"use client";

import { useState, useEffect, useMemo } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointment";
import { toast } from "react-toastify";
import { AppointmentForm } from "@/components/citas/citasForm";

export default function CitasCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "month">("week");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showOnlyFirstVisits, setShowOnlyFirstVisits] = useState(false);

  useEffect(() => {
    fetch("/api/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const calendarDays = useMemo(() => {
    const start =
      view === "week"
        ? startOfWeek(currentDate, { weekStartsOn: 1 })
        : startOfWeek(currentDate, { weekStartsOn: 1 });
    const end =
      view === "week"
        ? endOfWeek(currentDate, { weekStartsOn: 1 })
        : addDays(start, 34); // Show 5 weeks for month view
    return eachDayOfInterval({ start, end });
  }, [currentDate, view]);

  const navigateCalendar = (direction: "prev" | "next") => {
    const days = view === "week" ? 7 : 30;
    setCurrentDate((prevDate) =>
      addDays(prevDate, direction === "prev" ? -days : days)
    );
  };

  const getAppointmentColor = (index: number) => {
    const colors = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-red-200",
      "bg-purple-200",
    ];
    return colors[index % colors.length];
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
        toast.success("Cita cancelada exitosamente");
      } else {
        const errorData = await response.json();
        console.error("Error canceling appointment:", errorData);
        toast.error("Error al cancelar la cita");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error("Error al cancelar la cita");
    }
  };

  const [appointmentToReschedule, setAppointmentToReschedule] =
    useState<Appointment | null>(null);

  const handleRescheduleAppointment = (appointment: Appointment) => {
    if (appointment.doctor && appointment.patient) {
      setAppointmentToReschedule(appointment);
    } else {
      console.error("Appointment data is incomplete", appointment);
      toast.error(
        "No se puede reprogramar esta cita porque falta informaci n del doctor o paciente"
      );
    }
  };

  // Agrega esto al final del componente, justo antes del cierre del div principal

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Calendario de Citas</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOnlyFirstVisits(!showOnlyFirstVisits)}
          >
            {showOnlyFirstVisits
              ? "Mostrar todas las citas"
              : "Mostrar solo primeras visitas"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView("week")}>
            Semana
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView("month")}>
            Mes
          </Button>
        </div>
      </div>
      <Card className="mb-4">
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateCalendar("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {format(
                currentDate,
                view === "week"
                  ? "'Semana del' d 'de' MMMM, yyyy"
                  : "MMMM yyyy",
                { locale: es }
              )}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateCalendar("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
              <div
                key={day}
                className="bg-primary-foreground p-2 text-center font-medium"
              >
                {day}
              </div>
            ))}
            {calendarDays.map((day) => {
              const dayAppointments = appointments
                .filter((apt) => isSameDay(parseISO(apt.date), day))
                .filter((apt) => !showOnlyFirstVisits || apt.isFirstVisit)
                .sort((a, b) => a.time.localeCompare(b.time));
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "bg-white p-2 min-h-[120px] min-w-[120px]",
                    !isSameMonth(day, currentDate) && "text-gray-400 bg-gray-50"
                  )}
                >
                  <div className="font-semibold mb-1">{format(day, "d")}</div>
                  <div className="space-y-1">
                    {dayAppointments.map((apt, index) => (
                      <Popover key={apt.id}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              getAppointmentColor(index)
                            )}
                          >
                            <span className="truncate">
                              {index + 1}. {apt.time}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                {apt.patient?.name || "Paciente"}{" "}
                                {apt.isFirstVisit && "(Primera visita)"}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {format(parseISO(apt.date), "dd MMMM yyyy", {
                                  locale: es,
                                })}{" "}
                                - {apt.time}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Dr. {apt.doctor?.name || "No asignado"}
                              </span>
                            </div>
                            {apt.notes && (
                              <div className="text-sm text-muted-foreground">
                                {apt.notes}
                              </div>
                            )}
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRescheduleAppointment(apt)}
                              >
                                Reagendar
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelAppointment(apt.id)}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {appointmentToReschedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <AppointmentForm
              initialData={appointmentToReschedule}
              onClose={() => setAppointmentToReschedule(null)}
              onReschedule={(updatedAppointment) => {
                setAppointments((prevAppointments) =>
                  prevAppointments.map((apt) =>
                    apt.id === updatedAppointment.id
                      ? {
                          ...apt,
                          ...updatedAppointment,
                          doctor: updatedAppointment.doctor || apt.doctor,
                          patient: updatedAppointment.patient || apt.patient,
                        }
                      : apt
                  )
                );
                setAppointmentToReschedule(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
