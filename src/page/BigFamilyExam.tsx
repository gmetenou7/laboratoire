import React, { Fragment } from 'react';
import { ListBigFamilyExam } from '../component/exems/bigfamilyExam/ListBigFamilyExam.tsx';

import PageLayout from "./PageLayout.tsx";


export function BigFamilyExam() {
  const user = JSON.parse(localStorage.getItem("user"));

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        <ListBigFamilyExam />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
