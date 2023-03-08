import React, { Fragment } from 'react';
import { ListServices } from "../../component/services/ListServices.tsx"
import PageLayout from "../PageLayout.tsx";

export default function ListAllServicesPage() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const content =
    <Fragment>
      <div className="services-page-wrapper">
        <ListServices agencyId={null} />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
