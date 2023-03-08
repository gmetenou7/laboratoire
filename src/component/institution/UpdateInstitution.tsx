import React, { Fragment } from 'react';
import InputField from "../utilities/FormField.tsx";

import { useForm } from 'react-hook-form';
import { emailRegex, phoneRegex } from '../../Utils/regex';
import { closeModalReducer } from "../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Institution {
    nom: string,
    email: string,
    telephone: string,
    adresse: string,
    shareinfosornot: boolean,
    codeassureur: number
}
export const UpdateInstitution = () => {

    console.log("bonjour");

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Institution>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,
        }
    });

    async function handleCloseUpdatecompagny() {
        dispatch(closeModalReducer());
    }

    return (
        <Fragment>
            <form >
                <InputField
                    id="nom"
                    label="Nom de l'Institution"
                    placeholder="Entrer le nom de l'Institution"
                    register={register("nom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "nom", text: errors?.nom?.message }}
                />
                <InputField
                    id="email"
                    type="email"
                    label="Email "
                    placeholder="Entrer l'adresse email de l'Institution"
                    register={register("email", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: emailRegex,
                            message: "Entrer une adresse mail valide"
                        }
                    })}
                    error={{ for: "email", text: errors?.email?.message }}
                />
                <InputField
                    id="telephone"
                    type="text"
                    label="Téléphone de l'Institution"
                    placeholder="Entrer le téléphone de l'Institution"
                    register={register("telephone", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: phoneRegex,
                            message: "Format autorisé: +(code)numéro"
                        }
                    })}
                    error={{ for: "telephone", text: errors?.telephone?.message }}
                />
                <InputField
                    id="adresse"
                    label="Adresse"
                    placeholder="Entrer l'adresse de l'Institution"
                    register={register("adresse", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "adresse", text: errors?.adresse?.message }}
                />
                <label htmlFor="shareinfosornot" className="input-checkbox-group">
                    <input
                        className="checkbox-field"
                        id="shareinfosornot"
                        type="checkbox"
                        {...register('shareinfosornot')}
                    />
                    <div className="checkmark" />
                    <span>Cocher si vous voulez partager les informations</span>
                </label>
                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-main"
                    >Modifier</button>
                    <Link
                        onClick={handleCloseUpdatecompagny}
                        to={`#`}
                        type="button"
                        className="btn btn-white">
                        Fermer
                    </Link>
                </div>
            </form>
        </Fragment>
    )
}
