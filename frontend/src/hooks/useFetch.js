import React, { useState, useEffect } from "react";
import axios from "axios";

// Skrypt, który miał posłużyć jako reużywalny do pobierania danych z endpointa.
// W plikach Employees i Table jest on powielony, najpierw zabrałem się za stworzenie 
// pobierania danych a potem dopiero ten skrypt przez to podczas próby implemenacji 
// zaczęło mi sypać trochę błędów więc wróciłem do poprzedniego rozwiązania ze względu na wyrobienie się na czas z zadaniem, natomiast poniższa opcja 
// wyrzucała błędy związanie z tablicami więc pewnie albo któryś state ma złą wartość albo odbiór danych przerabia tablice na obiekt przez co 
// przy dalszych funkcjach miałem błędy.


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
