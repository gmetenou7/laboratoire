import React from 'react';
import InputField, {
    GlassSelectField,
    ExamFamilySelectField
} from "../../utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { Puff } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { createExamTypeThunk } from '../../../features/examTypeSlice.ts';
import { listExamTypeThunk } from '../../../features/examTypeSlice.ts';
import { closeModalReducer } from '../../../features/modalSlice.ts';
import { Link } from 'react-router-dom';
import { notification } from "../../../Utils/Utils.tsx"

interface ExamType {
    nom: string,
    prix: string,
    dureetraitement: number,
    verre: number,
    valeurnormal: string,
    unitemesure: string,
    matriculefam: string
    ajeuneorno: boolean
}

export function CreateExamType() {
    const { register, handleSubmit, formState: { errors } } = useForm<ExamType>();
    const glassware = useSelector((state: any) => state.glassware.data);
    const examFamily = useSelector((state: any) => state.examFamily);
    const examType = useSelector((state: any) => state.examType);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user") || "")

    async function handleCreateExam(data: ExamType) {
        const request_data = {
            nom: data?.nom,
            prix: data.prix,
            dureetraitement: data.dureetraitement,
            verre: data.verre,
            matriculefam: data.matriculefam,
            ajeuneorno: data.ajeuneorno === true ? 1 : 0,
            matriculelabo: user?.matricule_labo
        }
        try {
            const response = await dispatch(createExamTypeThunk(request_data)).unwrap();
            if (response?.data?.success) {
                dispatch(listExamTypeThunk());
                dispatch(closeModalReducer())
                notification(
                    "success",
                    "Enregistrement de l'examen effectué avec succès"
                )
            } else {
                notification(
                    "error",
                    "Un problème survenu lors de la création de l'examen, vous pouvez essayer de nouveau ultérieurement"
                )
            }
        } catch (error) {
            notification(
                "error",
                "Un problème survenu lors de la création de l'examen, vous pouvez essayer de nouveau ultérieurement"
            )
        }
    }

    async function handleCloseCreateTypeExam() {
        dispatch(closeModalReducer());
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateExam)}
            className='p-30'>
            <ExamFamilySelectField
                options={examFamily?.data}
                id="type-family"
                type="text"
                label="Type d'examen"
                placeholder="Choisir le type d'examen"
                register={register("matriculefam", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "type-family", text: errors?.matriculefam?.message }}
            />
            <InputField
                id="type-name"
                type="text"
                label="Nom de l'examen"
                placeholder="Entrer le nom de l'examen"
                register={register("nom", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "type-name", text: errors?.nom?.message }}
            />
            <InputField
                id="type-price"
                type="text"
                label="Prix"
                placeholder="Entrer le prix pour ce type d'examen"
                register={register("prix", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "type-price", text: errors?.prix?.message }}
            />
            <InputField
                id="type-duration"
                type="text"
                label="Durée de traitement"
                placeholder="Entrer la durée de traitement"
                register={register("dureetraitement", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "type-duration", text: errors?.dureetraitement?.message }}
            />

            <label htmlFor="clientajeun" className="input-checkbox-group">
                <input
                    className="checkbox-field"
                    id="clientajeun"
                    type="checkbox"
                    {...register('ajeuneorno')}
                />
                <div className="checkmark" />
                <span>Cocher si l'examen se fait à jeûne</span>
            </label>

            <GlassSelectField
                options={glassware}
                id="type-glass"
                type="text"
                label="Tube à utiliser"
                placeholder="Choisir le tube à utiliser"
                register={register("verre", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "type-glass", text: errors?.verre?.message }}
            />
            <div className="btn-group">
                <button
                    type="submit"
                    className="btn btn-main"
                >
                    Ajouter un type
                    {examType?.status === "loading"
                        && <Puff
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
                {examType &&
                    <Link
                        onClick={handleCloseCreateTypeExam}
                        to="/exams-type"
                        type="button"
                        className="btn btn-white">
                        Fermer
                    </Link>
                }
            </div>
        </form>
    )
} 
