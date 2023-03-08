import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../utilities/FormField.tsx";
import { AuthLayout } from "./AuthLayout.tsx";
import { Puff } from "react-loader-spinner";
import { emailRegex } from "../../Utils/regex";
import callApi, { formatData, notification } from "../../Utils/Utils.tsx";
import {getAppToken} from "../login/Utils.tsx"


interface FormData {
    email: string
}

export function FindAccount() {

    const router = useNavigate()
    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, formState: {errors}
    } = useForm<FormData>();

    const handleFindAccount = async (data:FormData) => {
        setLoading(true)
        console.log(data);
        let find_user={
            email:data.email,
            
          }
          let token= await getAppToken()
          if(token){

            localStorage.setItem('Apitoken', token)
            let response= await callApi(true, 'getemail', 'post', null, find_user)
            console.log(response)
            
            if (response.data.success){
                setLoading(false)
                notification('success', response.data.message)
                router('/new-verify')
                
                
            }else{
                notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
                setLoading(false)
            }
          }else notification('error', "impossible de générer le token")
         
         

        
    };

    const form = <Fragment>
    <form className="form px-60 py-40" onSubmit={handleSubmit(handleFindAccount)} >
        <InputField
            id = "email"
            label = "Entrez une adresse email"
            type = "email"
            placeholder = "Entrer l'adresse email"
            register = {register("email", {
                required: "Ce champ est requis",
                pattern:{
                    value:emailRegex,
                    message:"Entrer une adresse email valide"
                }
            })}
            error = {{for :"email", text : errors?.email?.message}}
        />
        
        
        <button 
            className={loading ?"btn btn-main disabled" :"btn btn-main" }
            type="submit"
            disabled = {loading}
            >
            Chercher mon compte 
            {loading && <Puff
                height="20"
                width="20"
                radius={1}
                color="#fff"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> }
        </button>
    </form>
</Fragment>

    return(
        <AuthLayout form={form} header = "Trouver mon compte" />
    )
}
