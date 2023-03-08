import React from "react";
import PageLayout from "../../PageLayout.tsx";
import { FormCreateUserCompany } from "../../../component/assurance/insuredCompany/FormCreateUserCompany.tsx";


export const CreateUserCompanyPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const content = <div className="create-patient-page-layout">
        <div className="patient-form-container">
            <h3 className="form-headline">Ajouter un client pour cette entreprise</h3>
            <FormCreateUserCompany />
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