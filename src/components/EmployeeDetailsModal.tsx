import React from "react";
import { useAppSelector } from "../hooks";
import { fullName } from "../types/employee";

type Props = {
  id: string;
  onClose: () => void;
};

const EmployeeDetailsModal: React.FC<Props> = ({ id, onClose }) => {
  const employee = useAppSelector((s) =>
    s.employees.items.find((x) => x.id === id)
  );

  if (!employee) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ×
        </button>
        <h2>{fullName(employee)}</h2>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Status:</strong> {employee.status}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Hire Date:</strong> {employee.hireDate ?? "N/A"}</p>
        <p><strong>Notes:</strong> {employee.notes ?? ""}</p>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
