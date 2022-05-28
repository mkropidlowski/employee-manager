import React, { useState, useEffect } from "react";
import axios from 'axios';
// import { Employees } from "../pages/Employees";
import { useNavigate } from "react-router-dom";

const Table = () => {

  
  const navigate = useNavigate()
  const [employees, setEmployees] = useState()
  const [contracts, setContract] = useState()

  useEffect(() => {

  const fetchData = async () => {

  const employeeUrl = 'http://localhost:8080/employees'
  const contractUrl = 'http://localhost:8080/contracts'

  const getEmployeeUrl = await axios.get(employeeUrl)
  const getContractsUrl = await axios.get(contractUrl)

    axios.all([getEmployeeUrl, getContractsUrl]).then(
      axios.spread((...allData) => {
        setEmployees(allData[0].data)
        setContract(allData[1].data)

      })
    )
    
  }
    fetchData()
  }, [])

// navigate to employeeDetails
  function handleClick(e) {
    const userID = e.target.parentElement.getAttribute("data-id")
    navigate(`/employeeDetails/${userID}`);
  }

  return (
    <>
    {!employees && <span>Loading data...</span> } 
    
      <table className="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Position</td>
          <td>Date</td>
          <td>Salary</td>
          <td>Contract</td>
        </tr>
      </thead>

      {employees && <tbody>
      {employees.map(employeesList => {
      const data = contracts.find(cont => cont.employeeId === employeesList.id)
     
      return (
        <tr onClick={handleClick} key={employeesList.id} data-id={employeesList.id}>
          <td>{employeesList.name}</td>
          <td>{employeesList.position}</td>
          <td>{new Date(employeesList.dateOfBirth).toLocaleDateString()}</td>
          <td>{data.salary}</td>
          <td>{new Date(data.contractValidUntil).toLocaleDateString()}</td>
        </tr>
      )
 
      })}
      </tbody>
      }    
    </table>
    
    </>
  )
}

export { Table };
