import React, { Fragment, useState } from 'react'
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { InsuredInstitutionList } from '../../component/institution/insuredInstitution/InsuredInstitutionList.tsx';
import { SingleInstitution } from '../../component/institution/SingleInstitution.tsx';
import PageLayout from "../PageLayout.tsx";
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { StatistiqueCard } from "../../component/cards/StatistiqueCard.tsx";
import { FeatureCard } from "../../component/cards/FeatureCard.tsx";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import DifferenceTwoToneIcon from "@mui/icons-material/DifferenceTwoTone";
import CalculateTwoToneIcon from "@mui/icons-material/CalculateTwoTone";

const patientFeatures = [
    {
        title: "Contrats",
        icon: <GroupAddTwoToneIcon className="card-icon" />,
        className: "feature-main-blue",
        link: "/list-contrat-institution"
    },
    // {
    //     title: "Agents",
    //     icon: <DifferenceTwoToneIcon className="card-icon" />,
    //     className: null,
    //     link: "/list-agent-institution"
    // },
    // {
    //     title: "Clients",
    //     icon: <CalculateTwoToneIcon className="card-icon" />,
    //     className: "feature-main-blue",
    //     link: "/list-client-Institution"
    // },
];

export const SingleInstitutionPage = () => {
    const params = useParams();
    const user = JSON.parse(localStorage.getItem("user") || "");

    const content = <Fragment>
        <div className="single-agency-page">
            <div className="agency-info">
                <SingleInstitution
                    IdInstitution={params.code}
                />
            </div>

            <div className="services-list">
                <div className="list-features">
                    <div className="features">
                        {patientFeatures.map((item, index) => (
                            <FeatureCard
                                key={index}
                                className={`feature-card ${item.className}`}
                                title={item.title}
                                icon={item.icon}
                                link = {`${item.link}/${params.code}`}
                            />
                        ))}
                    </div>
                </div>
                <hr className='mt-40' />
                <div className='info-header py-40'>
                    <div className="grid-3 gap-30">
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<CurrencyExchangeTwoToneIcon
                                className="card-icon"
                            />}
                            stateHead="10"
                            headline="Nombre de Contrat de convention"
                            stateCaption="Contracts"
                        />
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<AssignmentTurnedInIcon
                                className="card-icon"
                            />}
                            stateHead="5"
                            headline="Nombre d'Agents"
                            stateCaption="Entreprises"
                        />
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<AssignmentTurnedInIcon
                                className="card-icon"
                            />}
                            stateHead="40"
                            headline="Nombre Client"
                            stateCaption="Clients"
                        />

                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<CurrencyExchangeTwoToneIcon
                                className="card-icon"
                            />}
                            stateHead="10"
                            headline="Nombre de Contrat de convention"
                            stateCaption="Contracts"
                        />
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<CurrencyExchangeTwoToneIcon
                                className="card-icon"
                            />}
                            stateHead="10"
                            headline="Nombre de Contrat de convention"
                            stateCaption="Contracts"
                        />

                    </div>
                </div>
                {/* <InsuredInstitutionList /> */}
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
