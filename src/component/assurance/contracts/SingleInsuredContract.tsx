import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UpdateInsuredContract } from './UpdateInsuredContract.tsx';
import callApi, {notification} from "../../../Utils/Utils.tsx";
import { Puff } from 'react-loader-spinner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

interface SingleContrat {
        identifiant: number,
        code: string
        nom: string,
        numero: number,
        description: string,
        taux: number,
        codelabortoire: string,
        codeentrepriseinstitution: string,
        codeassureur: string,
        creerle: string,
        modifierle: string,
        activeornot: number,
        nomentreprise: string,
        nomassureur: string,
        clients: []
}


export function SingleInsuredContract () {

    
    const user = JSON.parse(localStorage.getItem("user") || "");
    const params = useParams();
    const [singleContrat, setSingleContrat] = useState<SingleContrat>()
    const [isMounted, setIsMounted] = useState(true)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)


    const handleFetchSingleContrat= async () => {
    
    try {

      let response = await callApi(true, `contrat/${params?.code}`, "get", null);
        
        
      if (response?.data?.success) {
       
        setSingleContrat(response.data?.data)
       
      }

    } catch (error) {
      
    }
    };

    async function handleDeactivateContrat() {
        setLoadingDelete(true)
        try {
            const response = await callApi(
                true,
                `contrat/${params?.code}`,
                "delete", null
            );
            if (response?.data?.success) {
                setLoadingDelete(false);
                notification("success", "Le contrat a été modifié avec succes");
                handleFetchSingleContrat();
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

    
    useEffect(() => {
        isMounted && handleFetchSingleContrat();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);   
  return (
    <Fragment>
            <div className='single-employee'>
                            <div className="employee-form-layout">
                                <h3 className="form-headline">
                                    Modifier le contract
                                </h3>
                                <div className="employee-form-wrapper">
                                    <UpdateInsuredContract
                                        
                                    />
                                </div>
                            </div>

                            <div className="employee-content">
                                <div className="employee-info">
                                    <h3 className="info-headline">
                                       Details du contrat
                                    </h3>
                                    <ul>
                                        <li>
                                            Nom: <span>{singleContrat?.nom}</span>
                                        </li>
                                        <li>
                                            Taux : <span>{singleContrat?.taux}%</span>
                                        </li>
                                        <li>
                                            Numero : <span>{singleContrat?.numero}</span>
                                        </li>
                                        <li>
                                            Nom Compagnie d'assurance: <span>{singleContrat?.nomassureur}</span>
                                        </li>
                                        <li>
                                            Nom Entreprise assurée: <span>{singleContrat?.nomentreprise}</span>
                                        </li>
                                        <li>
                                            Description: <span>{singleContrat?.description}</span>
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
                                                    Est-vous sure de vouloir {singleContrat?.activeornot === 1 ? "désactiver" : "activer"} ce contat ?
                                                </p>
                                            </div>
                                            <div className="confirm-popup-footer">
                                                <button
                                                    className="popup-btn-main"
                                                    onClick={
                                                        handleDeactivateContrat
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
                                            {singleContrat?.activeornot === 1 ?
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
