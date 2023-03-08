import React, { Fragment, useEffect, useState } from 'react';
import InputField, {
    GlassSelectField,
    ExamFamilySelectField
} from "../../utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { Puff } from 'react-loader-spinner';

import { useSelector, useDispatch } from 'react-redux';
import {
    updateExamTypeThunk,
    singleExamTypeSelector,
    listExamTypeThunk,
    examTypeDeletedReducer
} from '../../../features/examTypeSlice.ts';
import { closeModalReducer } from '../../../features/modalSlice.ts';
import { Link } from 'react-router-dom';
import callApi, { notification } from "../../../Utils/Utils.tsx";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai"

interface ExamType {
    nom: string,
    prix: string,
    duree: number,
    verrerie: number,
    valeurn: string,
    unite: string,
    matricule_fam: string,
    valeur_reference: string
    ajeuneorno: boolean,
    ajeunornot: number,
}

export function UpdateExamType({ id_exam_type }) {
    const singleExamType: ExamType = useSelector(state => singleExamTypeSelector(state, id_exam_type));
    const [confirmDeleteExamType, setConfirmDeleteExamType] = useState<boolean>(false);
    const [loadingDeleteExamType, setLoadingDeleteExamType] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ExamType>({
        defaultValues: {
            nom: singleExamType?.nom,
            prix: singleExamType?.prix,
            duree: singleExamType?.duree,
            verrerie: singleExamType?.verrerie,
            valeurn: singleExamType?.valeurn,
            unite: singleExamType?.unite,
            valeur_reference: singleExamType?.valeur_reference,
            ajeuneorno: singleExamType?.ajeunornot === 1 ? true : false
        }
    });
    const glassware = useSelector((state: any) => state.glassware.data);
    const examFamily = useSelector((state: any) => state.examFamily);
    const examType = useSelector((state: any) => state.examType);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user") || "");

    async function handleUpdateExamType(data: ExamType) {

        const request_data = {
            matriculelabo: user?.matricule_labo,
            nom: data.nom,
            prix: data.prix,
            dureetraitement: data.duree,
            verre: data.verrerie,
            valeurnormal: data.valeurn,
            unitemesure: data.unite,
            matriculefam: data.matricule_fam,
            ajeuneorno: data.ajeuneorno === true ? 1 : 0
        }

        try {
            const response = await dispatch(updateExamTypeThunk({
                data: request_data,
                matricule: id_exam_type
            })).unwrap();
            if (response?.data?.success) {
                dispatch(listExamTypeThunk());
                dispatch(closeModalReducer());
                notification(
                    "success",
                    "Modification effectuée avec succès"
                )
            } else {
                notification(
                    "error",
                    "Un problème est survenu lors de la modification, essayez plutard"
                )
            }
        } catch (error) {
            notification(
                "error",
                "Un problème est survenu lors de la modification, essayez plutard"
            )
        }
    }

    async function handleCloseModifTypeExam() {
        dispatch(closeModalReducer());
    }

    async function handleDeleteExamType() {
        setLoadingDeleteExamType(true);
        try {
            const response = await callApi(
                true,
                `typeexamen/${id_exam_type}`,
                "delete",
                null
            );
            if (response?.data?.success) {
                dispatch(examTypeDeletedReducer(id_exam_type));
                dispatch(closeModalReducer());
                notification(
                    "success",
                    "Suppression effectuée avec succès"
                )
                setLoadingDeleteExamType(false);
                dispatch(listExamTypeThunk());
            } else {
                notification(
                    "error",
                    "Un problème est survenu lors de la suppression, essayez plutard"
                )
                setLoadingDeleteExamType(false);
                setConfirmDeleteExamType(false);
            }
        } catch (error) {
            dispatch(examTypeDeletedReducer(id_exam_type));
            notification(
                "error",
                "Un problème est survenu lors de la suppression, essayez plutard"
            )
            setLoadingDeleteExamType(false);
            setConfirmDeleteExamType(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleUpdateExamType)}
            className='p-30'>
            <ExamFamilySelectField
                options={examFamily?.data}
                id="type-family"
                type="text"
                label="Type d'examen"
                placeholder="Choisir le type d'examen"
                register={register("matricule_fam", {
                    required: "Ce champ est requis",
                    value: singleExamType.matricule_fam
                })}
                error={{ for: "type-family", text: errors?.matricule_fam?.message }}
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
                register={register("duree", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "type-duration", text: errors?.duree?.message }}
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
                register={register("verrerie", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "type-glass", text: errors?.verrerie?.message }}
            />
            <ExamNormalValue
                examTypeId={id_exam_type}
            />
            <div className="btn-group site-bg modal-footer">
                <button
                    type="submit"
                    className="btn btn-main"
                >
                    modifier ce type
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
                        onClick={handleCloseModifTypeExam}
                        to="/exams-type"
                        className="btn btn-main-blue">
                        Annuler
                    </Link>
                }
                <div
                    className={`btn ${confirmDeleteExamType ? "site-bg" : "btn-danger"}`}
                >
                    {confirmDeleteExamType ?
                        <div className='confirm-delete'>
                            {loadingDeleteExamType ?
                                <span
                                    style={{ color: "black" }}
                                    className='btn bg-white'
                                >
                                    <Puff
                                        height="20"
                                        width="20"
                                        radius={1}
                                        color="#000"
                                        ariaLabel="puff-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </span>
                                :
                                <>
                                    <Link
                                        className='btn-simple btn-danger'
                                        to="#"
                                        onClick={() => handleDeleteExamType()}
                                    >
                                        Confirmé
                                    </Link>
                                    <AiFillCloseCircle
                                        className='cancel'
                                        onClick={() => setConfirmDeleteExamType(false)}
                                    />
                                </>
                            }

                        </div>
                        : <span
                            onClick={() => setConfirmDeleteExamType(true)}
                        >
                            Suprimer
                        </span>}
                </div>
            </div>
        </form>
    )
}

interface NormalValue {
    code: number,
    id: number,
    intitule: string,
    description: string,
    valeurreference1: string,
    valeurreference2: string,
    codeexamen_type: string,
    valeur_reference1: string,
    valeur_reference2: string
    valeur_normal1: string,
    valeur_normal2: string,
    code_type_examen: string,
    valeur_intitule: string,
}

export function ExamNormalValue({ examTypeId }) {
    const [loadingDeleteValue, setLoadingDeleteValue] = useState<boolean>(false);
    const [examNormalValues, setExamNormalValues] = useState<[NormalValue]>();
    const [loadingFetchExam, setLoadingFetchExam] = useState(false);
    const [normalValueToDelete, setNormalValueToDelete] = useState<any>();
    const [showNormalValueForm, setShowNormalValueForm] = useState<boolean>(false);
    const [selectedNormalValue, setSelectedNormalValue] = useState<any>()

    async function handleFetchExamNormalValue() {
        setLoadingFetchExam(true)
        try {
            const response = await callApi(
                true,
                `valeurnormalexam/${examTypeId}`,
                "get",
                null
            )
            if (response?.data?.success) {
                setExamNormalValues(response?.data?.data)
                setLoadingFetchExam(false);
            } else {
                setLoadingFetchExam(false)
            }
        } catch (error) {
            console.log(error);
            setLoadingFetchExam(false)
        }
    };

    async function handleDeleteNormalValue(valueID: number) {
        setLoadingDeleteValue(true)
        try {
            const response = await callApi(
                true,
                `valeurnormal/${valueID}`,
                "delete",
                null
            )
            if (response?.data?.success) {
                const newExamNormalValues: any = examNormalValues?.filter(
                    item => item.code !== valueID
                )
                setExamNormalValues(newExamNormalValues);
                setLoadingDeleteValue(false);
            }
        } catch (error) {
            console.log(console.log(error));
            setLoadingDeleteValue(false);

        }
    }

    function handleAddValueCreated(valueCreated: any) {
        if (examNormalValues?.length === 0) {
            handleFetchExamNormalValue();
            setShowNormalValueForm(false);
        } else {
            examNormalValues?.push(valueCreated);
            setShowNormalValueForm(false);
        }

    }

    function handleSelectNormalValue(valueId: number) {
        const singleNormalValue = examNormalValues?.find(item => item.code === valueId);
        setSelectedNormalValue(singleNormalValue);
        setShowNormalValueForm(true);
    }


    useEffect(() => {
        handleFetchExamNormalValue();
    }, []);


    return (
        <Fragment>
            {loadingFetchExam ?
                <div className='flex-col-center-center mb-20'>
                    <Puff
                        height="40"
                        width="40"
                        radius={1}
                        color="#528F01"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div> :
                <>
                    {!showNormalValueForm &&
                        <div className="site-bg px-30 py-20 mb-20">
                            <h5
                                className='text-20 fw-600'
                            >Valeurs normales</h5>
                            <Link
                                className='btn-simple btn-main mt-20'
                                to="#"
                                onClick={() => {
                                    setShowNormalValueForm(true);
                                }}
                            >
                                Ajouter
                            </Link>

                            <div className={`reference-items ${examNormalValues?.length > 0 && "mt-20"}`}>
                                {examNormalValues?.map((item, index) =>
                                    <>
                                        {normalValueToDelete === item?.code ?
                                            <div
                                                key={index}
                                                className="reference-item remove">
                                                {loadingDeleteValue ?
                                                    <span>Suppression...</span>
                                                    :
                                                    <>
                                                        <button
                                                            className='btn-danger'
                                                            type='button'
                                                            onClick={() => handleDeleteNormalValue(item?.code)}
                                                        >
                                                            Confirmé
                                                        </button>
                                                        <AiFillCloseCircle
                                                            className='cancel'
                                                            onClick={() => setNormalValueToDelete("")}
                                                        />
                                                    </>
                                                }
                                            </div> :
                                            <div key={index} className="reference-item">
                                                <span>{item?.valeur_reference2 && "["}{item.valeur_reference1}{item?.valeur_reference2 && "-"}{item.valeur_reference2}{item?.valeur_reference2 && "]"}</span>
                                                <div className="value-action-icon">
                                                    <FaEdit
                                                        onClick={() => handleSelectNormalValue(item?.code)}
                                                        className='edit'
                                                    />
                                                    <MdDelete
                                                        onClick={() => setNormalValueToDelete(item?.code)}
                                                        className='delete'
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                    }
                    {showNormalValueForm === true &&
                        <NormalValueForm
                            examTypeId={examTypeId && examTypeId}
                            setValueCreated={handleAddValueCreated}
                            hideForm={() => {
                                setShowNormalValueForm(false);
                                setSelectedNormalValue({})
                            }}
                            valueSelected={selectedNormalValue && selectedNormalValue}
                            setValueUpdated={() => {
                                handleFetchExamNormalValue();
                                setShowNormalValueForm(false);
                            }}
                        />
                    }
                </>
            }
        </Fragment>
    )
}

interface Props {
    examTypeId?: any,
    setValueCreated?: any,
    valueSelected?: any,
    hideForm?: any,
    setValueUpdated?: any,
}

function NormalValueForm({ examTypeId, setValueCreated, setValueUpdated, valueSelected, hideForm }: Props) {
    const [loadingCreateValue, setLoadingCreateValue] = useState(false);
    console.log(valueSelected);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<NormalValue>({
        defaultValues: {
            codeexamen_type: examTypeId,
            intitule: valueSelected?.intitule && valueSelected?.intitule,
            description: valueSelected?.description && valueSelected?.description,
            valeurreference1: valueSelected?.valeur_reference1 && valueSelected?.valeur_reference1,
            valeurreference2: valueSelected?.valeur_reference2 && valueSelected?.valeur_reference2,
        }
    });

    async function handleCreateNormalValue(data: NormalValue) {
        setLoadingCreateValue(true);
        try {
            const response = await callApi(
                true,
                "valeurnormal",
                "post",
                null,
                data
            )
            if (response?.data?.success) {
                const value: NormalValue = response?.data?.data;
                const value_to_set: any = {
                    code: value?.id,
                    intitule: value?.valeur_intitule,
                    description: value?.description,
                    valeur_reference1: value?.valeur_normal1,
                    valeur_reference2: value?.valeur_normal2
                }
                setValueCreated(value_to_set);
                setLoadingCreateValue(false);
            } else {
                setLoadingCreateValue(false)
            }
        } catch (error) {
            setLoadingCreateValue(false)
        }
    };

    async function handleUpdateNormalValue(data: NormalValue) {
        setLoadingCreateValue(true)
        const request_data = {
            "intitule": data?.intitule,
            "description": data.description,
            "valeurreference1": data.valeurreference1,
            "valeurreference2": data.valeurreference2,
            "codeexamen_type": examTypeId
        }
        try {
            const response = await callApi(
                true,
                `valeurnormal/${valueSelected?.code}`,
                "put",
                null,
                request_data
            )
            if (response?.data?.success) {
                setLoadingCreateValue(false);
                setValueUpdated()
            }

        } catch (error) {
            console.log(error);
            setLoadingCreateValue(false)
        }
    }

    return (
        <div className="site-bg px-30 py-20 mb-20">
            <h5>Ajouter Valeur normale</h5>
            <form
                className='simple-form mt-20'
            >
                <label
                    className='simple-form-group'
                    htmlFor="intitule">
                    <span>Intitulé</span>
                    <input
                        id="intitule"
                        type="text"
                        className='simple-input-field'
                        {...register("intitule", {
                            required: false
                        })}
                    />
                </label>
                <div className="d-flex gap-5">
                    <label
                        htmlFor="valeurreference1"
                        className='simple-form-group'>
                        <span>Valeur minimale <span
                            style={{
                                color: "#ff5b4f"
                            }}
                        >{errors?.valeurreference1?.message}</span></span>
                        <input
                            id="valeurreference1"
                            type="number"
                            className='simple-input-field'
                            {...register("valeurreference1", {
                                required: "Champ requis"
                            })}
                        />
                    </label>
                    <label
                        htmlFor="valeurreference2"
                        className='simple-form-group'>
                        <span>Valeur maximale<span
                            style={{
                                color: "#ff5b4f"
                            }}
                        >{errors?.valeurreference2?.message}</span></span>
                        <input
                            id="valeurreference2"
                            type="number"
                            className='simple-input-field'
                            {...register("valeurreference2", {
                                required: false
                            })}
                        />
                    </label>
                </div>
                <label
                    className='simple-form-group mt-10'
                    htmlFor="description">
                    <span>Description</span>
                    <textarea
                        id="description"
                        className='simple-textarea'
                        {...register("description", {
                            required: false
                        })}
                    ></textarea>
                </label>
                <div
                    className="btn-group mt-20"
                >
                    <button
                        type="button"
                        className='btn-simple btn-main-blue with-full'
                        onClick={handleSubmit(
                            valueSelected?.code ? handleUpdateNormalValue : handleCreateNormalValue
                        )}
                    >
                        {valueSelected?.code ? "Modifier" : "Ajouter"} {" "}
                        {loadingCreateValue &&
                            <Puff
                                height="15"
                                width="15"
                                radius={1}
                                color="#fff"
                                ariaLabel="puff-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        }
                    </button>
                    <button
                        type='button'
                        className="btn-simple btn-white with-full"
                        onClick={() => hideForm()}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    )
}