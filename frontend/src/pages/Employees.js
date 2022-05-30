import React from "react";
import { useNavigate } from "react-router-dom";
import { dateConverter } from "../components/DateParser";
// const PAGE_SIZE = 5;
// const WIDTH = 200;

const Employees = ({employeeRecords, contractsRecords}) => {

  const navigate = useNavigate()
  
  // navigate to employeeDetails
  function handleClick(e) {
    const userID = e.target.parentElement.getAttribute("data-id")
    navigate(`/employeeDetails/${userID}`);
  }

  return (
    <tbody className={'app__container app__containter--fixed'}>
    
      {employeeRecords && employeeRecords.map(employeesList => {
      const data = contractsRecords.find(cont => cont.employeeId === employeesList.id)
    
      return (
        <tr className="table__row" onClick={handleClick} key={employeesList.id} data-id={employeesList.id}>
          <td>{employeesList.name}</td>
          <td>{employeesList.position}</td>
          <td>{dateConverter(employeesList.dateOfBirth)}</td>
          <td>{data.salary}</td>
          <td>{dateConverter(data.contractValidUntil)}</td>
        </tr>
      )
      }
      )}
    </tbody>
  )
}

export { Employees };
