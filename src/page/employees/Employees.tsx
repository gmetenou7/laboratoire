import React, { Fragment } from 'react';
import PageLayout from "../PageLayout.tsx";
import { ListEmployees } from "../../component/employee/ListEmployees.tsx"

export function Employees() {
  const user = JSON.parse(localStorage.getItem("user") || "");


  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        <ListEmployees />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
