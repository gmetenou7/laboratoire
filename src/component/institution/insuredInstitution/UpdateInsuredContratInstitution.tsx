import React, { Fragment } from 'react';
import InputField, { TextAreaField } from "../../utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface InsuredContractInstitution {
    nom: string,
    numberContract: string,
    taux: string,
    description: string,
    matricule_labo: string

}
export const UpdateInsuredContratInstitution = () => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<InsuredContractInstitution>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,
        }
    });



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
                    id="numberContract"
                    label="Adresse"
                    placeholder="Entrer le numero du contrat"
                    register={register("numberContract", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "numberContract", text: errors?.numberContract?.message }}
                />
                <InputField
                    id="taux"
                    label="Taux de reduction %"
                    placeholder="Entrer le taux"
                    register={register("taux", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "taux", text: errors?.taux?.message }}
                />
                <TextAreaField
                    id="description"
                    label="Description du contrat"
                    placeholder="Noter quelques détails sur ce contrat"
                    register={register("description", {
                        required: false
                    })}
                    error={{ for: "description", text: errors?.description?.message }}
                />
                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-main"
                    >Modifier</button>

                </div>
            </form>
        </Fragment>
    )
}
