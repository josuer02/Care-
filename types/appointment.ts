export interface Appointment {
  id: number;
  patient: {
    name: string;
    email: string;
    phone: string;
  };
  doctor: {
    id: number;
    name: string;
  } | null; // Permite que doctor sea null si no está asignado
  date: string;
  time: string;
  notes?: string;
  isFirstVisit: boolean;
}
