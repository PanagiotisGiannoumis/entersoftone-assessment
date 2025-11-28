import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setSearch,
  setDepartmentFilter,
  selectEmployee,
} from "../store/employeesSlice";
import EmployeeDetailsModal from "./EmployeeDetailsModal.tsx";
import { fullName } from "../types/employee";

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, search, departmentFilter, selectedEmployeeId } =
    useAppSelector((s) => s.employees);

  // gather unique departments
  const departments = useMemo(
    () => Array.from(new Set(items.map((i) => i.department))).sort(),
    [items]
  );

  const filtered = items.filter((e) => {
    const q = search.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      e.firstName.toLowerCase().includes(q) ||
      e.lastName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q);
    const matchesDept = departmentFilter === "" || e.department === departmentFilter;
    return matchesQuery && matchesDept;
  });

  return (
    <div className="employees-wrapper">
      <div className="controls">
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <select
          value={departmentFilter}
          onChange={(e) => dispatch(setDepartmentFilter(e.target.value))}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      <table className="employees-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr
              key={e.id}
              onClick={() => dispatch(selectEmployee(e.id))}
              className={selectedEmployeeId === e.id ? "selected" : ""}
            >
              <td>{fullName(e)}</td>
              <td>{e.department}</td>
              <td>{e.email}</td>
              <td>{e.status}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedEmployeeId && (
        <EmployeeDetailsModal
          id={selectedEmployeeId}
          onClose={() => dispatch(selectEmployee(undefined))}
        />
      )}
    </div>
  );
};

export default EmployeeList;
