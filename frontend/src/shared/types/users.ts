export type UserRole = "admin" | "receptionist" | "coach";
export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  email: string;
  phone: string;
  createdAt: string; // ISO
};
