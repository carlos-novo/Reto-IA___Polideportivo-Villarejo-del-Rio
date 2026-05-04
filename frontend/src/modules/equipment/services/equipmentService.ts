import { equipment as equipmentSeed, type EquipmentItem } from "@/mock-data/equipment";
import { equipmentLoans as loansSeed, type EquipmentLoan } from "@/mock-data/equipmentLoans";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

let equipmentState: EquipmentItem[] = [...equipmentSeed];
let loansState: EquipmentLoan[] = [...loansSeed];

export async function getEquipmentInventory(): Promise<EquipmentItem[]> {
  await sleep(150);
  return [...equipmentState].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getEquipmentLoans(): Promise<EquipmentLoan[]> {
  await sleep(150);
  // activos y vencidos primero
  const weight = (s: EquipmentLoan["status"]) =>
    s === "overdue" ? 0 : s === "active" ? 1 : 2;
  return [...loansState].sort((a, b) => weight(a.status) - weight(b.status));
}

export async function markEquipmentDamaged(equipmentId: string): Promise<EquipmentItem | undefined> {
  await sleep(200);
  const idx = equipmentState.findIndex((e) => e.id === equipmentId);
  if (idx === -1) return undefined;

  const updated: EquipmentItem = { ...equipmentState[idx], condition: "damaged" };
  equipmentState = [
    ...equipmentState.slice(0, idx),
    updated,
    ...equipmentState.slice(idx + 1),
  ];
  return updated;
}

export async function closeLoan(loanId: string): Promise<EquipmentLoan | undefined> {
  await sleep(200);
  const idx = loansState.findIndex((l) => l.id === loanId);
  if (idx === -1) return undefined;

  const updated: EquipmentLoan = { ...loansState[idx], status: "returned" };
  loansState = [...loansState.slice(0, idx), updated, ...loansState.slice(idx + 1)];
  return updated;
}
