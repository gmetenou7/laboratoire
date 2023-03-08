import React, { Fragment } from 'react';
import InputField from "../utilities/FormField.tsx";

import { useForm } from 'react-hook-form';
import { emailRegex, phoneRegex } from '../../Utils/regex';
import { closeModalReducer } from "../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Contrat {
    nom: string,
    numero: number,
    description: string,
    tauxReduction: string,
    code: string
}
export const UpdateContratInstitution = () => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Contrat>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,
        }
    });

    async function handleCloseUpdateContrat() {
        dispatch(closeModalReducer());
    }

    return (
        <Fragment>
            <form >
                <InputField
                    id="nom"
                    label="Nom du contrat"
                    placeholder="Entrer le nom"
                    register={register("nom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "nom", text: errors?.nom?.message }}
                />
                <InputField
                    id="Numéro"
                    type="number"
                    label="Numéro du contrat"
                    placeholder="Entrer le numéro du contrat "
                    register={register("numero", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: phoneRegex,
                            message: "Format autorisé: +(code)numéro"
                        }
                    })}
                    error={{ for: "numero", text: errors?.numero?.message }}
                />
                <InputField
                    id="description"
                    label="Description"
                    placeholder="Entrer une description du contrat"
                    register={register("description", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "description", text: errors?.description?.message }}
                />
                <InputField
                    id="tauxReduction"
                    label="Taux en %"
                    placeholder="Entrer un taux de reduction"
                    register={register("tauxReduction", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "tauxReduction", text: errors?.tauxReduction?.message }}
                />

                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-main"
                    >Modifier</button>
                    {/* <Link
                        onClick={handleCloseUpdateAgent}
                        to={`#`}
                        type="button"
                        className="btn btn-white">
                        Fermer
                    </Link> */}
                </div>
            </form>
        </Fragment>
    )
}
