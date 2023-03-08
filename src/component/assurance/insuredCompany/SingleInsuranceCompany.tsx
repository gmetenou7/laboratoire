import React, { Fragment, useEffect, useState } from 'react'
import { FaAngleRight, FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { UpdateInsuredCompagny } from './UpdateInsuredCompagny.tsx';
import {showModalReducer} from "../../../features/modalSlice.ts";
import callApi, {notification} from "../../../Utils/Utils.tsx";
import {formatDateTime} from "../../utilities/dateTimeFormatter.ts";

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';
import { CreateInsuredCompagny } from './CreateInsuredCompagny.tsx';

interface InsuredCompagnies {
    nom:string,
    email:string,
    telephone:string,
    adresse:string,
    shareinformations:number ,
    codeassureur: string,
    codelabo:string,
    password:string,
    cpassword:string,
    code: string,
    nomassureur: string,
    creele: string,
    activeordesactive: number,
    modifierle: string
}

export function SingleInsuranceCompany ()  {

    const SingleAssurance = {
            nom: "Export Express",
            email: "express@gmail.com",
            telephone: "+237699660099",
            adresse: "BP-YDE",
            code: "22-31",
            etat: 1
        }
         
        const dispatch=useDispatch();
        const params = useParams()
        const IdInsuredCompany= params.code
        const user = JSON.parse(localStorage.getItem("user") || "");
        const [showConfirmDelete, setShowConfirmDelete] = useState(false);
        const [loadingDelete, setLoadingDelete] = useState(false)
        const [singleInsured,setSingleInsured] = useState<InsuredCompagnies>();
        const [isMounted, setIsMounted] = useState(true)

         const handleFetcheSingleInsuredCompany = async () => {
            setLoadingDelete(true);
            try {

            let response = await callApi(true, `entrepriseinstitution/${IdInsuredCompany}`, "get", null);
                console.log(response.data?.data);
                
            if (response?.data?.success) {
                setLoadingDelete(false);
                setSingleInsured(response.data?.data)
            // notification("success", response.data.message);
                setShowConfirmDelete(false)
                
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

        let response = await callApi(true, `entrepriseinstitution/${IdInsuredCompany}`, "delete", null);
            console.log(response);
            
        if (response?.data?.success) {
            setLoadingDelete(false);
            notification("success", response.data.message);
            handleFetcheSingleInsuredCompany()
            setShowConfirmDelete(false)
            
            
            
        }
        else{
            setLoadingDelete(false);
            notification('error',  "une erreur inatendu est survenue, rééssayer" )
        }

        } catch (error) {
        setLoadingDelete(false);
        }
   };
        function handleUpdateInsuredCompagnyModal() {
        dispatch(showModalReducer({
            active: true,
            header:` Modifier l'entreprise N° ${IdInsuredCompany}`,
            body: <CreateInsuredCompagny code={IdInsuredCompany}/>

        }))
    }
     
    useEffect(() => {
        isMounted && handleFetcheSingleInsuredCompany();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);
  return (
    <Fragment>
        <div className="patient-infos-contaire">
            <div className="infos-body">
                <ul>
                    <h2 className="info-header">Entreprise assurée</h2>
                    <li>
                        Matricule: <span>{singleInsured?.code}</span>
                    </li>
                    <li>
                        Nom: <span>{singleInsured?.nom}</span>
                    </li>
                    <h2 className="info-header"> Contacts & Adresse</h2>
                    <li>
                        Téléphone: <span>{singleInsured?.telephone}</span>
                    </li>
                    <li>
                        Email: <span>{singleInsured?.email}</span>
                    </li>
                    <li>
                        Adresse: <span>{singleInsured?.adresse}</span>
                    </li>
                    <h2 className='info-header'>Autres</h2>
                    <li>
                        Compagnie d'assurance: <span>{singleInsured?.nomassureur}</span> 
                    </li>
                    <li>
                         Date de création: <span> {formatDateTime(singleInsured?.creele)}</span>
                    </li>
                    <li>
                         Dernière modification: <span>{formatDateTime(singleInsured?.modifierle)}</span>  
                    </li>
                    <li >
                        Etat: <span>{singleInsured?.activeordesactive === 1 ?
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
                <Link   
                    onClick={handleUpdateInsuredCompagnyModal}         
                    className='edit-btn'
                    to="#">
                        <span>Modifier</span>
                        <FaEdit className='edit-icon' />
                </Link>
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
                                                    Est-vous sure de vouloir {singleInsured?.activeordesactive === 1 ? "désactiver" : "activer"} cette Entreprise ?
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
                                            
                                            {singleInsured?.activeordesactive  ?
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
