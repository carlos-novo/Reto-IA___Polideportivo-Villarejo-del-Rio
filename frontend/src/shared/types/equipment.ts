export type EquipmentCondition = "good" | "worn" | "damaged";

export type EquipmentCategory =
  | "rackets"
  | "balls"
  | "nets"
  | "cones"
  | "vests"
  | "other";

export type EquipmentItem = {
  id: string;
  name: string;
  category: EquipmentCategory;
  quantityTotal: number;
  quantityAvailable: number;
  condition: EquipmentCondition;
};
