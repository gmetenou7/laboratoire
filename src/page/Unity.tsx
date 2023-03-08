import React, { Fragment } from 'react';
import PageLayout from "./PageLayout.tsx";
import { useSelector } from 'react-redux';
import { UnityList } from '../component/unity/UnityList.tsx';

export function Unity() {
  const user = JSON.parse(localStorage.getItem("user") || "");

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        <UnityList />
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
