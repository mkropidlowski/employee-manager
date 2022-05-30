import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Employees } from "../pages/Employees";
import { Pagination } from "../components/Pagination";
import Spinner from "./Spinner";

const Table = () => {

  // records state
  const [employees, setEmployees] = useState([])
  const [contracts, setContract] = useState([])

  // spinnner/error state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // paginaton state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); 
   // pagination stuff
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentData = employees.slice(indexOfFirst, indexOfLast);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  


    useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true)
    
    const employeeUrl = 'http://localhost:8080/employees'
    const contractUrl = 'http://localhost:8080/contracts'

    const getEmployeeUrl = await axios.get(employeeUrl)
    const getContractsUrl = await axios.get(contractUrl)

      axios.all([getEmployeeUrl, getContractsUrl]).then(
        axios.spread((...allData) => {
          setEmployees(allData[0].data)
          setContract(allData[1].data)
          setTimeout(() =>  setIsLoading(false), 1100);

        })
      ).catch(() => {
        setErrorMessage("Unable to fetch data");
        setIsLoading(false);
    });
      
    }
      fetchData()
    }, [])


  return (
    <>
    {errorMessage && <div className="error">{errorMessage}</div>}
    {isLoading ? <Spinner /> : <div className="table__container">
      <table className="table">
      <thead>
        <tr className="table__header">
          <th>Name</th>
          <th>Position</th>
          <th>Date</th>
          <th>Salary</th>
          <th>Contract</th>
        </tr>
      </thead>
      <Employees employeeRecords={currentData} contractsRecords={contracts}/> 
      </table>
      <div>
        <Pagination
            recordsPerPage={recordsPerPage}
            totalRecords={employees.length}
            paginate={paginate}
          />
      </div>
    </div>
    }
    </>
  )
}

export { Table };




