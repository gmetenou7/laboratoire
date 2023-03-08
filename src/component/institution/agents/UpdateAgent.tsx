import React, { Fragment } from 'react';
import InputField from "../../utilities/FormField.tsx";

import { useForm } from 'react-hook-form';
import { emailRegex, phoneRegex } from '../../../Utils/regex';
import { closeModalReducer } from "../../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Agent {
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    password: string,
    confirmPassword: string,
    code: number
}
export const UpdateAgent = () => {

    console.log("bonjour");

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Agent>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,
        }
    });

    async function handleCloseUpdateAgent() {
        dispatch(closeModalReducer());
    }

    return (
        <Fragment>
            <form >
                <InputField
                    id="nom"
                    label="Nom de l'Agent"
                    placeholder="Entrer le nom"
                    register={register("nom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "nom", text: errors?.nom?.message }}
                />
                <InputField
                    id="prenom"
                    label="Prenom de l'Agent"
                    placeholder="Entrer le prénom"
                    register={register("prenom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "prenom", text: errors?.nom?.message }}
                />
                <InputField
                    id="email"
                    type="email"
                    label="Email de l'Agent "
                    placeholder="Entrer l'adresse mail de l'Agent"
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
                    label="Téléphone de l'Agent"
                    placeholder="Entrer le téléphone de l'Agent"
                    register={register("telephone", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: phoneRegex,
                            message: "Format autorisé: +(code)numéro"
                        }
                    })}
                    error={{ for: "telephone", text: errors?.telephone?.message }}
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
