import React, { Fragment } from 'react'
import ListInstitution from '../../component/institution/ListInstitution.tsx'
import PageLayout from "../PageLayout.tsx";


export function InstitutionCompagnyPage() {


    const user = JSON.parse(localStorage.getItem("user") || "");

    const contenent = <Fragment>
        <div className="patient-page-wrapper">
            <ListInstitution />
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
