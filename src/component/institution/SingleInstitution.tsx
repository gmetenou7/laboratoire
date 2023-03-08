import React, { Fragment, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Await, Link, useParams } from 'react-router-dom';
import callApi, { notification } from "../../Utils/Utils.tsx";
import {singleInstitutionsStatusSelector } from '../../features/institutionSlice.ts';
import { formatDateTime } from "../utilities/dateTimeFormatter.ts";

interface SingleInstitution {
    code: string,
    nom: string,
    email: string,
    telephone: string,
    adresse: string,
    shareinformations: boolean,
    creele: string,
    modifierle: string,
    identifiant: number,
    activeordesactive: number,
    codeassureur: string,
    nomassureur: string,
    codelaboratoire: string,
    contrats: []

}
export function SingleInstitution() {

    // const SingleInstitution = {
    //     nom: "AByster SARL",
    //     email: "abyster@gmail.com",
    //     telephone: "+237696295892",
    //     adresse: "BP-YDE",
    //     code: "22-31",
    //     etat: 1
    // }

    const user = JSON.parse(localStorage.getItem("user") || "");
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const param = useParams()
    const code = param.code
    const [isMounted, setIsMounted] = useState(true)
    const [loadingDelete, setLoadingDelete] = useState(false);
    const SingleInstitution = useSelector((state) => singleInstitutionsStatusSelector(state, code));
    const [singleInstitution, setSingleInstitution] = useState<SingleInstitution>()


    const handleFetcheSingleInstitution = async () => {
        setLoadingDelete(true);
        try {

            let response = await callApi(true, `entrepriseinstitutionalldata/${param?.code}`, "get", null);
            //console.log(response.data?.data);

            if (response?.data?.success) {
                setLoadingDelete(false);
                setSingleInstitution(response.data?.data)
                // notification("success", response.data.message);
                setShowConfirmDelete(false)

                setLoadingDelete(false);
                //notification('error',  "une erreur inatendu est survenue" )
            }

        } catch (error) {
            setLoadingDelete(false);
        }
    };

    
    const handleDeactivateInstitution = async () => {
        
        setLoadingDelete(true);
        try {

            let response = await callApi(true, `entrepriseinstitution/${param?.code}`, "delete", null);
            //console.log(response.data.message);

            if (response?.data?.success) {
                setLoadingDelete(false);
                notification("success", response.data.message);
                handleFetcheSingleInstitution()
                setShowConfirmDelete(false)

                setLoadingDelete(false);
                //notification('error',  "une erreur inatendu est survenue" )
            }

        } catch (error) {
            setLoadingDelete(false);
        }
    }

    useEffect(() => {
        isMounted && handleFetcheSingleInstitution();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);

    return (
        <Fragment>
            
            <div className="patient-infos-contaire">
                <div className="infos-body">
                    <ul>
                        <h3 className="info-header">
                                Détails sur l'institution </h3>
                            <li>
                                Matricule: <span>{singleInstitution?.code}</span>
                            </li>
                            <li>
                                Nom: <span>{singleInstitution?.nom}</span>
                            </li>
                           <h2 className="info-header"> Contacts & Adresse</h2>
                            <li>
                                Téléphone: <span>{singleInstitution?.telephone}</span>
                            </li>
                            <li>
                                Email: <span>{singleInstitution?.email}</span>
                            </li>
                            <li>
                                Adresse: <span>{singleInstitution?.adresse}</span>
                            </li>
                            <h2 className='info-header'>Autres</h2>
                            <li>
                                Date de creation: <span>{formatDateTime(singleInstitution?.creele)}</span>
                            </li>
                            <li>
                                Date de modification: <span>{formatDateTime(singleInstitution?.modifierle)}</span>
                            </li>
                        <li >
                            Etat: <span>{singleInstitution?.activeordesactive === 1 ?
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
                                    Est-vous sure de vouloir {singleInstitution?.activeordesactive === 1 ? "désactiver" : "activer"} cette Institution ?
                                </p>
                            </div>
                            <div className="confirm-popup-footer">
                                <button
                                    className="popup-btn-main"
                                    onClick={handleDeactivateInstitution}
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

                            {singleInstitution?.activeordesactive === 1 ?
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
