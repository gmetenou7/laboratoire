import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Puff } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import InputField from "../../component/utilities/FormField.tsx";
import {singleServiceSelector} from "../../features/servicesSlice.ts"
import { emailRegex, phoneRegex } from '../../Utils/regex';
import { listServicesThunk } from '../../features/servicesSlice.ts';
import callApi, { notification } from "../../Utils/Utils.tsx";
import { closeModalReducer } from "../../features/modalSlice.ts"

interface Service {
    created_at: string,
    email: string,
    matricule: string,
    matricule_labo: string,
    matricule_ag: string,
    nom: string,
    telephone: string,
    updated_at: string,
    
}
export const UpdateService = ({IdService}) => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const singleService:Service = useSelector((state:any)=> singleServiceSelector(state, IdService ))
    const [loading, setLoading]=useState(false);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Service>({
        defaultValues: singleService
        
    });

    async function handleUpdateService(data: Service) {
        console.log("aaaaaaaaaa", data);
        setLoading(true)
         try {
            const response = await callApi(
                true,
                `service/${singleService?.matricule}`,
                'put',
                data,
                null
            );
            if (response?.data?.success) {
                dispatch(listServicesThunk(user?.matricule_labo))
                notification("success", "Service modiffié avec succès");
                setLoading(false);
                dispatch(closeModalReducer());
                console.log("ressssssss", response);
                
               
            } else {
                notification("error", "Un problème est survenu lors de la modiffication du service");
                setLoading(false);
            }
        } catch (error) {
            
            setLoading(false);
        };
        
        
    }
  return (
    <Fragment>
        <div className="p-30">
            <form 
                onSubmit={handleSubmit(handleUpdateService)}
            >
                <InputField
                    type="text"
                    id="nom"
                    disabled
                    placeholder="modifier le nom du service"
                    label="Nom du service"
                    register= {register("nom")}
                    
                />
                <InputField
                    type="text"
                    id="email"
                    placeholder="modifier l'adresse email du service"
                    label="Email du service"
                    register={register("email", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: emailRegex,
                            message: "Email non valide"
                        }
                    })}
                    error= {{
                        for: "email",
                        text: errors.email?.message
                    }}
                />
                <InputField
                    type="text"
                    id="telephone"
                    
                    placeholder="modifier le nom du service"
                    label="telephone du service"
                    register={register("telephone", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: phoneRegex,
                            message: "numero de téléphone non valide"
                        }
                    })}
                    error= {{
                        for: "telephone",
                        text: errors.telephone?.message
                    }}
                />
                    <button
                            type="submit"
                            className="btn btn-main"
                        >
                            Mettre à jour
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
            </form>
        </div>
    </Fragment>
  )
}
