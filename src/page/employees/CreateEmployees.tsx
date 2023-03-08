import React from "react";
import {
    CreateEmployeesForm
} from "../../component/employee/CreateEmployeesForm.tsx"

import PageLayout from "../PageLayout.tsx";

export const CreateEmployees = () => {
    const user = JSON.parse(localStorage.getItem("user") || "");



    const content = <div className="create-patient-page-layout">
        <div className="patient-form-container">
            <h3 className="form-headline">Utiliser ce formulaire pour créer un Employé</h3>
            <CreateEmployeesForm />
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