import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import InputField from "../../utilities/FormField.tsx";
import { Puff } from 'react-loader-spinner';
import {formatData, notification} from "../../../Utils/Utils.tsx"
import { closeModalReducer } from '../../../features/modalSlice.ts';
import { listExamFamilyThunk, updateExamFamilyThunk } from '../../../features/examFamilySlice.ts';
import  singleExamFamilySelector from "../../../features/examFamilySlice.ts"


interface ExamFamily {
    matricule_labo : string,
    nom : string,
}

export function UpdateExamFamily(idExamFamily) {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const examFamily = useSelector(state => state.examFamily);
    //const singleExamFamily = useSelector(state => singleExamFamilySelector(state, id_exam_family))  

    const singleExamFamily = examFamily?.data?.find(item=> item.matricule === idExamFamily)
    
    
    console.log("aaaaaaaaaa", singleExamFamily);
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ExamFamily>({defaultValues: singleExamFamily});
   
    // defaultValues: {
    //     matricule_labo: user?.matricule_labo ? user.matricule_labo : "22-13120"
    // // }
    

    async function handleUpdateExamFamily(data:ExamFamily) {
        let request_data= {
            matricule_labo: user?.matricule_labo ,
            nom: data.nom
        };
        
        console.log("fammm", request_data);

        
        try {
            const response = await dispatch(
                updateExamFamilyThunk({
                    data : request_data,
                    matricule: id_exam_family
                })
            )
            if(response.payload.data.success){

                notification("success", response?.payload?.data?.message)
                dispatch(listExamFamilyThunk(user?.matricule_labo));
                dispatch(closeModalReducer());
                
            }
            else{
                notification("error", formatData(response?.payload?.data?.data) === '' ? response.payload.data.message : formatData(response?.payload?.data?.data));
            }
            
                        
        } catch(error) {
           
        }
        
    }
    
  return (
    <form
        onSubmit={handleSubmit(handleUpdateExamFamily)}
    >
        <InputField
            id = "family-name"
            label = "Nom du type"
            placeholder = "Entrer le nom du type"
            register = {register("nom", {
                required : "Ce champ est requis"
            })}
            error = {{for : "family-name", text : errors?.nom?.message}}
        />
        <button
            type="submit"
            className="btn btn-main"
            >
                Modifier  un type
                {examFamily?.status === "loading" && 
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
    </form>
  )
}
