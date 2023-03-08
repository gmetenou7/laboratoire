import React, { useState, useEffect, Fragment } from 'react';
import { Puff } from 'react-loader-spinner';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai"
import callApi from '../../Utils/Utils.tsx';
import { showModalReducer } from "../../features/modalSlice.ts";
import { CreateAgency } from './CreateAgency.tsx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    listAgenciesThunk,
    agenciesSelector,
    agencyStatusSelector
} from "../../features/agencySlice.ts"

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
}

export function ListAgencies() {
    const agencies: [Agency] = useSelector((state: any) =>
        agenciesSelector(state)
    );
    const agenciesStatus: string = useSelector((state: any) =>
        agencyStatusSelector(state)
    )
    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch();

    async function handleFetchAgencies() {
        try {
            const response = await dispatch(
                listAgenciesThunk(user?.matricule_labo)
            ).unwrap()
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        agenciesStatus === "idle" && handleFetchAgencies()
    }, [agenciesStatus]);

    function handleCreateAgencyModal() {
        dispatch(showModalReducer({
            active: true,
            header: "Ajouter une agence",
            body: <CreateAgency
                fetchAgencies={handleFetchAgencies}
            />
        }))
    }

    return (
        <Fragment>
            {agenciesStatus === "loading" ?
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
                    {agenciesStatus === "error" ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handleFetchAgencies}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        <div className="agencies-items">
                            {agencies?.map((item, index: number) =>
                                <Link
                                    to={`/agencies/agency-id=${item?.matricule}`}
                                    key={index}
                                    className="agency-item">
                                    <div className="agency-item-body">
                                        <h1 className='placeholder'>{item?.matricule}</h1>
                                    </div>
                                    <div className="agency-item-footer">
                                        <h3 className="agency-name">
                                            {item?.nom}
                                        </h3>
                                        <AiFillEye
                                            className='action-icon'
                                        />
                                    </div>
                                </Link>
                            )}
                            <div
                                onClick={() => handleCreateAgencyModal()}
                                className="add-agency-item">
                                <BsFillPlusCircleFill
                                    className='add-agency-icon'
                                />
                            </div>
                        </div>
                    }
                </>
            }
        </Fragment>
    )
}