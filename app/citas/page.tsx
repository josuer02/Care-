import React from "react";
import { AppointmentForm } from "@/components/citas/citasForm";
import AppointmentList from "@/components/citas/citasList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ListIcon } from "lucide-react";

export default function CitasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
          Gestión de Citas
        </h1>
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-blue-100 rounded-t-lg">
            <CardTitle className="text-2xl text-blue-900">
              Centro de Citas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="form"
                  className="flex items-center justify-center"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Agendar Cita
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="flex items-center justify-center"
                >
                  <ListIcon className="w-5 h-5 mr-2" />
                  Lista de Citas
                </TabsTrigger>
              </TabsList>
              <TabsContent value="form">
                <div className="bg-white rounded-lg shadow-inner p-4">
                  <AppointmentForm />
                </div>
              </TabsContent>
              <TabsContent value="list">
                <div className="bg-white rounded-lg shadow-inner p-4">
                  <AppointmentList />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
