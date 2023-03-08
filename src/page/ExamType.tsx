import React, { Fragment } from 'react';
import { ListExamsType } from '../component/exems/exemsTypes/ListExamsType.tsx';
import PageLayout from "./PageLayout.tsx";



export function ExamType() {
  const user = JSON.parse(localStorage.getItem("user"));

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        <ListExamsType />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
