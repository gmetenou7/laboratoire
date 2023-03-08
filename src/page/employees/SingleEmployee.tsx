import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateEmployeeForm from '../../component/employee/UpdateEmployeeForm.tsx';
import PageLayout from "../PageLayout.tsx";
import callApi, { notification } from "../../Utils/Utils.tsx"
import { Puff } from 'react-loader-spinner';
import {
    UpdatePassword
} from '../../component/employee/UpdateEmployeeForm.tsx';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { RiErrorWarningFill } from 'react-icons/ri';
interface Employee {
    code: string,
    matricule_labo: string,
    agence: string,
    service: string,
    nom: string,
    prenom: string,
    email: string,
    phone: string,
    fonction: string,
    password: string,
    cpassword: string,
    etat: number,
    specialite: string,
    chef: number
}

export default function SingleEmployee() {
    const [loading, setLoading] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState(false);
    const [isMounted, setIsMounted] = useState(true)
    const user = JSON.parse(localStorage.getItem("user") || "");
    const params = useParams();
    const [singleEmployee, setSingleEmployee] = useState<Employee>();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)

    async function handleFetchSingleEmployee() {
        setLoading(true);
        setLoadingFailed(false);
        try {
            const response = await callApi(
                true,
                `employe/${params?.matricule}`,
                "get", null
            );
            if (response?.data?.success) {
                setSingleEmployee(response?.data?.data);
                setLoading(false);
                setLoadingFailed(false);
            } else {
                setLoading(false);
                setLoadingFailed(true);
            }
        } catch (error) {
            setLoading(false);
            setLoadingFailed(true);
        }
    }

    useEffect(() => {
        isMounted && handleFetchSingleEmployee();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);

    async function handleDeactivateEmployee() {
        setLoadingDelete(true)
        try {
            const response = await callApi(
                true,
                `employe/${params?.matricule}`,
                "delete", null
            );
            if (response?.data?.success) {
                setLoadingDelete(false);
                notification("success", "L'employé a été modifié avec succes");
                handleFetchSingleEmployee();
                setShowConfirmDelete(false);
            } else {
                notification("error", "Une erreur est survenu lors du traitement modification");
                setLoadingDelete(false);
                setShowConfirmDelete(false);
            }
        } catch (error) {
            notification("error", "Une erreur est survenu lors du traitement");
            setLoadingDelete(false);
            setShowConfirmDelete(false);
        }
    }



    const content =
        <Fragment>

            {loading ?
                <div className='loading-container flex-col-center-center'>
                    <Puff
                        height="100"
                        width="100"
                        radius={1}
                        color="#528F01"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div> :
                <>
                    {loadingFailed ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handleFetchSingleEmployee}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        <div className='single-employee'>
                            <div className="employee-form-layout">
                                <h3 className="form-headline">
                                    Modifier l'utilisateur
                                </h3>
                                <div className="employee-form-wrapper">
                                    <UpdateEmployeeForm
                                        singleEmployee={singleEmployee}
                                        fetchSingleEmployee={handleFetchSingleEmployee}
                                    />
                                </div>
                            </div>

                            <div className="employee-content">
                                <div className="employee-info">
                                    <h3 className="info-headline">
                                        Info du compte
                                    </h3>
                                    <ul>
                                        <li>
                                            Matricule: <span>{singleEmployee?.code}</span>
                                        </li>
                                        <li>
                                            Nom: <span>{singleEmployee?.nom}</span>
                                        </li>
                                        <li>
                                            Prenom: <span>{singleEmployee?.prenom}</span>
                                        </li>
                                        <li>
                                            Email: <span>{singleEmployee?.email}</span>
                                        </li>
                                        <li>
                                            Téléphone : <span>{singleEmployee?.phone}</span>
                                        </li>
                                        {singleEmployee?.specialite &&
                                            <li>
                                                Spécialité : <span>{singleEmployee?.specialite}{singleEmployee?.chef && " :Chef"}</span>
                                            </li>
                                        }
                                    </ul>

                                    {showConfirmDelete &&
                                        <div className="confirm-popup">
                                            <div className="confirm-popup-header">
                                                <RiErrorWarningFill
                                                    className="popup-header-icon"
                                                />
                                                <h5 className="popup-header-text">
                                                    Confirmer l'action
                                                </h5>
                                            </div>
                                            <div className="confirm-popup-body">
                                                <p className="popup-body-text">
                                                    Est-vous sure de vouloir {singleEmployee?.etat === 1 ? "désactiver" : "activer"} cet employé? ?
                                                </p>
                                            </div>
                                            <div className="confirm-popup-footer">
                                                <button
                                                    className="popup-btn-main"
                                                    onClick={
                                                        handleDeactivateEmployee
                                                    }
                                                >
                                                    <span>Confirmer</span>
                                                    {loadingDelete && (
                                                        <Puff
                                                            height="20"
                                                            width="20"
                                                            radius={1}
                                                            color="#fff"
                                                            ariaLabel="puff-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}
                                                        />
                                                    )}
                                                </button>
                                                <button className="popup-btn-second"
                                                    onClick={() =>
                                                        setShowConfirmDelete(false)}>
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    }

                                    {user?.fonction === "admin" &&
                                        <div className='employee-state'>
                                            <h5>Etat du compte:</h5>
                                            {singleEmployee?.etat === 1 ?
                                                <>
                                                    <span className='state-active'>
                                                        Actif
                                                    </span>
                                                    <div className="icon-tooltip">
                                                        <span className="tooltip-text">Désactiver</span>
                                                        <Link
                                                            to="#"
                                                            onClick={() => setShowConfirmDelete(true)}
                                                            className='hidden-btn bg-danger'>
                                                            <AiFillEyeInvisible
                                                                className='hidden-icon'
                                                            />
                                                        </Link>
                                                    </div>
                                                </> :
                                                <>
                                                    <span className='state-inactive'>
                                                        Suspendu
                                                    </span>
                                                    <div className="icon-tooltip">
                                                        <span className="tooltip-text">Activer</span>
                                                        <Link
                                                            to="#"
                                                            onClick={() => setShowConfirmDelete(true)}
                                                            className='hidden-btn bg-main'>
                                                            <AiFillEye
                                                                className='hidden-icon'
                                                            />
                                                        </Link>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    }

                                </div>
                                <div className="update-password">
                                    <h3 className="form-headline">
                                        Modifier le mots de passe
                                    </h3>
                                    <UpdatePassword />
                                </div>
                            </div>
                        </div>
                    }
                </>
            }

        </Fragment>
    return (
        <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
    )
}