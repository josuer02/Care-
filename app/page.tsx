"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Phone, Video } from "lucide-react";

const features = [
  { icon: <Calendar className="h-6 w-6" />, title: "Schedule Appointments" },
  { icon: <MessageCircle className="h-6 w-6" />, title: "Chat with Doctors" },
  { icon: <Video className="h-6 w-6" />, title: "Video Consultations" },
  { icon: <Phone className="h-6 w-6" />, title: "24/7 Support" },
];

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "/avatar1.jpg",
    text: "Care+ has been a lifesaver! Quick and easy consultations from home.",
  },
  {
    name: "John D.",
    avatar: "/avatar2.jpg",
    text: "The doctors are knowledgeable and caring. Highly recommend!",
  },
];

export default function Home() {
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Welcome to Care+
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your personal virtual doctor assistant
          </p>
          <Button size="lg" className="rounded-full text-lg px-8 py-4">
            Get Started
          </Button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-blue-900 mb-8 text-center">
            Our Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold">{feature.title}</h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-blue-900 mb-8 text-center">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="flex items-start space-x-4 pt-6">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="mb-2">{testimonial.name}</CardTitle>
                    <p className="text-gray-600">{testimonial.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied users and take control of your health
            today!
          </p>
          <Button size="lg" className="rounded-full text-lg px-8 py-4">
            Sign Up Now
          </Button>
        </motion.section>
      </main>

      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2024 Care+. All rights reserved.</p>
          <div className="flex space-x-4">
            <Badge variant="secondary">Privacy Policy</Badge>
            <Badge variant="secondary">Terms of Service</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
