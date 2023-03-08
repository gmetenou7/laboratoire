import React, { Fragment, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UpdateAgent } from './UpdateAgent.tsx';
import { showModalReducer } from "../../features/modalSlice.ts"
import { Agent } from 'https';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';

export function SingleAgent() {

    const SingleAgent = {
        nom: "Laurine",
        prenom: "Laurine",
        email: "laurine@gmail.com",
        telephone: "+237696295892",
        code: "22-31",
        etat: 1
    }
    const user = JSON.parse(localStorage.getItem("user") || "");
    const params = useParams();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const [loadingDelete, setLoadingDelete] = useState(false);

    function handleDeactivateAgent(IdAgent: string) {
        setLoadingDelete(true)
    }

    return (
        <Fragment>
            <div className='single-employee'>
                <div className="employee-form-layout">
                    <h3 className="form-headline">
                        Modifier l'Agent
                    </h3>
                    <div className="employee-form-wrapper">
                        <UpdateAgent

                        />
                    </div>
                </div>
                <div className="employee-content">
                    <div className="employee-info">
                        <h3 className="form-headline">
                            Détails sur l'Agent </h3>
                        <ul>
                        <li>
                            Matricule: <span>{SingleAgent?.code}</span>
                        </li>
                        <li>
                            Nom: <span>{SingleAgent?.nom}</span>
                        </li>
                        <li>
                            Prénom: <span>{SingleAgent?.prenom}</span>
                        </li>
                        <li>
                            Email: <span>{SingleAgent?.email}</span>
                        </li>
                        <li>
                            Téléphone: <span>{SingleAgent?.telephone}</span>
                        </li>
                     
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
                                        Etes-vous sure de vouloir {SingleAgent?.etat === 1 ? "désactiver" : "activer"} cet agent?
                                    </p>
                                </div>
                                <div className="confirm-popup-footer">
                                    <button
                                        className="popup-btn-main"
                                        onClick={
                                            handleDeactivateAgent
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
                                {SingleAgent?.etat === 1 ?
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
                </div>
            </div>
        </Fragment>
    )
}
