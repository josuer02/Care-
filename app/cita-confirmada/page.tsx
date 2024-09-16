"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function AppointmentSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Aquí deberías obtener los datos de la cita del estado global o de localStorage
    const data = JSON.parse(localStorage.getItem("appointmentData") || "{}");
    setAppointmentData(data);
  }, []);

  if (!mounted || !appointmentData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-green-500 text-white rounded-t-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cita Confirmada!
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="mt-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-center text-gray-600 mb-6">
              Tu cita ha sido programada exitosamente. ¡Esperamos verte pronto!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-green-500" />
              <span>{appointmentData.patientName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-5 h-5 relative">
                <Image
                  src={appointmentData.doctorAvatar || "/default-avatar.png"}
                  alt={appointmentData.doctorName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <span>Dr. {appointmentData.doctorName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-green-500" />
              <span>{new Date(appointmentData.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-green-500" />
              <span>{appointmentData.time}</span>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/citas" passHref>
              <Button variant="outline">Agendar otra cita</Button>
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
}
