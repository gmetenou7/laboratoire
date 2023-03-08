import React, { Fragment } from 'react'
import ListInsuredContract from '../../component/assurance/contracts/ListInsuredContract.tsx';
import PageLayout from "../PageLayout.tsx";


export function ListInsuredContractPage() {


  const user = JSON.parse(localStorage.getItem("user") || "");

  const contenent = <Fragment>
    <div className="patient-page-wrapper">
      <ListInsuredContract />
    </div>
  </Fragment>
  return (
    <div>
      <PageLayout
        children={contenent}
        useSidebar={user?.fonction === "admin" ? true : false}
      />
    </div>
  )
}
