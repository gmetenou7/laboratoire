import React, { Fragment, useEffect } from 'react';
import { Puff } from 'react-loader-spinner';
import {
    financialStatusSelector,
    financialStateRangeThunk,
    financialStateSelector
} from "../../features/financialStateSlice.ts";
import { showModalReducer } from "../../features/modalSlice.ts"

import InputField from "../../component/utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { FinancialTable } from '../tables/Table.tsx';
import { formatNumber } from "../utilities/numberFormater.ts";
import {
    agenciesSelector,
    listAgenciesThunk,
    agencyStatusSelector
} from '../../features/agencySlice.ts';
import FinancialPrintable from './FinancialPrintable.tsx';


interface FinancialType {
    codeagence: string,
    datedebut: string,
    datefin: string,
    prixfacture: number
}

interface Agency {
    email: string,
    matricule: string,
    matricule_labo: string,
    nom: string,
    pays: string,
    region: string,
    rue: string,
    telephone: string,
    ville: string,
    updated_at: string,
    created_at: string
}


export function Financial() {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user") || "");
    const financialStatus = useSelector(
        (state: any) => financialStatusSelector(state)
    );
    const financial: [FinancialType] = useSelector(
        (state: any) => financialStateSelector(state)
    );
    const agencies: [Agency] = useSelector(
        (state: any) => agenciesSelector(state)
    );
    const agencyStatus = useSelector(
        (state: any) => agencyStatusSelector(state)
    )
    let montant = 0;
    for (let i = 0; i < financial?.length; i++) {
        montant += financial?.[i]?.prixfacture
    }
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FinancialType>();

    async function handleGetFinancialState(data: FinancialType) {
        const request_data = {
            codelabo: user?.matricule_labo,
            "codeagence": data?.codeagence ? data.codeagence : "",
            "datedebut": data.datedebut,
            "datefin": data.datefin
        }
        try {
            const response = await dispatch(
                financialStateRangeThunk(request_data)
            )
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    function handleOpenFinancialPrintable() {
        dispatch(
            showModalReducer({
                active: true,
                header: "Import l'état finacier",
                body: <FinancialPrintable
                    data={financial}
                    price={montant}
                />
            })
        )
    }
{/***useeffet */}
    useEffect(() => {
        agencyStatus === "idle" && dispatch(
            listAgenciesThunk(user?.matricule_labo)
        )
    }, [agencyStatus])

    return (
        <Fragment>
            <form onSubmit={handleSubmit(handleGetFinancialState)}

                className="financial-state-form site-bg"
            >
                <div className="input-group">
                    <label className="label" htmlFor="id-service"> Choisissez une agence
                        <span className="message text-danger">
                            {errors?.codeagence?.message && errors?.codeagence?.message}
                        </span>
                    </label>
                    <select
                        disabled={(financialStatus.for === "range" && financialStatus.state === "loading")}
                        className="input-field"
                        {...register("codeagence", {
                            required: false
                        })}
                    >
                        <option disabled>Choisir l'agence</option>
                        <option ></option>
                        {agencies?.map((agency, index: number) => (
                            <option
                                value={agency?.matricule}
                                key={index}>
                                {agency.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <InputField
                    disabled={(financialStatus.for === "range" && financialStatus.state === "loading")}
                    id="datedebut"
                    label="Date de debut"
                    type="date"
                    placeholder="Entrer la date de debut"
                    register={register("datedebut", {
                        required: 'Champ requis'
                    })}
                    error={{ for: "datedebut", text: errors?.datedebut?.message }}
                />
                <InputField
                    disabled={(financialStatus.for === "range" && financialStatus.state === "loading")}
                    id="datefin"
                    label="Date de fin"
                    type="date"
                    placeholder="Entrer la date de debut de fin"
                    register={register("datefin", {
                        required: 'Champ requis'
                    })}
                    error={{ for: "datedebut", text: errors?.datefin?.message }}
                />

                <div className="btn-group mt-10">
                    <button
                        disabled={(financialStatus.for === "range" && financialStatus.state === "loading")}
                        type="submit"
                        className="btn btn-main"
                    >
                        Enregistrer
                        {(financialStatus.for === "range" && financialStatus.state === "loading") &&
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
                        }
                    </button>

                </div>
            </form>
            {financial?.length > 0 ?
                <>
                    <div className="list-financial">
                        <FinancialTable data={financial} />
                    </div>
                    <div className="financial-state-footer site-bg">
                        <p className='pricing'>
                            Prix Total:
                            <span>
                                {(financialStatus.for === "range" && financialStatus.state === "loading") ?
                                    <Puff
                                        height="20"
                                        width="20"
                                        radius={1}
                                        color="#0A018E"
                                        ariaLabel="puff-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    /> :
                                    <>
                                        {formatNumber(montant)} $
                                    </>
                                }

                            </span>
                        </p>
                        <button
                            disabled={(financialStatus.for === "range" && financialStatus.state === "loading")}
                            type="button"
                            className="btn btn-main-blue"
                            onClick={handleOpenFinancialPrintable}
                        >
                            Imprimer
                        </button>
                    </div>
                </> :
                <div className='loading-fail'>
                    <h4 className='fail-text text-center'>Aucun état finacier trouvé pour la période selectionnée</h4>
                </div>
            }
        </Fragment>
    )
}
