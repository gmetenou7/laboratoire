import React, { Fragment } from 'react'
import ListClient from '../../component/institution/clients/ListClient.tsx'
import PageLayout from "../PageLayout.tsx";


export function ClientsInstitutionPage() {


    const user = JSON.parse(localStorage.getItem("user") || "");

    const contenent = <Fragment>
        <div className="patient-page-wrapper">
            <ListClient />
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
