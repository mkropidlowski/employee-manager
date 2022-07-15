import React, { useState, useEffect } from "react";
import axios from "axios";



export const useFetch = (urlEmployee, urlContracts) => {
    const [employe, setEmployees] = useState([])
    const [contract, setContract] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {

        const fetchData = async () => {
      
        // const employeeUrl = 'http://localhost:8080/employees'
        // const contractUrl = 'http://localhost:8080/contracts'
      
        const getEmployeeUrl = await axios.get(urlEmployee)
        const getContractsUrl = await axios.get(urlContracts)
      
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
        }, [urlEmployee, urlContracts])
  
    return {employe, contract,isLoading, errorMessage };
  };
