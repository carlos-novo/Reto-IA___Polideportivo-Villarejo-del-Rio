export type FacilityStatus = "available" | "occupied" | "maintenance";

export type FacilityType = "court" | "fitness" | "pool";

export type Facility = {
  id: string;
  name: string;
  type: FacilityType;
  status: FacilityStatus;
};

export const facilities: Facility[] = [
  { id: "fac-001", name: "Pista Polideportiva 1", type: "court", status: "available" },
  { id: "fac-002", name: "Pista Polideportiva 2", type: "court", status: "occupied" },
  { id: "fac-003", name: "Pista Polideportiva 3", type: "court", status: "available" },
  { id: "fac-004", name: "Pista Polideportiva 4", type: "court", status: "maintenance" },
  { id: "fac-005", name: "Pista Polideportiva 5", type: "court", status: "available" },
  { id: "fac-006", name: "Pista Polideportiva 6", type: "court", status: "available" },

  { id: "fac-101", name: "Sala Fitness A", type: "fitness", status: "occupied" },
  { id: "fac-102", name: "Sala Fitness B", type: "fitness", status: "available" },

  { id: "fac-201", name: "Piscina Cubierta", type: "pool", status: "available" },
];
