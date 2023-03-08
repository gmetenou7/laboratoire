import React, { Fragment, useState } from 'react';
import InputField from "../utilities/FormField.tsx";
import { notification } from "../../Utils/Utils.tsx"
import { useForm } from 'react-hook-form';
import { emailRegex, passwordRegex, phoneRegex } from '../../Utils/regex';
import { closeModalReducer } from "../../features/modalSlice.ts";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAssuranceCompanyThunk, 
    listAssuranceCompanyThunk,
     assuranceCompanyStatusSelector,
    updateAssuranceCompanyThunk,
    singleAssuranceCompanyStatusSelector
 } from '../../features/assuranceCompanySlice.ts';
import { Puff } from 'react-loader-spinner';
import { useSelector } from 'react-redux';


interface Assurance {
    nom: string,
    email: string,
    telephone: string,
    adresse: string,
    codelaboratoire: string,
    usercreated: string,
    password: string,
    cpassword: string
}

export const CreateAssurrance = ({code}) => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loading, setLoading] = useState(false)
    const assuranceCompany = useSelector((state)=> state.assuranceCompany);
    const assuranceCompanyStatus = useSelector((state:any)=> assuranceCompanyStatusSelector(state))
    const SingleAssurance = useSelector((state) => singleAssuranceCompanyStatusSelector(state, code))  
    const dispatch =useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Assurance>({
        defaultValues: {
            codelaboratoire: user?.matricule_labo, 
             usercreated: user?.matricule,
             nom : code && SingleAssurance.nom,
             email: code && SingleAssurance.email,
             telephone: code && SingleAssurance.telephone,
             adresse: code && SingleAssurance.localisation,
            
             
        }
    });

    async function handleCloseCreatecompagny() {
        dispatch(closeModalReducer());
    }

    async function handleCreatecompagny(data: Assurance) {
       setLoading(true)
        try {

            const response = await dispatch(
                createAssuranceCompanyThunk(data)
            );


            if (response?.payload.data?.success) {
                setLoading(false)
                dispatch(listAssuranceCompanyThunk(user?.matricule_labo))
                dispatch(closeModalReducer());
                notification("success", "L'entreprise a été créé avec succes");
            }
            else {
                setLoading(false)
                notification("error", "Une erreur s'est produite veuiller rééssayer");
            }

        } catch (error) {
            console.log("zzzzzzzz", error);

        }

    }

    async function handleModifycompagny(data: Assurance) {
        setLoading(true)
        try {
            
       const response = await dispatch(
               updateAssuranceCompanyThunk({
                data: data,
                code: code,
               })
                );
            
         if(response?.payload.data?.success){
            setLoading(false)
           dispatch(listAssuranceCompanyThunk(user?.matricule_labo))
           dispatch(closeModalReducer());
            notification("success", "L'entreprise a été modifiée avec succes");
         }  
         else{
            notification("error", "Une erreur s'est produite veuiller rééssayer");
            setLoading(false)
         }     
                
        } catch (error) {
            console.log("zzzzzzzz", error);
            
        }
        
    }

  return (
    <Fragment>
        <form onSubmit={handleSubmit(code ? handleModifycompagny : handleCreatecompagny)}>
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
                placeholder="Entrer l'adresse mail de la compagnie"
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
                            type="text"
                            label="Mot de passe"
                            placeholder="Entrer un mot de passe"
                            register={register("password", {
                                required: "Ce champ est requis",
                            })}
                            error={{ for: "password", text: errors?.password?.message }}
                        />
                        <InputField
                            id="cpassword"
                            type="text"
                            placeholder="Confirmer le mot de passe"
                            label="Confirmer le mot de passe"
                            register={register("cpassword", {
                                required: "Ce champ est requis",

                            })}
                            error={{ for: "cpassword", text: errors?.cpassword?.message }}

                        />
                    </div>
                } 
            <div className="btn-group">
                   {code ? <button
                        type="submit"
                        className="btn btn-main"
                    >
                         Modifier 
                       {loading &&
                            <Puff
                                height="20"
                                width="20"
                                radius={1}
                                color="#fff"
                                ariaLabel="puff-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />}
                    </button> : 
                     <button
                        type="submit"
                        className="btn btn-main"
                    >
                        Créer
                       {loading &&
                            <Puff
                                height="20"
                                width="20"
                                radius={1}
                                color="#fff"
                                ariaLabel="puff-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />}
                    </button> }
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
