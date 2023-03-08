import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {emailRegex, passwordRegex} from "../../Utils/regex";
import InputField from "../utilities/FormField.tsx";
import { AuthLayout } from "./AuthLayout.tsx";
import { Puff } from "react-loader-spinner";
import * as yup from "yup";
import callApi, { formatData, notification } from "../../Utils/Utils.tsx";
import { yupResolver } from '@hookform/resolvers/yup';


interface FormData {
    email : string,
    first_name:string,
    last_name:string,
    password1: string
    password2: string
}

export function Register() {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //The form validation schema
    const validationSchema = yup.object().shape({
        email: yup.string()
        .required("Ce champ est requis")
        .matches(emailRegex, "Fornir une adresse email conforme"),
        first_name: yup.string()
        .required("Ce champ est requis"),
        last_name: yup.string()
        .required("Ce champ est requis"),
        password1 : yup.string()
        .required("Ce champ est requis")
        .matches(passwordRegex, "Fournir un mot de passe solide"),
        password2: yup.string()
        .required("Ce champ est requis")
        .oneOf([yup.ref("password1")], "Les mots de passe ne corespondent pas")
    });
    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        mode: "all",
        resolver:yupResolver(validationSchema)
    });

    const handleRegister = async (data:FormData) => {
        setLoading(true)

        const request_data = {
            nomemp :data.last_name,
            prenomemp :data.first_name,
            emailemp :data.email,
            passwordemp :data.password1,
            cpasswordemp: data.password2
        }
    
        let response= await callApi(false, 'register', 'post', null, request_data)
        if (response.data.success){
            setLoading(false)
            notification('success', response?.data?.message);
            document.location = "/new-loging"
        }else{
            notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
            setLoading(false)
        }
    };

    const form = <Fragment>
    <form className="form px-60 py-20" onSubmit={handleSubmit(handleRegister)} >
        <InputField
            id = "email"
            label = "Email de connexion"
            type = "email"
            placeholder = "Adresse email"
            register = {register("email")}
            error = {{for :"email", text : errors?.email?.message}}
        />
        <div className="form-group">
            <InputField
                id = "last_name"
                label = "Votre Nom"
                type = "text"
                placeholder = "Entrer votre nom"
                register = {register("last_name")}
                error = {{for :"last_name", text : errors?.last_name?.message}}
            />
            <InputField
                id = "first_name"
                label = "Votre Prénom"
                type = "text"
                placeholder = "Entrer "
                register = {register("first_name")}
                error = {{for :"first_name", text : errors?.first_name?.message}}
            />
        </div>
        <InputField
            id = "password1"
            label = "Mot de passe"
            type = {showPassword? "text":"password"}
            placeholder = "Entrer un mot de passe"
            register = {
                {...register("password1")}
            }
            error = {{for :"password1", text : errors?.password1?.message}}
        />
        
        <InputField
            id = "password2"
            label = "Confirmer mot de passe"
            type = {showPassword? "text":"password"}
            placeholder = "Repeter le mot de passe"
            register = {
                {...register("password2", {
                    required: "Ce champ est requis"
                })}
            }
            error = {{for :"password2", text : errors?.password2?.message}}
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
           Creer un compte 
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

        <div className="form-footer">
            <Link className="first-child" to="/new-loging">J'ai une organisation</Link>
        </div>
    </form>
</Fragment>

    return(
        <AuthLayout form={form} header = "Creer un compte" />
    )
}
