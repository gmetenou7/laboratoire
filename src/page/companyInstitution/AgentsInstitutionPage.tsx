import React, { Fragment } from 'react'
import ListAgent from '../../component/institution/agents/ListAgent.tsx'
import PageLayout from "../PageLayout.tsx";


export function AgentsInstitutionPage() {


    const user = JSON.parse(localStorage.getItem("user") || "");

    const contenent = <Fragment>
        <div className="patient-page-wrapper">
            <ListAgent />
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
