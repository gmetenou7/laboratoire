import React from "react";
import PageLayout from "../PageLayout.tsx";
import { CreatePatientForm } from "../../component/patients/CreatePatientForm.tsx"
export const UpdatePatient = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const content = <div className="create-patient-page-layout">
        <div className="patient-form-container">
            <h3 className="form-headline">Utiliser ce formulaire pour modifier un patient</h3>
            <CreatePatientForm />
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