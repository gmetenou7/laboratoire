import React from "react";
import { CreateInsuredContract } from "../../component/assurance/contracts/CreateInsuredContract.tsx";

import PageLayout from "../PageLayout.tsx";

export const CreateInsuredContractPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const content = <div className="create-patient-page-layout">
        <div className="patient-form-container">
            <h3 className="form-headline">Créer un contrat d'assurance</h3>
            <CreateInsuredContract />
        </div>
        <div className="content-container">

        </div>
    </div>
    return (
        <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
    )
}