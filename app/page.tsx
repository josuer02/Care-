"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Video, Activity, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Emily Chen",
    specialty: "Cardiologist",
    date: "2023-09-20",
    time: "10:00 AM",
  },
  {
    id: 2,
    doctor: "Dr. Michael Lee",
    specialty: "Dermatologist",
    date: "2023-09-25",
    time: "2:30 PM",
  },
];

const healthMetrics = [
  { name: "Blood Pressure", value: "120/80", status: "normal" },
  { name: "Heart Rate", value: "72 bpm", status: "normal" },
  { name: "Blood Sugar", value: "95 mg/dL", status: "normal" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-blue-900"
          >
            Care+
          </motion.h1>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/avatar-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Welcome back,
          </h2>
          <p className="text-xl text-gray-600">
            Here's your health summary for today.
          </p>
        </motion.section>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="mb-4 last:mb-0">
                    <p className="font-semibold">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                  </div>
                ))}
                <Button className="w-full mt-4">Schedule New Appointment</Button>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2" />
                  Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{metric.name}</span>
                      <Badge variant={metric.status === "normal" ? "success" : "destructive"}>
                        {metric.status}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold mb-1">{metric.value}</p>
                    <Progress value={75} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold text-blue-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <MessageCircle className="h-8 w-8 mb-2" />
              <span>Chat with a Doctor</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <Video className="h-8 w-8 mb-2" />
              <span>Start Video Consultation</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <Activity className="h-8 w-8 mb-2" />
              <span>View Health Records</span>
            </Button>
          </div>
        </motion.section> */}
      </main>

      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2024 Care+. All rights reserved.</p>
          <div className="flex space-x-4">
            <Badge variant="secondary" className="cursor-pointer">
              Help
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Settings
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
