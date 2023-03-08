import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import callApi, { notification } from "../../Utils/Utils.tsx";
import { AiFillCheckCircle } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { closeModalReducer } from "../../features/modalSlice.ts";
import { useDispatch } from 'react-redux';
interface ReferenceValue {
    code: number,
    intitule: string,
    description: string,
    codeexamen_type: string,
    valeur_reference: string,
    code_examen: string
}

interface TypeExam {
    codetype: string,
    prixtotaltype: string,
    resultatrelevetype: string,
    nomtype: string,
    dureeanalyse: string,
    veleur_reference: [ReferenceValue],
    unite: string,
    nomverre: string,
    symboleverre: string,
    couleurverre: string,
    preleve: number,
    ajeun: number,
}

interface ExamFamily {
    codefamille: string,
    nomfamille: string,
    decisionexam: string,
    comment: string,
    types: [TypeExam],

}

interface Voucher {
    libellestatutexamen: string,
    codeexamen: string,
    medecindemandeur: string,
    createat: string,
    updateat: string,
    prixtotalexam: string,
    codestatusexamen: number,
    decriptionexam: string,
    nomlaborentin: string,
    prenomlaborentin: string,
    nomcli: string,
    prenomcli: string,
    emailcli: string,
    sexe: string,
    ageclient: string,
    telephone: string,
    nomlabo: string,
    telephonelabo: string,
    emaillabo: string,
    payslabo: string,
    villelabo: string,
    regionlabo: string,
    ruelabo: string,
    logolabo: string,
    comments: string,
    examen: [ExamFamily],
    clientajeun: number,
}

export default function RecordSample({ examId }) {
    const [loading, setLoading] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const [loadingFail, setLoadingFail] = useState(false);
    const dispatch = useDispatch()
    const [
        singleExamVoucher,
        setSingleExamVoucher
    ] = useState<Voucher>();

    const {
        register,
        handleSubmit
    } = useForm()

    async function handleFetchSingleExamVoucher() {
        setLoading(true)
        setLoadingFail(false)
        try {
            const response = await callApi(
                true,
                "specificexamens",
                'post',
                {
                    codebon: examId,
                },
                null
            );
            if (response?.data?.success) {
                setSingleExamVoucher(response?.data?.data);
                console.log(response?.data?.data);
                setLoading(false);
                setLoadingFail(false);
            } else {
                setLoading(false);
                setLoadingFail(true)
            }
        } catch (error) {
            setLoading(false);
            setLoadingFail(true)
        }
    }

    async function handleRecordSample(data: any) {
        setLoadingCreate(true);
        let sample: any = []
        Object.keys(data).forEach(function (item) {
            const value: any = {
                codeexam: item.split("_")[1],
                preleve: data[item] === true ? 1 : 0
            }
            sample.push(value)
        });

        const request_data = {
            "codebon": singleExamVoucher?.codeexamen,
            "examen": sample
        }
        try {
            const response = await callApi(
                true,
                `preleve`,
                'post',
                request_data,
                null
            );
            if (response?.data?.success) {
                setLoadingCreate(false);
                dispatch(
                    closeModalReducer()
                )
                notification(
                    "success",
                    "L'enregistrement a été effectué avec succès"
                )
            } else {
                setLoadingCreate(false);
                notification(
                    "error",
                    "Un problème est survenu lors de l'enregistrement des registre, essayez de nouveau"
                )
            }
        } catch (error) {
            setLoadingCreate(false);
            notification(
                "error",
                "Un problème est survenu lors de l'enregistrement des registre, essayez de nouveau"
            )
        }
    }

    useEffect(() => {
        isMounted && handleFetchSingleExamVoucher();
        return () => {
            setIsMounted(false)
        }
    }, [isMounted])

    return (
        <Fragment>
            <div className='record-sample-form'>
                {loading ?
                    <div className='loading-container flex-col-center-center'>
                        <Puff
                            height="70"
                            width="70"
                            radius={1}
                            color="#528F01"
                            ariaLabel="puff-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div> :
                    <>
                        {!loadingFail ?
                            <form
                                className='sample-form'
                                onSubmit={handleSubmit(handleRecordSample)}
                            >
                                {singleExamVoucher?.clientajeun === 1 &&
                                    <div className="message">
                                        <p
                                            className='message-text'
                                        >
                                            Le patient etait a Jeune au moment de la creation de ce bon d'examen
                                        </p>
                                        <CgDanger
                                            className='message-icon'
                                        />
                                    </div>
                                }
                                {singleExamVoucher &&
                                    <Fragment>
                                        {singleExamVoucher?.examen?.map((exam, index) =>
                                            <div
                                                className='class-items site-bg'
                                                key={index}>
                                                <h5
                                                    className='sample-item-header'>
                                                    {exam?.nomfamille}
                                                </h5>
                                                <div className="sample-item">
                                                    {exam?.types?.map((type, index) =>
                                                        <Fragment>
                                                            {type?.preleve === 0 ?
                                                                <label
                                                                    className='sample-form-group '
                                                                    htmlFor={`type_${type?.codetype}`}>
                                                                    <input
                                                                        className='sample-input'
                                                                        id={`type_${type?.codetype}`}
                                                                        type="checkbox"
                                                                        {...register(`type_${type?.codetype}`)}
                                                                    />
                                                                    <div
                                                                        className='label-group'>
                                                                        <span
                                                                            className='sample-label'
                                                                        >
                                                                            {type?.nomtype}
                                                                        </span>
                                                                        <AiFillCheckCircle
                                                                            className='waiting'
                                                                        />
                                                                        {/*  */}
                                                                        {type?.ajeun === 1 &&
                                                                            <CgDanger
                                                                                className='danger'
                                                                            />
                                                                        }
                                                                    </div>
                                                                </label> :
                                                                <label
                                                                    className='sample-form-group '
                                                                    htmlFor={`type_${type?.codetype}`}>
                                                                    <input
                                                                        className='sample-input'
                                                                        id={`type_${type?.codetype}`}
                                                                        hidden
                                                                        disabled
                                                                        type="checkbox"
                                                                        {...register(`type_${type?.codetype}`, {
                                                                            value: true
                                                                        })}
                                                                    />
                                                                    <div
                                                                        className='label-group'>
                                                                        <span
                                                                            className='sample-label'
                                                                        >
                                                                            {type?.nomtype}
                                                                        </span>
                                                                        <AiFillCheckCircle
                                                                            className='ended'
                                                                        />
                                                                    </div>
                                                                </label>
                                                            }
                                                        </Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </Fragment>
                                }

                                <button className="btn btn-main" type="submit">
                                    Enregistrer
                                    {loadingCreate &&
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
                            </form> :
                            <h4>
                                Un problème est survenu lors du chargement
                                <Link
                                    onClick={handleFetchSingleExamVoucher}
                                    to="#">Essayer de nouveau
                                </Link>
                            </h4>
                        }
                    </>
                }
            </div>
        </Fragment>
    )
}
