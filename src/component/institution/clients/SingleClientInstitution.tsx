import React, { Fragment, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UpdateClientInstitution } from './UpdateClientInstitution.tsx';

export function SingleClientInstitution() {

    const SingleClient = {
        nom: "Laurine",
        prenom: "Laurine",
        email: "laurine@gmail.com",
        telephone: "+237696295892",
        fonction: "Ingenieur Logiciel",
        code: "22-31",
        etat: 1
    }
    const user = JSON.parse(localStorage.getItem("user") || "");
    const params = useParams();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const [loadingDelete, setLoadingDelete] = useState(false);

    function handleDeactivateClient(IdClient: string) {
        setLoadingDelete(true)
    }

    return (
        <Fragment>
            <div className='single-employee'>
                <div className="employee-form-layout">
                    <h3 className="form-headline">
                        Modifier le Client
                    </h3>
                    <div className="employee-form-wrapper">
                        <UpdateClientInstitution

                        />
                    </div>
                </div>
             <div className="employee-content">
                 <div className="employee-info">
                        <h3 className="form-headline">
                             Info sur le Client 
                        </h3>
                    <ul>
                        <li>
                            Matricule: <span>{SingleClient?.code}</span>
                        </li>
                        <li>
                            Nom: <span>{SingleClient?.nom}</span>
                        </li>
                        <li>
                            Prénom: <span>{SingleClient?.prenom}</span>
                        </li>
                        <li>
                            Email: <span>{SingleClient?.email}</span>
                        </li>
                        <li>
                            Téléphone: <span>{SingleClient?.telephone}</span>
                        </li>
                        <li>
                            fonction: <span>{SingleClient?.fonction}</span>
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
                                        Etes-vous sure de vouloir {SingleClient?.etat === 1 ? "désactiver" : "activer"} ce Client?
                                    </p>
                                </div>
                                <div className="confirm-popup-footer">
                                    <button
                                        className="popup-btn-main"
                                        onClick={
                                            handleDeactivateClient
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
                                {SingleClient?.etat === 1 ?
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
