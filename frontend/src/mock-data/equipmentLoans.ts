import type { EquipmentLoan } from "@/shared/types/equipmentLoans";

export const equipmentLoans: EquipmentLoan[] = [
  {
    id: "loan-2001",
    equipmentId: "eq-001",
    equipmentName: "Raquetas de pádel (adulto)",
    borrowerName: "Club Pádel Villarejo",
    loanDate: "2026-05-03",
    expectedReturnDate: "2026-05-05",
    status: "active",
  },
  {
    id: "loan-2002",
    equipmentId: "eq-011",
    equipmentName: "Balones baloncesto",
    borrowerName: "AMPA Villarejo",
    loanDate: "2026-05-02",
    expectedReturnDate: "2026-05-04",
    status: "overdue",
  },
  {
    id: "loan-2003",
    equipmentId: "eq-020",
    equipmentName: "Redes voleibol",
    borrowerName: "Club Voleibol Villarejo",
    loanDate: "2026-05-04",
    expectedReturnDate: "2026-05-06",
    status: "active",
  },
  {
    id: "loan-2004",
    equipmentId: "eq-040",
    equipmentName: "Chalecos entrenamiento (pack)",
    borrowerName: "Monitor: Sergio Díaz",
    loanDate: "2026-05-01",
    expectedReturnDate: "2026-05-04",
    status: "returned",
  },
  {
    id: "loan-2005",
    equipmentId: "eq-030",
    equipmentName: "Conos entrenamiento (pack)",
    borrowerName: "Grupo Entrenamiento Municipal",
    loanDate: "2026-05-04",
    expectedReturnDate: "2026-05-04",
    status: "active",
  },
];
