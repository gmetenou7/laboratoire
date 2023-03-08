import React, { Fragment, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UpdateUserCompany } from './UpdateUserCompagny.tsx';


export function SingleUserCompany (){

    const singleClient ={
            nom: "Alain",
            email: "charles@gmail.com",
            telephone: "+237655775544",
            prenom: "Charles",
            matricule: "22-34",
            etat: 1
        }
    const user = JSON.parse(localStorage.getItem("user") || "");
    const params = useParams();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)
    
        
  return (
    <Fragment>
            <div className='single-employee'>
                            <div className="employee-form-layout">
                                <h3 className="form-headline">
                                    Modifier le client
                                </h3>
                                <div className="employee-form-wrapper">
                                    <UpdateUserCompany
                                        
                                    />
                                </div>
                            </div>

                            <div className="employee-content">
                                <div className="employee-info">
                                    <h3 className="info-headline">
                                       Information du client
                                    </h3>
                                    <ul>
                                        <li>
                                            Matricule: <span>{singleClient?.matricule}</span>
                                        </li>
                                        <li>
                                            Nom: <span>{singleClient?.nom}</span>
                                        </li>
                                        <li>
                                            Prenom: <span>{singleClient?.prenom}</span>
                                        </li>
                                        <li>
                                            Email: <span>{singleClient?.email}</span>
                                        </li>
                                        <li>
                                            Téléphone : <span>{singleClient?.telephone}</span>
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
                                                    Est-vous sure de vouloir {singleClient?.etat === 1 ? "désactiver" : "activer"} cet Agent ?
                                                </p>
                                            </div>
                                            <div className="confirm-popup-footer">
                                                <button
                                                    className="popup-btn-main"
                                                    
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
                                            {singleClient?.etat === 1 ?
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
