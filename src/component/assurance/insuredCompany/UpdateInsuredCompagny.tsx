import React, { Fragment } from 'react';
import InputField from "../../utilities/FormField.tsx";

import { useForm } from 'react-hook-form';
import { emailRegex, phoneRegex } from '../../../Utils/regex';
import {closeModalReducer} from "../../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface InsuredCompagnies {
    nom: string,
    email: string,
    infoShared: string,
    telephone: string,
    code: string,
    adresse: string
}
export const UpdateInsuredCompagny = () => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch =useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<InsuredCompagnies>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,  
        }
    });

    async function handleCloseUpdateInsuredcompagny() {
        dispatch(closeModalReducer());
    }

  return (
    <Fragment>
        <form >
            <InputField
                id = "nom"
                label = "Nom compagnie d'assurance"
                placeholder = "Entrer le nom"
                register = {register("nom", {
                    required : "Ce champ est requis"
                })}
                error = {{for : "nom", text : errors?.nom?.message}}
            />
            <InputField
                id="email"
                type="email"
                label="Email "
                placeholder="Entrer l'adresse mail"
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
                    label="Téléphone de l'entreprise"
                    placeholder="Entrer le téléphone "
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
                 id = "adresse"
                label = "Adresse"
                placeholder = "Entrer l'adresse"
                register = {register("adresse", {
                  required : "Ce champ est requis"
                    })}
                    error = {{for : "adresse", text : errors?.adresse?.message}}
            />
            <div className="grid-2 mt-30 mb-30">
                <label  className="input-checkbox-group">
                    <input
                    className="checkbox-field"
                    id="infoShared"
                    type="checkbox"
                    {...register('infoShared')}
                    />
                    <div className="checkmark" />
                    <span>Partager les Informations ?</span>
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="submit"
                    className="btn btn-main"
                    >Créer</button>
                <Link
                    onClick={handleCloseUpdateInsuredcompagny}
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
