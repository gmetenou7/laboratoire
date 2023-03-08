import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputField from "../../utilities/FormField.tsx";
import { Puff } from 'react-loader-spinner';
import { formatData, notification } from "../../../Utils/Utils.tsx"
import { closeModalReducer } from '../../../features/modalSlice.ts';
import {
    listExamFamilyThunk,
    updateExamFamilyThunk,
    createExamFamilyThunk
} from '../../../features/examFamilySlice.ts';
import {
    listBigFamilyExamThunk,
    bigFamilyExamSelector,
    bigFamilyExamStatusSelector
} from "../../../features/examBigFamilySlice.ts";
import { Link } from 'react-router-dom';

interface ExamFamily {
    matricule_labo: string,
    nom: string,
    matricule: string,
    codebfamille: number
}

interface BigExamsFamily {
    code: number;
    nomfmaille: string;
    creerle: string;
    modifier: string;
}

export function CreateExamFamily({ examFamilyId }) {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch();
    const examFamily = useSelector((state: any) => state.examFamily);
    const singleExamFamily = examFamily?.data?.find(
        (item: any) => item.matricule === examFamilyId
    )

    const newSingleExamFamily = {
        codebfamille: String(singleExamFamily?.codebigfamille),
        nom: singleExamFamily?.nom
    }

    const bigfamilyExam = useSelector(
        (state: any) => bigFamilyExamSelector(state)
    );
    const bigFamilyExamStatus = useSelector(
        (state: any) => bigFamilyExamStatusSelector(state)
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ExamFamily>({
        defaultValues: examFamilyId && newSingleExamFamily
    });

    async function handleCreateExamFamily(data: ExamFamily) {
        const newData = {
            nom: data.nom,
            codebfamille: Number(data.codebfamille),
            matricule_labo: user?.matricule_labo
        }
        let request_data: any = [];
        request_data.push(newData)
        try {
            const response = await dispatch(
                createExamFamilyThunk({ "datas": request_data })
            )
            if (response.payload.data.success) {

                notification("success", response?.payload?.data?.message)
                dispatch(listExamFamilyThunk(user?.matricule_labo));
                dispatch(closeModalReducer());

            }
            else {
                notification("error", formatData(response?.payload?.data?.data) === '' ? response.payload.data.message : formatData(response?.payload?.data?.data));
            }
        } catch (error) {
        }
    }

    async function handleUpdateExamFamily(data: ExamFamily) {
        const newData = {
            nom: data.nom,
            codebfamille: Number(data.codebfamille),
            matricule_labo: user?.matricule_labo
        }
        try {
            const response = await dispatch(
                updateExamFamilyThunk({
                    data: newData,
                    matricule: examFamilyId
                })
            )
            if (response.payload.data.success) {
                notification("success", response?.payload?.data?.message)
                dispatch(listExamFamilyThunk(user?.matricule_labo));
                dispatch(closeModalReducer());
            }
            else {
                notification("error", formatData(response?.payload?.data?.data) === '' ? response.payload.data.message : formatData(response?.payload?.data?.data));
            }


        } catch (error) {
        }
    }

    async function fetchBigFamilyExam() {
        try {
            await dispatch(listBigFamilyExamThunk(user?.matricule_labo)
            ).unwrap()
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        (bigFamilyExamStatus.for === "idle" && bigFamilyExamStatus.state === "idle") && fetchBigFamilyExam()
    }, [bigFamilyExamStatus])

    return (
        <form
            onSubmit={handleSubmit(
                examFamilyId ? handleUpdateExamFamily : handleCreateExamFamily
            )}
        >
            <div className="input-group">
                <label className="label" htmlFor="id-service">
                    Nom de la famille
                    <span className="message text-danger">
                        {errors?.codebfamille?.message && errors?.codebfamille?.message}
                    </span>
                </label>
                <select
                    className="input-field"
                    {...register("codebfamille", {
                        required: "Champ requis"
                    })}
                >
                    <option disabled value="">Choisir une famille</option>
                    {bigfamilyExam?.map((option: any, index: number) => (

                        <option
                            value={option?.code}
                            key={index}
                        >
                            {option.nomfmaille}

                        </option>
                    ))}
                </select>
            </div>
            <InputField
                id="family-name"
                label="Nom du type"
                placeholder="Entrer le nom du type"
                register={register("nom", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "family-name", text: errors?.nom?.message }}
            />




            <div className="btn-group">
                <button
                    type="submit"
                    className="btn btn-main"
                >
                    {examFamilyId ? "Modifier" : "Ajouter un type"}
                    {examFamily?.status === "loading" &&
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
                {examFamily &&
                    <Link
                        onClick={() => dispatch(closeModalReducer())}
                        to="#"
                        type="button"
                        className="btn btn-white">
                        Fermer
                    </Link>
                }
            </div>
        </form>
    )
}