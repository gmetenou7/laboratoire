import React, { Fragment } from 'react'
import { SingleUserCompany } from '../../../component/assurance/insuredCompany/SingleUserCompany.tsx';
import PageLayout from "../../PageLayout.tsx";

export const SingleUserCompanyPage = () => {

    
    const user = JSON.parse(localStorage.getItem("user") || "");
    const content = 
            <Fragment>
                <SingleUserCompany/>
            </Fragment>
  return (
    <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
  )
}
