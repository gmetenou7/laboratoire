import React, { Fragment } from 'react';
import { ListExamTFamily } from '../component/exems/examFamily/ListExamFamily.tsx';
import PageLayout from "./PageLayout.tsx";


export function ExamFamily() {
  const user = JSON.parse(localStorage.getItem("user"));

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        <ListExamTFamily />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
