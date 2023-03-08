import React, { Fragment, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { RiErrorWarningFill } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { singleAssuranceCompanyStatusSelector } from '../../features/assuranceCompanySlice.ts';
import callApi, {notification} from "../../Utils/Utils.tsx";
import {formatDateTime} from "../utilities/dateTimeFormatter.ts";

interface SingleAssurance {
        code: string,
        nom: string,
        email:string,
        telephone: string,
        localisation: string,
        codelaboratoire:string,
        codeemployeenregistreur: string,
        derniermodification: string,
        creerle: string,
        identifiantunique: number,
        activeornot: number,
        nomcreateur: string,
        prenomcreateur: string
}

export function SingleAssurance ()  {
        

    const user = JSON.parse(localStorage.getItem("user") || "");
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const param = useParams()
    
    
    const code = param.code
    const SingleAssurance = useSelector((state) => singleAssuranceCompanyStatusSelector(state, code))  
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [isMounted, setIsMounted] = useState(true)
    const [singleAssurance, setSingleAssurance]= useState<SingleAssurance>()
     
    const handleFetcheSingleAssuranceCompany = async () => {
    setLoadingDelete(true);
    try {

      let response = await callApi(true, `assureur/${code}`, "get", null);
        //console.log(response.data?.data);
        
      if (response?.data?.success) {
        setLoadingDelete(false);
        setSingleAssurance(response.data?.data)
       // notification("success", response.data.message);
        setShowConfirmDelete(false)
       // console.log("single",response.data?.data?.contrats);
        
        setLoadingDelete(false);
        //notification('error',  "une erreur inatendu est survenue" )
      }

    } catch (error) {
      setLoadingDelete(false);
    }
    };
   const handleDeactivateAssuranceCompany = async () => {
    setLoadingDelete(true);
    try {

      let response = await callApi(true, `assureur/${param?.code}`, "delete", null);
        //console.log(response.data.message);
        
      if (response?.data?.success) {
        setLoadingDelete(false);
        notification("success", response.data.message);
        handleFetcheSingleAssuranceCompany()
        setShowConfirmDelete(false)
        
        setLoadingDelete(false);
        //notification('error',  "une erreur inatendu est survenue" )
      }

    } catch (error) {
      setLoadingDelete(false);
    }
   };
    useEffect(() => {
        isMounted && handleFetcheSingleAssuranceCompany();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);
  
  return (
    <Fragment>
        <div className="patient-infos-contaire">
            <div className="infos-body">
                <ul>
                    <h2 className="info-header">Dossier Compagnie </h2>
                    <li>
                        Matricule: <span>{singleAssurance?.code}</span>
                    </li>
                    <li>
                        Nom: <span>{singleAssurance?.nom}</span>
                    </li>
                    <h2 className="info-header"> Contacts & Adresse</h2>
                    <li>
                        Téléphone: <span>{singleAssurance?.telephone}</span>
                    </li>
                    <li>
                        Email: <span>{singleAssurance?.email}</span>
                    </li>
                    <li>
                        Adresse: <span>{singleAssurance?.localisation}</span>
                    </li>
                    <h2 className='info-header'>Autres</h2>
                    <li>
                        Date de creation: <span>{formatDateTime(singleAssurance?.creerle)}</span>
                    </li>
                    <li>
                         Date de modification: <span> {formatDateTime(singleAssurance?.derniermodification)} </span>  
                    </li>
                    <li >
                        Etat: <span>{singleAssurance?.activeornot === 1 ?
                        <span className='state-active'>
                            Actif
                        </span> :
                        <span className='state-inactive'>
                            Inactif
                        </span>}</span>
                   </li>
                </ul>
            </div>
            <div className="info-footer">
                <div className='employee-state'></div>
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
                                                    Est-vous sure de vouloir {singleAssurance?.activeornot === 1 ? "désactiver" : "activer"} cette Compagnie ?
                                                </p>
                                            </div>
                                            <div className="confirm-popup-footer">
                                                <button
                                                    className="popup-btn-main"
                                                    onClick={handleDeactivateAssuranceCompany}
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
                                            
                                            {singleAssurance?.activeornot === 1 ?
                                                <>
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
    </Fragment>
  )
}
