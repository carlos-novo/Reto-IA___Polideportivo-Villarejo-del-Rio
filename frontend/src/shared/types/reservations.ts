export type ReservationStatus = "active" | "pending" | "cancelled";

export type Reservation = {
  id: string;
  userName: string;
  facilityId: string;
  facilityName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: ReservationStatus;
  createdAt: string; // ISO
};
