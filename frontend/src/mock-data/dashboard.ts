export type DashboardKpis = {
  activeReservations: number;
  occupancyRate: number; // 0..1
  mostUsedFacility: string;
  equipmentOnLoan: number;
};

export const dashboardKpis: DashboardKpis = {
  activeReservations: 28,
  occupancyRate: 0.74,
  mostUsedFacility: "Pista Polideportiva 3",
  equipmentOnLoan: 9,
};

export type FacilityUsage = {
  facilityName: string;
  reservationsThisWeek: number;
};

export const facilityUsage: FacilityUsage[] = [
  { facilityName: "Pista Polideportiva 1", reservationsThisWeek: 18 },
  { facilityName: "Pista Polideportiva 2", reservationsThisWeek: 22 },
  { facilityName: "Pista Polideportiva 3", reservationsThisWeek: 27 },
  { facilityName: "Pista Polideportiva 4", reservationsThisWeek: 16 },
  { facilityName: "Sala Fitness A", reservationsThisWeek: 21 },
  { facilityName: "Sala Fitness B", reservationsThisWeek: 14 },
  { facilityName: "Piscina Cubierta", reservationsThisWeek: 19 },
];
