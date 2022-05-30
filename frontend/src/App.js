import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Table } from "./components/Table"
import { EmployeeDetails } from "./pages/EmployeeDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table/>} />
        <Route path="/employeeDetails/:id" element={<EmployeeDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export {App};
