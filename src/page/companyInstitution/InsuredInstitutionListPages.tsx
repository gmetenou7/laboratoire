import React, { Fragment } from 'react'
//import ListInsuredContract from '../../component/assurance/contracts/ListInsuredContract.tsx';
import InsuredInstitutionList from '../../component/institution/insuredInstitution/InsuredInstitutionList.tsx';
import PageLayout from "../PageLayout.tsx";


export function InsuredInstitutionListPages() {


    const user = JSON.parse(localStorage.getItem("user") || "");

    const contenent = <Fragment>
        <div className="patient-page-wrapper">
            <InsuredInstitutionList />
        </div>
    </Fragment>
    return (
        <div>
            <PageLayout
                children={contenent}
                useSidebar={user?.fonction === "admin" ? true : false}
            />
        </div>
    )
}
