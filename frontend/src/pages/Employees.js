import React from "react";
import { Table } from "../components/Table";

const PAGE_SIZE = 5;
const WIDTH = 200;

const Employees = () => {


  return (
    
    <div className={'app__container app__containter--fixed'}>
     <Table />
    </div>

  )
}

export { Employees };
