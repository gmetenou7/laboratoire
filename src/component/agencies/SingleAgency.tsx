import React, { Fragment, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { formatDateTime } from "../../component/utilities/dateTimeFormatter.ts"
import { showModalReducer } from "../../features/modalSlice.ts";
import { useDispatch } from 'react-redux';
import { UpdateAgency } from './UpdateAgency.tsx';
import { useSelector } from 'react-redux';
import {
    singleAgencySelector,
    agencyStatusSelector,
    listAgenciesThunk
} from "../../features/agencySlice.ts"
import { Puff } from 'react-loader-spinner';

interface Agency {
    created_at: string,
    email: string,
    matricule: string,
    matricule_labo: string,
    nom: string,
    pays: string,
    region: string,
    rue: string,
    telephone: string,
    updated_at: string,
    ville: string,
    state: number
}

export default function SingleAgency() {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const params = useParams();
    const agency: Agency = useSelector((state: any) =>
        singleAgencySelector(state, params?.matricule)
    );
    const agencyStatus = useSelector((state: any) =>
        agencyStatusSelector(state)
    )
    const dispatch = useDispatch()

    function handleShowUpdateAgencyModal() {
        dispatch(
            showModalReducer({
                active: true,
                header: "Modifier l'agence",
                body: <UpdateAgency
                    singleAgency={agency}
                />
            })
        )
    }

    useEffect(() => {
        agencyStatus === "idle" && dispatch(listAgenciesThunk(user?.matricule_labo))
    }, [agencyStatus, dispatch])

    return (
        <Fragment>
            <div className="single-agency-view">
                {agencyStatus === "loading" ?
                    <div className='loading-container flex-col-center-center'>
                        <Puff
                            height="60"
                            width="60"
                            radius={1}
                            color="#528F01"
                            ariaLabel="puff-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div> :
                    <>
                        <div className='agency-view-body'>
                            <ul>
                                <h2 className='info-header'>Dossier</h2>
                                <li>
                                    Code: <span>{agency?.matricule}</span>
                                </li>
                                <li>
                                    Nom: <span>{agency?.nom}</span>
                                </li>
                                <h2 className='info-header'>Contacts</h2>
                                <li>
                                    Email: <span>{agency?.email}</span>
                                </li>
                                <li>
                                    Téléphone: <span>{agency?.telephone}</span>
                                </li>
                                <h2 className='info-header'>Adresse</h2>
                                <li>
                                    Pays: <span>{agency?.pays}</span>
                                </li>
                                <li>
                                    Region: <span>{agency?.region}</span>
                                </li>
                                <li>
                                    Rue: <span>{agency?.region}</span>
                                </li>
                                <h2 className='info-header'>Autres</h2>
                                <li>
                                    Date de création: <span>{formatDateTime(agency?.created_at)}</span>
                                </li>
                                <li>
                                    Dernière modif: <span>{formatDateTime(agency?.updated_at)}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="agency-view-footer">
                            <Link
                                onClick={handleShowUpdateAgencyModal}
                                className='edit-btn'
                                to="#">
                                <span>Modifier</span>
                                <FaEdit className='edit-icon' />
                            </Link>
                        </div>
                    </>
                }
            </div>
        </Fragment>
    )
}