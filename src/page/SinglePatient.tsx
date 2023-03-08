import React, { Fragment } from 'react';
import { SinglePatientView } from '../component/patients/SinglePatientView.tsx';
import { Tabs } from '../component/utilities/Tabs.tsx';
import PageLayout from "./PageLayout.tsx";
import { ListExems } from '../component/exems/ListExems.tsx';

export function SinglePatient() {
    const user = JSON.parse(localStorage.getItem("user") || "");

    const content =
        <Fragment>
            <div className="single-patient-page-wrapper">
                <div className="patient-view">
                    <SinglePatientView />
                </div>
                <div className="patient-content-view">
                    <Tabs tabs={
                        [
                            {
                                label: "Examens",
                                content: <ListExems
                                    it={user.nomservice === "it" ? true : false}
                                    accueil={user.nomservice === "accueil" ? true : false}
                                />
                            },
                            {
                                label: "Rendez-vous",
                                content: "Rendez-vous",
                            },
                            {
                                label: "Paramètres",
                                content: "Paramètres"
                            }
                        ]
                    } />
                </div>
            </div>
        </Fragment>
    return (
        <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
    )
}
