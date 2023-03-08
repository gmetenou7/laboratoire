import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputField from "../../utilities/FormField.tsx";
import { Puff } from 'react-loader-spinner';
import {
    createBigFamilyExamThunk,
    bigFamilyExamStatusSelector,
    singleBigFamilyExamSelector,
    updateBigFamilyExamThunk,
    listBigFamilyExamThunk
} from "../../../features/examBigFamilySlice.ts";
import { formatData, notification } from "../../../Utils/Utils.tsx"
import { closeModalReducer } from "../../../features/modalSlice.ts"
import { useSelector } from "react-redux";


interface BigExamsFamily {
    code: number;
    nomfamille: string;
    creerle: string;
    modifier: string;
}

export const CreateBigFamilyExam = ({ codeId }) => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const bigFamilyExamStatus = useSelector(
        (state: any) => bigFamilyExamStatusSelector(state)
    );
    const singleBigFamilyExam = useSelector(state => singleBigFamilyExamSelector(state, codeId))
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BigExamsFamily>({
        defaultValues: {
            codelaboratoire: user?.matricule_labo,
            nomfamille: codeId && singleBigFamilyExam?.nomfmaille

        }

    });

    async function handleCreateBigFamilyExam(data: BigExamsFamily) {

        try {
            const response = await dispatch(createBigFamilyExamThunk(data)
            )
            if (response.payload.data.success) {
                notification("success", response?.payload?.data?.message)
                dispatch(listBigFamilyExamThunk(user?.matricule_labo));
                dispatch(closeModalReducer());
            }
            else {
                notification("error", formatData(response?.payload?.data?.data) === '' ?
                    response.payload.data.message : formatData(response?.payload?.data?.data));
            }

        }
        catch (error) {

        }
    }

    async function handleUpdateBigFamilyExam(data: BigExamsFamily) {

        try {
            const response = await dispatch(
                updateBigFamilyExamThunk({
                    data: data,
                    code: codeId
                })
            )

            if (response.payload.data.success) {
                notification("success", response?.payload?.data?.message)
                dispatch(listBigFamilyExamThunk(user?.matricule_labo));
                dispatch(closeModalReducer());
            }
            else {
                notification("error", formatData(response?.payload?.data?.data) === '' ?
                    response.payload.data.message : formatData(response?.payload?.data?.data));
            }
        }
        catch (error) {

        }
    }



    return (
        <Fragment>
            <form onSubmit={handleSubmit(codeId ? handleUpdateBigFamilyExam : handleCreateBigFamilyExam)} >
                <InputField
                    id="family-name"
                    label="Nom de la famille"
                    placeholder="Entrer le nom de la famille"
                    register={register("nomfamille", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "family-name", text: errors?.nomfamille?.message }}
                />
                <div className="btn-group">
                    {codeId ?
                        <button
                            type="submit"
                            className="btn btn-main"
                        > Modifier une famille

                            {(bigFamilyExamStatus.for === "update" && bigFamilyExamStatus.state === "loading") &&
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
                        </button> :

                        <button
                            type="submit"
                            className="btn btn-main"
                        > Créer une famille

                            {(bigFamilyExamStatus.for === "create" && bigFamilyExamStatus.state === "loading") &&
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
                    }
                </div>

            </form>

        </Fragment>
    )
}