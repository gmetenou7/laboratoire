import React, { useState, useEffect } from 'react';
import callApi, { notification } from "../../Utils/Utils.tsx";
import { useForm } from 'react-hook-form';
import { Puff } from 'react-loader-spinner';
import { SelectLaborantinField } from "../utilities/FormField.tsx";
import { closeModalReducer } from "../../features/modalSlice.ts";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CgDanger } from "react-icons/cg";

interface Laborantin {
    non: string,
    code: string,
    idspecialite: number,
    specialite: string
}

interface Transfer {
    codelabotrentin: string
}

interface SingleLaborantin {
    etat: number,
    codelaborentin: string,
    nomlaborentin: string,
    prenomlaborentin: string,
    telephonelaborentin: string,
    emaillaborentin: string,
    fonctionlaborentin: string,
    specialite: string,
}


export function TransferExamVoucherForm({ VoucherId, idLabrantin, fetchSingleExam }) {
    const [loadingLaboranting, setLoadingLaboranting] = useState(false);
    const [loadingTransfer, setLoadingTransfer] = useState(false);
    const [laborantins, setLaborantins] = useState<[Laborantin]>();
    const [loadingFail, setLoadingFail] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [laborantinInVoucher, setLaborantinInVoucher] = useState<[SingleLaborantin]>();
    const laborantinWorkingOnTheVoucher = laborantinInVoucher?.find(
        item => item.etat === 1
    )




    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Transfer>();

    async function handleFetchLaborantins() {
        setLoadingLaboranting(true);
        setLoadingFail(false)
        try {
            const response = await callApi(
                true,
                `empservagenda/${user?.matricule_labo}/${user?.matricule_labo}`,
                'get',
                null
            )
            if (response?.data?.success) {
                setLaborantins(response?.data?.data)
                console.log(response?.data?.data);

                setLoadingLaboranting(false);
                setLoadingFail(false)
            } else {
                setLoadingLaboranting(false);
                setLoadingFail(true)
            }
        } catch (error) {
            setLoadingLaboranting(false);
            setLoadingFail(true)
        }
    }



    async function fetchSingleExams() {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                "specificexamens",
                'post',
                {
                    codebon: VoucherId,
                    codelaborentin: user?.matricule
                },
                null
            );
            if (response?.data?.success) {

                setLaborantinInVoucher(
                    response?.data?.data?.laborantins
                );
                setLoading(false);

            } else {
                setLoading(false);

            }
        } catch (error) {
            setLoading(false);
        }
    };



    async function handleTransferVoucher(data: Transfer) {
        setLoadingTransfer(true)
        const request_data = {
            codebon: VoucherId,
            codelabotrentin: data.codelabotrentin
        }
        try {
            const response = await callApi(
                true,
                "transfertexamen",
                "post",
                request_data,
                null
            )

            if (response?.data?.success) {
                setLoadingTransfer(false);
                fetchSingleExam()
                fetchSingleExams()
                notification("success", "Bon d'examen transféré avec succès");
                console.log("dddddd", response?.data);

                dispatch(closeModalReducer());
            } else {
                setLoadingTransfer(false);
                notification("error", "Un problème est survenu lors du transfère, essayez plus tard")
            }
        } catch (error) {
            setLoadingTransfer(false);
            notification("error", "Un problème est survenu lors du transfère, essayez plut tard")
        }
    }



    useEffect(() => {
        if (isMounted) {
            handleFetchLaborantins()
            fetchSingleExams()
        }

        return () => {
            setIsMounted(false)
        }
    }, [isMounted])

    return (
        <div className='transfer-voucher'>
            {loadingLaboranting ?
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
                    {loadingFail ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handleFetchLaborantins}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        <form
                            className='transfer-form'
                            onSubmit={handleSubmit(handleTransferVoucher)}
                        >
                            <div className="messages">
                                <p className="text-message">
                                    Utilisez ce formulaire pour transférer ce bon d'examen à un autre laborantin. Notez qu'une fois que vous confirmez cette action, vous ne pourrez pas ajouter le résultat de l'examen jusqu'à ce que quelqu'un vous le retransfère à nouveau. Assurez-vous donc que tout est bon avant d'effectuer cette action
                                </p>
                                <CgDanger
                                    className='message-icon'
                                />
                            </div>
                            {user?.nomservice === "laboratoire" ?
                                <SelectLaborantinField
                                    id="laborantin"
                                    label="Choisir le laborantin qui va continuer le traitement"
                                    options={
                                        laborantins?.filter(item => item.specialite === user?.specialite).filter(
                                            item => item?.code !== user?.matricule
                                        )}
                                    register={register('codelabotrentin', {
                                        required: "Champ requis"
                                    })}
                                    error={{
                                        for: "laborantin",
                                        text: errors?.codelabotrentin?.message
                                    }}
                                /> :
                                <SelectLaborantinField
                                    id="laborantin"
                                    label="Choisir le laborantin qui va continuer le traitement"
                                    options={
                                        laborantins?.filter(
                                            item => item?.code !== laborantinWorkingOnTheVoucher?.codelaborentin
                                        )
                                    }
                                    register={register('codelabotrentin', {
                                        required: "Champ requis"
                                    })}
                                    error={{
                                        for: "laborantin",
                                        text: errors?.codelabotrentin?.message
                                    }}
                                />
                            }

                            <button
                                className="btn btn-main"
                                type="submit">
                                Transférer mantenant
                                {loadingTransfer &&
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
                        </form>
                    }
                </>
            }
        </div>
    )
}
