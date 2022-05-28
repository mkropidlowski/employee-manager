import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const EmployeeDetails = () => {

  const { id } = useParams()

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


  return (
    <div className={'app__container'}>
   
      {!employees && <span>Loading data...</span> } 
    
      {employees && <div>

      {employees.filter(employeeDetails => employeeDetails.id == id).map(filteredEmployee => {
        
         const data = contracts.find(cont => cont.employeeId === filteredEmployee.id)
          return (
            <ul key={filteredEmployee.id}>
              <li>Name: {filteredEmployee.name}</li>
              <li>Position: {filteredEmployee.position}</li>
              <li>Date of Birth: {new Date(filteredEmployee.dateOfBirth).toLocaleDateString()}</li>
              <li>Salary: {data.salary}</li>
              <li>Currency: {data.salaryCurrency}</li>
            </ul>
            
          )
          })

        }

    
      </div> }
      <Link to="/">Back to list</Link>
    </div>
)
}
export { EmployeeDetails };
