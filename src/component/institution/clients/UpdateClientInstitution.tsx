import React, { Fragment } from 'react';
import InputField from "../../utilities/FormField.tsx";

import { useForm } from 'react-hook-form';
import { emailRegex, phoneRegex } from '../../../Utils/regex';
import { closeModalReducer } from "../../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Client {
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    fonction: string,
    statutFamilial: string,
    choixEntreprise: string,
    code: number
}
export const UpdateClientInstitution = () => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Client>({
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
                    label="Nom du Client"
                    placeholder="Entrer le nom du Client"
                    register={register("nom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "nom", text: errors?.nom?.message }}
                />
                <InputField
                    id="prenom"
                    label="Prenom du Client"
                    placeholder="Entrer le prénom du Client"
                    register={register("prenom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "prenom", text: errors?.nom?.message }}
                />
                <InputField
                    id="email"
                    type="email"
                    label="Email du Client "
                    placeholder="Entrer l'adresse mail du Client"
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
                    label="Téléphone du Client"
                    placeholder="Entrer le téléphone du Client"
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
                    id="fonction"
                    type="text"
                    label="fonction du client"
                    placeholder="Entrer la fonction du client"
                    register={register("fonction", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: phoneRegex,
                            message: "Format autorisé: +(code)numéro"
                        }
                    })}
                    error={{ for: "fonction", text: errors?.fonction?.message }}
                />
                <InputField
                    id="statutFamilial"
                    type="text"
                    label="Statut Familial du client"
                    placeholder="Entrer le statut familial du client"
                    register={register("statutFamilial", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: phoneRegex,
                            message: "Format autorisé: +(code)numéro"
                        }
                    })}
                    error={{ for: "statutFamilial", text: errors?.statutFamilial?.message }}
                />
                <div className="input-group">
                    <label className="label" htmlFor="id-service">
                        Choisir l'Entreprise
                        <span className="message text-danger">
                            {errors?.choixEntreprise?.message && errors?.choixEntreprise?.message}
                        </span>
                    </label>
                    <select className="form-control" id="exampleSelect1">
                        <option >Choisir</option>
                        <option value="1">AByster</option>
                        <option value="1">Hologram</option>
                    </select>
                </div>

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
