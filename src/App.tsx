import React, { useEffect } from "react";
import EmployeeList from "./components/EmployeeList.tsx";
import { useAppDispatch } from "./hooks.ts";
import { loadEmployees } from "./store/employeesSlice";
import "./styles/employees.scss";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1>Employees</h1>
      <EmployeeList />
    </div>
  );
};

export default App;
