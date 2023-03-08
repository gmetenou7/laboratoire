import React, { Fragment } from 'react'
import ListAssurance from '../../component/assurance/ListAssurance.tsx'
import PageLayout from "../PageLayout.tsx";


export function AssuranceCompagnyPage() {


    const user = JSON.parse(localStorage.getItem("user") || "");

    const contenent = <Fragment>
        <div className="patient-page-wrapper">
            <ListAssurance/>
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
