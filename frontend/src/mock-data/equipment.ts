export type EquipmentCondition = "good" | "worn" | "damaged";

export type EquipmentItem = {
  id: string;
  name: string;
  category: "rackets" | "balls" | "nets" | "cones" | "vests" | "other";
  quantityTotal: number;
  quantityAvailable: number;
  condition: EquipmentCondition;
};

export const equipment: EquipmentItem[] = [
  {
    id: "eq-001",
    name: "Raquetas de pádel (adulto)",
    category: "rackets",
    quantityTotal: 18,
    quantityAvailable: 12,
    condition: "good",
  },
  {
    id: "eq-002",
    name: "Raquetas infantiles",
    category: "rackets",
    quantityTotal: 10,
    quantityAvailable: 6,
    condition: "worn",
  },
  {
    id: "eq-010",
    name: "Balones fútbol sala",
    category: "balls",
    quantityTotal: 24,
    quantityAvailable: 16,
    condition: "good",
  },
  {
    id: "eq-011",
    name: "Balones baloncesto",
    category: "balls",
    quantityTotal: 20,
    quantityAvailable: 13,
    condition: "worn",
  },
  {
    id: "eq-020",
    name: "Redes voleibol",
    category: "nets",
    quantityTotal: 6,
    quantityAvailable: 4,
    condition: "good",
  },
  {
    id: "eq-030",
    name: "Conos entrenamiento (pack)",
    category: "cones",
    quantityTotal: 30,
    quantityAvailable: 22,
    condition: "good",
  },
  {
    id: "eq-040",
    name: "Chalecos entrenamiento (pack)",
    category: "vests",
    quantityTotal: 40,
    quantityAvailable: 28,
    condition: "worn",
  },
  {
    id: "eq-050",
    name: "Cronómetros",
    category: "other",
    quantityTotal: 8,
    quantityAvailable: 7,
    condition: "good",
  },
  {
    id: "eq-051",
    name: "Colchonetas fitness",
    category: "other",
    quantityTotal: 25,
    quantityAvailable: 19,
    condition: "damaged",
  },
];
