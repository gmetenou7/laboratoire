import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Puff } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
import { emailRegex, passwordRegex, phoneRegex } from '../../Utils/regex';
import callApi, { notification, formatData } from "../../Utils/Utils.tsx"
import InputField from "../utilities/FormField.tsx";
import { useDispatch } from 'react-redux';

import {
    listAgenciesThunk,
    agencyStatusSelector,
    agenciesSelector
} from "../../features/agencySlice.ts";
import {
    listBigFamilyExamThunk,
    bigFamilyExamSelector,
    bigFamilyExamStatusSelector
} from "../../features/examBigFamilySlice.ts";
import {
    listServicesThunk,
    servicesSelector,
    servicesStatusSelector
} from "../../features/servicesSlice.ts";
import { useSelector } from 'react-redux';

interface Employee {
    code: string,
    matricule_ag: string,
    matricule_serv: string,
    nom: string,
    prenom: string,
    email: string,
    phone: string,
    fonction: string,
    password: string,
    cpassword: string,
    specialite: string,
    codespecialite: string,
    chefservice: boolean,
    chef: number,
}

interface Service {
    email: string,
    matricule: string,
    agence: string,
    matricule_labo: string,
    nom: string,
    telephone: string,
    updated_at: string,
    created_at: string,
    matricule_ag: string
}

interface Agency {
    email: string,
    matricule: string,
    matricule_labo: string,
    nom: string,
    pays: string,
    region: string,
    rue: string,
    telephone: string,
    ville: string,
    updated_at: string,
    created_at: string
}

interface Props {
    singleEmployee: Employee,
    fetchSingleEmployee: any
}


export default function UpdateEmployeeForm({
    singleEmployee,
    fetchSingleEmployee
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<Employee>({
        defaultValues: {
            nom: singleEmployee?.nom,
            prenom: singleEmployee?.prenom,
            email: singleEmployee?.email,
            phone: singleEmployee?.phone,
            matricule_ag: singleEmployee?.matricule_ag,
            matricule_serv: singleEmployee?.matricule_serv,
            specialite: singleEmployee?.specialite,
            chefservice: singleEmployee?.chef === 1 ? true : false,
        }
    })
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch();

    const agencyStatus: string = useSelector(
        (state: any) => agencyStatusSelector(state)
    );
    const agenciesList: [Agency] = useSelector(
        (state: any) => agenciesSelector(state)
    );
    const serviceStatus: string = useSelector(
        (state: any) => servicesStatusSelector(state)
    );
    const servicesList: [Service] = useSelector(
        (state: any) => servicesSelector(state)
    );
    const [singleService, setSingleService] = useState<Service>();

    const bigFamilyExamStatus = useSelector(
        (state: any) => bigFamilyExamStatusSelector(state)
    );
    const bigFamilyExam = useSelector(
        (state: any) => bigFamilyExamSelector(state)
    );
    const watchFormData: Employee = watch();


    async function handleFetchService() {

        try {
            const response = await dispatch(
                listServicesThunk(user?.matricule_labo)
            ).unwrap();

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    async function handleFetchAgencies() {
        try {
            const response = await dispatch(
                listAgenciesThunk(user?.matricule_labo)
            ).unwrap()
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };
    async function handleFetchBigFamilyExam() {
        try {
            await dispatch(
                listBigFamilyExamThunk(user?.matricule_labo)
            )
        }
        catch (error) {
        }
    };

    useEffect(() => {
        agencyStatus === "idle" && handleFetchAgencies();
        serviceStatus === "idle" && handleFetchService();
        (bigFamilyExamStatus.for === "idle" && bigFamilyExamStatus.state === "idle") && handleFetchBigFamilyExam();

        const subscription = watch((data) => {
            setSingleService(servicesList?.find(item => item.matricule === data?.matricule_serv))
        });
        return () => subscription.unsubscribe();
    }, [agencyStatus, serviceStatus]);

    const handleUpdateEmployees = async (data: Employee) => {
        setLoading(true);
        const request_data = {
            "nom": data.nom,
            "prenom": data.prenom,
            "telephone": data.phone,
            "matricule_serv": data.matricule_serv,
            "matricule_ag": data.matricule_ag,
            "email": data.email,
            "specialite": bigFamilyExam?.find((item: any) => item.nomfmaille === data.specialite)?.code,
            "chefservice": data?.chefservice === true ? 1 : 0,

        }
        try {
            const response = await callApi(
                true,
                `employe/${singleEmployee?.code}`,
                "put",
                request_data,
                null
            )
            if (response?.data?.success) {
                notification("success", "L'employé a été modifié avec succes");
                fetchSingleEmployee()

                setLoading(false);
                console.log(response)
            } else {
                setLoading(false)
                notification("error", "Une erreur est survenu lors de la modification");
            }
        } catch (error) {
            setLoading(false)
            notification("error", "Une erreur est survenu lors de la modification");
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(handleUpdateEmployees)}>
                <InputField
                    id="first_name"
                    type="text"
                    label="Nom "
                    placeholder="Entrer le nom de l'employé"
                    register={register("nom", {
                        required: "Ce champ est requis"
                    })}

                    error={{ for: "first_name", text: errors?.nom?.message }}
                />
                <InputField
                    id="last_name"
                    type="text"
                    label="Prénom "
                    placeholder="Entrer le prénom de l'employé"
                    register={register("prenom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "last_name", text: errors?.prenom?.message }}
                />
                <div className="form-group">
                    <InputField
                        id="email"
                        type="email"
                        label="Email "
                        placeholder="Entrer l'adresse email de l'employé"
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
                        label="Téléphone de l'employé"
                        placeholder="Entrer le téléphone de l'employé"
                        register={register("phone", {
                            required: "Ce champ est requis",
                            pattern: {
                                value: phoneRegex,
                                message: "Format autorisé: +(code)numéro"
                            }
                        })}
                        error={{ for: "telephone", text: errors?.phone?.message }}
                    />
                </div>

                {
                    (serviceStatus === "loading" || agencyStatus === "loading" || (bigFamilyExamStatus.for === "list" && bigFamilyExamStatus.state === "loading")) ?
                        <div className="p-30">
                            <Puff
                                height="20"
                                width="20"
                                radius={1}
                                color="#528F01"
                                ariaLabel="puff-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div> :
                        <>
                            <div className="form-group">
                                <div className="input-group">
                                    <label className="label" htmlFor="id-service">
                                        Agence
                                        <span className="message text-danger">
                                            {errors?.matricule_ag?.message && errors?.matricule_ag?.message}
                                        </span>
                                    </label>
                                    <select
                                        className="input-field"
                                        {...register("matricule_ag", {
                                            required: "Champ requis"
                                        })}
                                    >
                                        <option disabled value="">Choisir l'agence</option>
                                        {agenciesList?.map((option, index) => (
                                            <option
                                                value={option?.matricule}
                                                key={index}>
                                                {option.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="label" htmlFor="id-service">
                                        Service
                                        <span className="message text-danger">
                                            {errors?.matricule_serv?.message && errors?.matricule_serv?.message}
                                        </span>
                                    </label>
                                    <select
                                        className="input-field"
                                        {...register("matricule_serv", {
                                            required: "Champ requis"
                                        })}
                                    >
                                        <option disabled value="">Choisir le service</option>
                                        {servicesList?.filter((item) => item?.matricule_ag === watchFormData.matricule_ag).map((option, index) => (
                                            <option
                                                value={option?.matricule}
                                                key={index}>
                                                {option.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {(singleService?.nom === "laboratoire" || singleEmployee?.specialite) &&
                                    <div className="input-group">
                                        <label className="label" htmlFor="id-specialty">
                                            Spécialité
                                            <span className="message text-danger">
                                                {errors?.specialite?.message && errors?.specialite?.message}
                                            </span>
                                        </label>
                                        <select
                                            className="input-field"
                                            {...register("specialite", {
                                                required: "Champ requis",
                                                value: singleEmployee?.codespecialite
                                            })}
                                        >
                                            <option disabled value="">Spécialité</option>
                                            {bigFamilyExam?.map((option: any, index: number) => (
                                                <option
                                                    selected={option?.code === singleEmployee?.codespecialite}
                                                    value={option?.codespecialite}
                                                    key={index}>
                                                    {option.nomfmaille}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                }
                            </div>
                            {(singleService?.nom === "laboratoire" || singleEmployee?.specialite) &&
                                <label
                                    style={{
                                        marginTop: "-25px",
                                        marginBottom: "20px"
                                    }}
                                    htmlFor="clientajeun" className="input-checkbox-group">
                                    <input
                                        className="checkbox-field"
                                        id="clientajeun"
                                        type="checkbox"
                                        {...register('chefservice')}
                                    />
                                    <div className="checkmark" />
                                    <span>Comme chef laborantin</span>
                                </label>
                            }
                        </>
                }
                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-main"
                    >
                        Modifier l'employé
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
                            />
                        }
                    </button>

                    <Link
                        to={`/employees`}
                        type="button"
                        className="btn btn-white">
                        Annuler
                    </Link>

                </div>
            </form>
        </Fragment>
    )
}

interface Password {
    usercode: string,
    oldpass: string,
    newpass: string,
    cnewpass: string
}
export function UpdatePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const validationSchema = yup.object().shape({
        usercode: yup.string()
            .required(""),
        oldpass: yup.string()
            .required("Champ requis"),
        newpass: yup.string()
            .required("Champ requis")
            .matches(passwordRegex, "Fournir un mot de pass solide"),
        cnewpass: yup.string()
            .required("Champ requis")
            .oneOf([yup.ref("newpass")], "Les mots de pass ne corespondent pas!")
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Password>({
        defaultValues: {
            usercode: params?.matricule,
        },
        mode: "all",
        resolver: yupResolver(validationSchema)
    });

    async function handleUpdatePassword(data: Password) {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                "internalpasswordupdate",
                "post",
                data,
                null
            )
            console.log(response);

            if (response?.data?.success) {
                notification("success", "L'employé a été modifié avec succes");
                setLoading(false);
            } else {
                notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
                setLoading(false)
                console.log(response);

            }
        } catch (error) {
            console.log(error);

            notification("error", "Un problème est survenu lors de la modification du mot de passe")
            setLoading(false)
        }
    }

    return (
        <Fragment>
            <form
                onSubmit={handleSubmit(handleUpdatePassword)}
            >
                <input
                    hidden
                    disabled
                    type="text"
                    {...register("oldpass")}
                />
                <InputField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Ancien Mot de passe"
                    placeholder="Entrer un mot de passe"
                    register={register("oldpass")}
                    error={{ for: "password", text: errors?.oldpass?.message }}
                />
                <InputField
                    id="newpass"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nouveau mot de passe"
                    label="Nouveau le mot de passe"
                    register={register("newpass")}
                    error={{ for: "newpass", text: errors?.newpass?.message }}
                />
                <InputField
                    id="cnewpass"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirmer le nouveau mot de passe"
                    label="Confirmer le nouveau"
                    register={register("cnewpass")}
                    error={{ for: "cnewpass", text: errors?.cnewpass?.message }}
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
                    type="submit"
                    className="btn btn-main"
                >
                    Modifier le mot de passe
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
        </Fragment>
    )
}