import type { Employee } from "../types/employee";

export async function fetchEmployees(): Promise<Employee[]> {
  // Try fetching from hosted mock (public/employees.json)
  const res = await fetch("/employees.json");
  if (!res.ok) {
    throw new Error("Failed to load employees");
  }
  const data = (await res.json()) as Employee[];
  return data;
}
