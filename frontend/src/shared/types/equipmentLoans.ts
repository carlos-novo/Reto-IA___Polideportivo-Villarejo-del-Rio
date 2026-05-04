export type EquipmentLoanStatus = "active" | "returned" | "overdue";

export type EquipmentLoan = {
  id: string;
  equipmentId: string;
  equipmentName: string;
  borrowerName: string;
  loanDate: string; // YYYY-MM-DD
  expectedReturnDate: string; // YYYY-MM-DD
  status: EquipmentLoanStatus;
};
