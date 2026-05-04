export type FacilityStatus = "available" | "occupied" | "maintenance";
export type FacilityType = "court" | "fitness" | "pool";

export type Facility = {
  id: string;
  name: string;
  type: FacilityType;
  status: FacilityStatus;
};
