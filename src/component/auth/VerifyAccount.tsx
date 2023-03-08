import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../utilities/FormField.tsx";
import { AuthLayout } from "./AuthLayout.tsx";
import { Puff } from "react-loader-spinner";
import callApi, { formatData, notification } from "../../Utils/Utils.tsx";
import {getAppToken} from "../login/Utils.tsx"


interface FormData {
    otp: string
}

export function VerifyAccount() {

    const router = useNavigate()
    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, formState: {errors}
    } = useForm<FormData>();

    const handleVerifyAccount = async (data:FormData) => {
        setLoading(true)
        console.log(data);
        let codes={
            codeverifcation:data.otp,
            
          }
          let token= await getAppToken()
          if(token){
            

            localStorage.setItem('Apitoken', token)
            let response= await callApi(true, 'getcode', 'post', null, codes)
        
            if (response.data.success){
                setLoading(false)
                notification('success', response.data.message)
                localStorage.setItem('codeEmploye', response.data.employecode)
                router('/new-create-new-password')
                
                
            }else{
                notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
                setLoading(false)
            }
          }else {

            setLoading(false)
            notification('error', "Erreur de connexion veuillez réessayer")
          }

         
          console.log('user', codes)
        
    };

    const form = <Fragment>
    <form className="form px-60 py-60" onSubmit={handleSubmit(handleVerifyAccount)} >
        <InputField
            id = "otp"
            label = "Code de verification"
            type = "otp"
            placeholder = "Entrer le code"
            register = {register("otp", {
                required: "Ce champ est requis",
            })}
            error = {{for :"otp", text : errors?.otp?.message}}
        />
        
        
        <button 
            className={loading ?"btn btn-main disabled" :"btn btn-main" }
            type="submit"
            disabled = {loading}
            >
            Verifier 
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
        <AuthLayout form={form} header = "Verifier mon compte" />
    )
}
