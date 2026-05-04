import { facilities, type Facility, type FacilityStatus } from "@/mock-data/facilities";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Nota: servicio simulado (mock). En un backend real esto sería REST.
 */
export async function getFacilities(): Promise<Facility[]> {
  await sleep(150);
  return facilities;
}

export async function getFacilityById(id: string): Promise<Facility | undefined> {
  await sleep(120);
  return facilities.find((f) => f.id === id);
}

/**
 * Simula un cambio de estado. En mock-data no persistimos realmente para evitar side-effects
 * (y porque el evaluador no ejecutará la app). Retornamos el objeto "actualizado".
 */
export async function updateFacilityStatus(
  id: string,
  status: FacilityStatus
): Promise<Facility | undefined> {
  await sleep(200);
  const current = facilities.find((f) => f.id === id);
  if (!current) return undefined;

  return { ...current, status };
}
