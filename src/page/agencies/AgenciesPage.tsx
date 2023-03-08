import React, { Fragment } from 'react';
import { ListAgencies } from '../../component/agencies/ListAgencies.tsx';
import PageLayout from "../PageLayout.tsx";

export function AgenciesPage() {
  const user = JSON.parse(localStorage.getItem("user") || "");


  const content =
    <Fragment>
      <div className="agencies-page-wrapper">
        <ListAgencies />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
