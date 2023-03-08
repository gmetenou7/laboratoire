import React, { Fragment } from 'react';
// import { ClientList } from '../../component/assurance/ClientList.tsx';
import PageLayout from "../../PageLayout.tsx";
import { ClientList } from "../../../component/assurance/clients/ClientList.tsx"


export function ClientListPage() {


  const user = JSON.parse(localStorage.getItem("user") || "");

  const contenent = <Fragment>
    <div className="patient-page-wrapper">
      <ClientList />
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
