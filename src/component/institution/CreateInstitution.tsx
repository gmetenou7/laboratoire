import React, { Fragment, useState } from 'react';
import InputField from "../utilities/FormField.tsx";

import { useForm } from 'react-hook-form';
import { emailRegex, passwordRegex, phoneRegex } from '../../Utils/regex';
import { closeModalReducer } from "../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { formatData, notification } from "../../Utils/Utils.tsx";
import { Puff } from 'react-loader-spinner';
import { createInstitutionThunk, 
    listInstitutionThunk, 
    institutionsStatusSelector, 
    institutionsDataSelector, 
    singleInstitutionsStatusSelector,
    updateInstitutionThunk
} from '../../features/institutionSlice.ts';
import { useSelector } from 'react-redux';

interface Institution {
    nom: string,
    email: string,
    telephone: string,
    adresse: string,
    shareinfosornot: boolean,
    codeassureur: string,
    password: string,
    cpassword: string,
    codelabo: string

}
export const CreateInstitution = ({ code }) => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch()
    const institutions = useSelector((state: any) => institutionsDataSelector(state));
    const institutionStatus = useSelector((state: any) => institutionsStatusSelector(state));
    const SingleInstitution = useSelector((state) => singleInstitutionsStatusSelector(state, code)) ;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   // console.log(SingleInstitution);
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Institution>({
        defaultValues: {
            codelabo: user?.matricule_labo,
            //codeassureur: user?.matricule,
            nom: code && SingleInstitution.nom,
            email: code && SingleInstitution.email,
            telephone: code && SingleInstitution.telephone,
            adresse: code && SingleInstitution.adresse,
            shareinfosornot: code && SingleInstitution.shareinformations === 1 ? true : false,
        }
    });

    async function handleCloseCreatecompagny() {
        dispatch(closeModalReducer());
    }

    const handleCreateCompagnyInstitution = async (data: Institution) => {
        setLoading(true)
       
        Object.keys(data).forEach(
             (item) => {
                if (typeof data[item] === "boolean")
                   { if (data[item]=== true){
                        data[item] = 1
                    }else{
                        data[item] = 0
                    }}
            }

        )     
        try {

            const response = await dispatch(
                createInstitutionThunk(data)
            );

            if (response) {
                dispatch(closeModalReducer());
                notification("success", "L'institution a été créé avec succes");
                setLoading(false)
            }
            else {
                notification("error", "Une erreur s'est produite veuiller rééssayer");
            }

        } catch (error) {
           
        }
    }

    async function handleModifyInstitution(data: Institution) {
        setLoading(true)

        Object.keys(data).forEach(
            (item) => {
                if (typeof data[item] === "boolean") {
                    if (data[item] === true) {
                        data[item] = 1
                    } else {
                        data[item] = 0
                    }
                }
            }

        )  
        try {

            const response = await dispatch(
                updateInstitutionThunk({
                    data: data,
                    code: code,
                })
            );

            if (response?.payload.data?.success) {
                dispatch(listInstitutionThunk(user?.matricule_labo))
                dispatch(closeModalReducer());
                notification("success", "L'entreprise a été modifiée avec succes");
                setLoading(false)
            }
            else {
                notification("error", "Une erreur s'est produite veuiller rééssayer");
            }

        } catch (error) {
            console.log("testttt", error);

        }

    }

    return (
       
            <Fragment>
           
            <form
                onSubmit={handleSubmit(code ? handleModifyInstitution : handleCreateCompagnyInstitution)}
             >
            <InputField
                    id="nom"
                    label="Nom de l'Institution"
                    placeholder="Entrer le nom"
                    register={register("nom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "nom", text: errors?.nom?.message }}
                />
                <InputField
                    id="email"
                    type="email"
                    label="Email de l'Institution "
                    placeholder="Entrer l'adresse mail de l'Institution"
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
                    placeholder="Entrer l'adresse"
                    register={register("adresse", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "adresse", text: errors?.adresse?.message }}
                />
                {code ? <span></span>
                    :
                <div className="form-group">
                    <InputField
                        id="password"
                        type="password"
                        label="Mot de passe"
                        placeholder="Entrer un mot de passe"
                        register={register("password", {
                            required: "Ce champ est requis",
                            pattern:{
                                value: passwordRegex,
                                message: "entrer un mot de passe valide"
                            },
                        })}
                        error={{ for: "password", text: errors?.password?.message }}
                    />
                    <InputField
                        id="cpassword"
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        label="Confirmer le mot de passe"
                        register={register("cpassword", {
                            required: "Ce champ est requis",
                        })}
                        error={{ for: "cpassword", text: errors?.cpassword?.message }}

                    />
                </div>
             } 
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
                    {code ? <button
                        type="submit"
                        className="btn btn-main"
                    >
                        Modifier
                        {(institutionStatus.for === "update" && institutionStatus.for === "loading") &&
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
                    >Créer
                        {(institutionStatus.for === "create" && institutionStatus.for === "loading") &&
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
                        }</button>}
                
                    <Link
                        onClick={handleCloseCreatecompagny}
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
