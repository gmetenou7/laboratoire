import React, {Fragment} from 'react'
import { StatAssuranceCompany } from '../../component/assurance/StatAssuranceCompany.tsx';
import PageLayout from "../PageLayout.tsx";

export function StatAssuranceCompanyPage ()  {

const user = JSON.parse(localStorage.getItem("user") || "");
    

   

    const content =
        <Fragment>
            <div className="financial-page-wrapper">
                    <StatAssuranceCompany />
             </div>
            
        </Fragment>
  return (
    <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
  )
}
