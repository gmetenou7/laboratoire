import React from "react";
import { CreateInsuredInstitution } from "../../component/institution/insuredInstitution/CreateInsuredInstitution.tsx";

import PageLayout from "../PageLayout.tsx";

export const CreateContratInstitutionPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const content = <div className="create-patient-page-layout">
        <div className="patient-form-container">
            <h3 className="form-headline">Créer un contrat</h3>
            <CreateInsuredInstitution />
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