import { dashboardKpis, facilityUsage } from "@/mock-data/dashboard";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getDashboardKpis() {
  await sleep(150);
  return dashboardKpis;
}

export async function getFacilityUsage() {
  await sleep(150);
  return facilityUsage;
}
