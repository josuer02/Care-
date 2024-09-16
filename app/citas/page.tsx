import { AppointmentForm } from "@/components/citas/citasForm";
import AppointmentList from "@/components/citas/citasList";
import React from "react";

export default function CitasPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <AppointmentForm />
        </div>
        <div>
          {/* <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2> */}
          {<AppointmentList />}
        </div>
      </div>
    </div>
  );
}
