import { reservations as seed } from "@/mock-data/reservations";
import type { Reservation, ReservationStatus } from "@/shared/types/reservations";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Estado en memoria (simula backend). No persiste entre recargas.
 * Prioridad: experiencia visual para capturas.
 */
let reservationsState: Reservation[] = [...seed];

export type CreateReservationInput = {
  userName: string;
  facilityId: string;
  facilityName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
};

export type CreateReservationResult =
  | { ok: true; reservation: Reservation }
  | { ok: false; error: "OVERLAP" | "VALIDATION"; message: string };

export async function getReservations(): Promise<Reservation[]> {
  await sleep(150);
  // más recientes primero
  return [...reservationsState].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createReservation(
  input: CreateReservationInput
): Promise<CreateReservationResult> {
  await sleep(250);

  if (!input.userName || !input.facilityId || !input.date || !input.startTime || !input.endTime) {
    return {
      ok: false,
      error: "VALIDATION",
      message: "Completa los campos requeridos.",
    };
  }

  const overlap = reservationsState.some(
    (r) =>
      r.status !== "cancelled" &&
      r.facilityId === input.facilityId &&
      r.date === input.date &&
      r.startTime === input.startTime
  );

  if (overlap) {
    return {
      ok: false,
      error: "OVERLAP",
      message:
        "Solapamiento detectado: ya existe una reserva en la misma instalación, fecha y hora de inicio.",
    };
  }

  const newReservation: Reservation = {
    id: `res-${Math.floor(2000 + Math.random() * 8000)}`,
    userName: input.userName.trim(),
    facilityId: input.facilityId,
    facilityName: input.facilityName,
    date: input.date,
    startTime: input.startTime,
    endTime: input.endTime,
    status: "active",
    createdAt: new Date().toISOString(),
  };

  reservationsState = [newReservation, ...reservationsState];

  return { ok: true, reservation: newReservation };
}

export async function cancelReservation(id: string): Promise<Reservation | undefined> {
  await sleep(200);

  const idx = reservationsState.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;

  const current = reservationsState[idx];
  const updated: Reservation = { ...current, status: "cancelled" as ReservationStatus };
  reservationsState = [
    ...reservationsState.slice(0, idx),
    updated,
    ...reservationsState.slice(idx + 1),
  ];

  return updated;
}
