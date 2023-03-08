import React, { Fragment, useState } from 'react';
import InputField from "../../utilities/FormField.tsx";
import { notification } from "../../../Utils/Utils.tsx"
import { useForm } from 'react-hook-form';
import { emailRegex, phoneRegex } from '../../../Utils/regex';
import {closeModalReducer} from "../../../features/modalSlice.ts";
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createInstitutionThunk,
    singleInsuredCompanySelector,
    updateInstitutionThunk,
    listInstitutionThunk
 } from '../../../features/institutionSlice.ts';
import { Puff } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

interface InsuredCompagnies {
    nom:string,
    email:string,
    telephone:string,
    adresse:string,
    shareinfosornot:boolean ,
    codeassureur: string,
    codelabo:string,
    password:string,
    cpassword:string,
}
export const CreateInsuredCompagny = ({IdCompany, code}) => {
    
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loading, setLoading] = useState(false);
    const dispatch =useDispatch()
    const params = useParams()
    const codeAssureur = params?.code
    const singleInsured = useSelector((state)=>singleInsuredCompanySelector(state, code))
    //console.log(singleInsured);
    
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<InsuredCompagnies>({
        defaultValues: {
            codelabo: user?.matricule_labo,
            codeassureur: code ? singleInsured?.codeassureur : IdCompany,
            nom: code && singleInsured?.nom,
            email: code && singleInsured?.email,
            telephone:code && singleInsured?.telephone,
            adresse:code && singleInsured?.adresse,
            shareinfosornot:code &&  singleInsured?.shareinformations === 1 ? true : false,
            
        }
    });


    async function handleCreateInsuredCompany(data: InsuredCompagnies) {

            setLoading(true)
        let request_data = {
            nom:data.nom,
            email:data.email,
            telephone:data.telephone,
            adresse:data.adresse,
            shareinfosornot: data.shareinfosornot === true ? 1 : 0,
            password:data.password,
            cpassword:data.cpassword,
            codelabo: data.codelabo,
            codeassureur: data.codeassureur
        }
       // console.log(request_data);
       
        
        try {
            
            const response = await dispatch(
                createInstitutionThunk(request_data)
                );

                //console.log("respppppp", response);
                
                if (response) {
                dispatch(listInstitutionThunk({matricule_labo: user?.matricule_labo,
                     code :codeAssureur 
                    }))
                dispatch(closeModalReducer());
                notification("success", "L'entreprise a été créé avec succes");
                setLoading(false)
            }
            else {
                notification("error", "Une erreur s'est produite veuiller rééssayer");
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            
        }
        
    }

     

     async function handleUpdateInsuredCompany(data: InsuredCompagnies) {
            setLoading(true)
        let request_data = {
            nom:data.nom,
            email:data.email,
            telephone:data.telephone,
            adresse:data.adresse,
            shareinfosornot: data.shareinfosornot === true ? 1 : 0,
            password:data.password,
            cpassword:data.cpassword,
            codelabo: data.codelabo,
            codeassureur: data.codeassureur
        }
        //console.log(request_data);
        try {
            
            const response = await dispatch(
                updateInstitutionThunk({
                    data: request_data,
                    code: code
                })
                );
                
                if (response) {
                
                dispatch(closeModalReducer());
                dispatch(listInstitutionThunk({matricule_labo: user?.matricule_labo,
                     code :codeAssureur 
                    }))
                notification("success", "L'entreprise a été modifiée avec succes");
                setLoading(false)
            }
            else {
                notification("error", "Une erreur s'est produite veuiller rééssayer");
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            
        }
        
    }
    async function handleCloseCreatecompagny() {
        dispatch(closeModalReducer());
    }

    
  return (
    <Fragment>
        <form onSubmit={handleSubmit(
            code ? handleUpdateInsuredCompany :
            handleCreateInsuredCompany)}>
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
           
            <div className="grid-2 mt-30 mb-30">
                <label  className="input-checkbox-group">
                    <input
                    className="checkbox-field"
                    id="infoShared"
                    type="checkbox"
                    {...register('shareinfosornot')}
                    />
                    <div className="checkmark" />
                    <span>Partager les Informations ?</span>
                </label>
            </div>
            <div className="btn-group">
                { code ?
                    <button
                    type="submit"
                    className="btn btn-main"
                    >Modifier
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
                    </button>
                    : 
                    <button
                    type="submit"
                    className="btn btn-main"
                    >Créer
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
                    </button>
                }
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
