import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { dateConverter } from "../components/DateParser";

const EmployeeDetails = () => {

  const { id } = useParams()

  const [employees, setEmployees] = useState()
  const [contracts, setContract] = useState()
  const [errorMessage, setErrorMessage] = useState("");

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
      ).catch(() => {
        setErrorMessage("Unable to fetch data");
     });
      
    }
      fetchData()
    }, [])


  return (
    <div className={'app__container'}>

      {errorMessage && <div className="error">{errorMessage}</div>}
      {!employees && <Spinner />} 

      {employees && <div className="app__container__details">

      {employees.filter(employeeDetails => employeeDetails.id == id).map(filteredEmployee => {  
         const data = contracts.find(cont => cont.employeeId === filteredEmployee.id)
          return (
            <ul key={filteredEmployee.id} className="app__container__list">
              <li>Name: <span>{filteredEmployee.name}</span></li>
              <li>Position: <span>{filteredEmployee.position}</span></li>
              <li>Date of Birth: <span>{dateConverter(filteredEmployee.dateOfBirth)}</span></li>
              <li>Salary: <span>{data.salary}</span></li>
              <li>Currency: <span>{data.salaryCurrency}</span></li>
            </ul>  
          )
          })
        }
      <Link to="/" className="btn-back">Back to list</Link>
      </div> }
     
    </div>
)
}
export { EmployeeDetails };
