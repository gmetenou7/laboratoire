import React, {Fragment} from 'react'
import { StatInsuredCompany } from '../../../component/assurance/insuredCompany/StatInsuredCompany.tsx';
import PageLayout from "../../PageLayout.tsx";

export function StatInsuredCompanyPage ()  {

const user = JSON.parse(localStorage.getItem("user") || "");
    

   

    const content =
        <Fragment>
            <div className="financial-page-wrapper">
                    <StatInsuredCompany />
             </div>
            
        </Fragment>
  return (
    <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
  )
}
