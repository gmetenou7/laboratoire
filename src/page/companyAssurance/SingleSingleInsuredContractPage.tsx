import React, { Fragment } from 'react'
import { SingleInsuredContract } from '../../component/assurance/contracts/SingleInsuredContract.tsx'
import PageLayout from "../PageLayout.tsx";

export const SingleSingleInsuredContractPage = () => {


  const user = JSON.parse(localStorage.getItem("user") || "");
  const content =
    <Fragment>
      <SingleInsuredContract />
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
