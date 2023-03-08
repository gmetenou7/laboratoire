import React, { Fragment } from 'react';
import { ListGlassware } from '../component/exems/glassware/ListGlassware.tsx';
import PageLayout from "./PageLayout.tsx";



export function Glassware() {
  const user = JSON.parse(localStorage.getItem("user"));
  // const token = user?.token
  // console.log(token);

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        <ListGlassware />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
