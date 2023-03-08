import React, { Fragment } from 'react';
import InputField from "../utilities/FormField.tsx";

import { useForm } from 'react-hook-form';
import { emailRegex, phoneRegex } from '../../Utils/regex';
import {closeModalReducer} from "../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Assurance {
   nom: string,
   email: string,
   telephone: string,
   adresse: string,
   code: number
}
export const UpdateAssurrance = () => {

    console.log("bonjour");
    
    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch =useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Assurance>({
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
                placeholder="Entrer l'adresse email de la compagnie"
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
                    label="Téléphone de la compagnie"
                    placeholder="Entrer le téléphone de la compagnie"
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
                register = {register("nom", {
                  required : "Ce champ est requis"
                    })}
                    error = {{for : "adresse", text : errors?.adresse?.message}}
            />
            <div className="btn-group">
                <button
                    type="submit"
                    className="btn btn-main"
                    >Créer</button>
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
