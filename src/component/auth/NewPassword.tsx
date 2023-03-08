import React, { useState, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {passwordRegex} from "../../Utils/regex";
import * as yup from "yup";
import InputField from "../utilities/FormField.tsx";
import { AuthLayout } from "./AuthLayout.tsx";
import { Puff } from "react-loader-spinner";
import { yupResolver } from '@hookform/resolvers/yup';
import callApi, { formatData, notification } from "../../Utils/Utils.tsx";
import {getAppToken} from "../login/Utils.tsx"



interface FormData {
    password: string,
    confirm_password: string
}

export function NewPassword() {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [codeEmp, setCodeEmp]=useState('')
		const router = useNavigate()

		const initcode=()=>{
			let codes: any = localStorage.getItem("codeEmploye")
			//let code:any = JSON.parse(codes)
			setCodeEmp(codes)
		  }

    const validationScheman = yup.object().shape({
        
        password : yup.string()
        .required("Ce champ est requis")
        .matches(passwordRegex, "Fournir un mot de passe solide")
        .oneOf([yup.ref("password2")], "Les mots de passe ne corespondent pas"),
        confirm_password: yup.string()
        .required("Ce champ est requis")
        .oneOf([yup.ref("password1")], "Les mots de passe ne corespondent pas")
    })
    const {
        register, 
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<FormData>({
        mode: "all",
        resolver:yupResolver(validationScheman)
    });
   

    const handleCreateNewPassword = async (data:FormData) => {
        setLoading(true)
        console.log(data);
        let NewPassWord={
            password:data.password,
            cpassword:data.confirm_password,
            empcode:codeEmp
            
          }
          let token= await getAppToken()
          if(token){
           

            localStorage.setItem('Apitoken', token)
            let response= await callApi(true, 'passwordempupdate', 'post', null, NewPassWord)
            console.log(response)

            if (response.data.success){
                setLoading(false)
                notification('success', response.data.message)
                router('/new-loging')
                
                
            }else{
                notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
                setLoading(false)
            }
          }else{
                notification('error', "Erreur de connexion veuillez réessayer")
                setLoading(false) 
          } 
         
         
          console.log('user', NewPassWord)
        
    };

    useEffect(()=>{
		initcode()
	  }, [])
    const form = <Fragment>
    <form className="form px-60 py-60" onSubmit={handleSubmit(handleCreateNewPassword)} >
    <InputField
            id = "password"
            label = "Nouveau Mot de passe"
            type = {showPassword? "text":"password"}
            placeholder = ""
            register = {
                {...register("password")}
            }
            error = {{for :"password", text : errors?.password?.message}}
        />
        
        <InputField
            id = "confirm_password"
            label = "Confirmer mot de passe"
            type = {showPassword? "text":"password"}
            placeholder = ""
            register = {
                {...register("confirm_password", {
                    required: "Ce champ est requis"
                })}
            }
            error = {{for :"confirm_password", text : errors?.confirm_password?.message}}
        />
        <label htmlFor="show-password" className="input-checkbox-group">
            <input
                className="checkbox-field"
                id="show-password"
                type="checkbox" 
                onClick={() => setShowPassword(!showPassword)}
            />
            <div className="checkmark" />
            <span>Mot de passe visible</span>
        </label>
        
        
        <button 
            className={loading ?"btn btn-main disabled" :"btn btn-main" }
            type="submit"
            disabled = {loading}
            >
            Confirmer 
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
        <AuthLayout form={form} header = "Créer un nouveau Mot de passe" />
    )
}
