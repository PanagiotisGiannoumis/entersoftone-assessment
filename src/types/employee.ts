export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  status: string;
  hireDate?: string;
  notes?: string;
};

export const fullName = (e: Employee) => `${e.firstName} ${e.lastName}`;
