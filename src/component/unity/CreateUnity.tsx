import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputField from "../utilities/FormField.tsx"
import { Puff } from 'react-loader-spinner';
import {formatData, notification} from "../../Utils/Utils.tsx"
import {closeModalReducer} from "../../features/modalSlice.ts"

import { Link } from 'react-router-dom';
import { listUnityThunk, createUnityThunk, updatUntyThunk , singleUnitySelector} from '../../features/unitySlice.ts';

interface Unity {
    codelaboratoire : string,
    nomunite : string,
    matricule : string,
}

export function CreateUnity({unityId}) {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch();
    const unity =useSelector((state)=> state.unity);

    const singleUnity = useSelector(state => singleUnitySelector(state, unityId)) 

   
    
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Unity>({
        defaultValues: {
            codelaboratoire: user?.matricule_labo,
            nomunite: unityId && singleUnity?.unite
        }
     
    });
   
    async function handleCreateUnity(data:Unity) {
        let request_data:any = [];
        request_data.push(data)

        try {
            const response = await dispatch(
                createUnityThunk(data)
            )
            
            if(response.payload.data.success){

                notification("success", response?.payload?.data?.message)
               dispatch(listUnityThunk(user?.matricule_labo));
                dispatch(closeModalReducer());
                
                console.log("ress", response);
                
            }
            else{
                notification("error", formatData(response?.payload?.data?.data) === '' ?
                 response.payload.data.message : formatData(response?.payload?.data?.data));
            }
            
                        
        } catch(error) {
        }
    }

    async function handleUpdateUnity(data:Unity) {
        try {
            const response = await dispatch(
                updatUntyThunk({
                    data : data,
                    id : unityId
                })
            )
            
            if(response.payload.data.success){
                notification("success", response?.payload?.data?.message)
                dispatch(listUnityThunk(user?.matricule_labo));
                dispatch(closeModalReducer());
               
                
            }
            else{
                notification("error", formatData(response?.payload?.data?.data) === '' ? 
                response.payload.data.message : formatData(response?.payload?.data?.data));
            }
            
                        
        } catch(error) {
           
            
        }
    }

    
    async function handleCloseCreateExam() {
        dispatch(closeModalReducer());
    }
    
  return (
    <form
        onSubmit={handleSubmit(
            unityId ? handleUpdateUnity : handleCreateUnity
        )}
    >
        <InputField
            id = "unity"
            label = "Unité"
            placeholder = "Entrer l'unité"
            register = {register("nomunite", {
                required : "Ce champ est requis"
            })}
            error = {{for : "unity", text : errors?.nomunite?.message}}
        />
        <div className="btn-group">
                <button
                    type="submit"
                    className="btn btn-main"
                    >
                        {unityId? "Modifier" : "Ajouter une unité"}
                        {unity?.status === "loading" && 
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
                </button>
                {unity &&
                        <Link
                            onClick={handleCloseCreateExam}
                            to="/exams-family"
                            type="button"
                            className="btn btn-white">
                            Fermer
                        </Link>
                }
         </div>
    </form>
  )
}
