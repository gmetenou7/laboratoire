import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Puff } from "react-loader-spinner";
import { emailRegex, phoneRegex } from "../../../Utils/regex";
import InputField, { SelectField, CountrySelectField } from "../../utilities/FormField.tsx";
import { useNavigate, useParams } from "react-router-dom";
import callApi, { formatData, notification } from "../../../Utils/Utils.tsx";
import { useDispatch } from "react-redux";
import { createPatientThunk, singlePatientSelector, updatePatientThunk } from "../../../features/patientSlice.ts";
import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { createGlasswareThunk, closeGlasswareForm } from '../../features/glasswareSlice.ts';

export interface PatientType {
    matricule_labo: string,
    matricule_emp: string,
    nom: string,
    prenom: string,
    email: string,
    email_confirm: string,
    telephone: string,
    confirm_telephone: string
    datenaissance: Date,
    lieunassance: string,
    lieuvie: string,
    nationalite: string,
    sexe: string,
    personneurgence: string,
    telpersonneurgence: string,
    function: string,
    statutFamilial: string,
    emailcli: string,
    matricule: string
}

interface CountryData {
    id: number,
    code: number,
    alpha2: string,
    alpha3: string,
    nom_en_gb: string,
    nom_fr_fr: string
}

export const UpdateUserCompany = () => {
    const [loading, setLoading] = useState({ for: "idle" });
    let [country, setCountry] = useState<[CountryData]>()
    const user = JSON.parse(localStorage.getItem("user") || "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams()
    const singlePatient: PatientType = useSelector((state) =>
        singlePatientSelector(state, params?.matricule)
    );
    const validationSchema = yup.object().shape({
        nom: yup.string()
            .required("Ce champ est requis"),
        prenom: yup.string()
            .required("Ce champ est requis"),
        email: yup.string()
            .notRequired(),
        // .matches(emailRegex, "Fournir une adresse email conforme"),
        email_confirm: yup.string()
            .notRequired()
            .oneOf([yup.ref("email")], "les Emails ne corespondent pas"),
        telephone: yup.string()
            .required("Ce champ est requis")
            .matches(phoneRegex, "Format autorisé: +(code)numéro"),
        confirm_telephone: yup.string()
            .required("Ce champs est requis")
            .oneOf([yup.ref("telephone")], "Les numeros ne corespondent pas"),
        datenaissance: yup.string()
            .typeError("Choisir une date valide")
            .required("Ce champ est requis"),
        lieunassance: yup.string(),
        lieuvie: yup.string()
            .required("Ce champ est requis"),
        nationalite: yup.string()
            .required("Ce champ est requis"),
        sexe: yup.string()
            .required("Ce champ est requis"),
        personneurgence: yup.string()
            .required("Ce champ est requis"),
        telpersonneurgence: yup.string()
            .matches(phoneRegex, "Format autorisé: +(code)numéro")
            .required("Ce champ est requis"),
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<PatientType>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,
            matricule_emp: user?.matricule,
            nationalite: singlePatient?.nationalite ? singlePatient?.nationalite : "République Démocratique du Congo",
            nom: singlePatient?.nom,
            prenom: singlePatient?.prenom,
            email: singlePatient?.emailcli,
            email_confirm: singlePatient?.emailcli,
            telephone: singlePatient?.telephone,
            confirm_telephone: singlePatient?.telephone,
            datenaissance: singlePatient?.datenaissance,
            lieunassance: singlePatient?.lieunassance,
            lieuvie: singlePatient?.lieuvie,
            sexe: singlePatient?.sexe,
            personneurgence: singlePatient?.personneurgence,
            telpersonneurgence: singlePatient?.telpersonneurgence
        },
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    });

    async function fetchCountry() {
        setLoading({ for: "country" })
        try {
            const response = await callApi(
                true,
                "pays",
                'get',
                null
            );
            if (response?.data?.success) {
                setCountry(response?.data?.data)
                setLoading({ for: "idle" })
            } else {
                setLoading({ for: "country-fail" })
            }
        } catch (error) {
            setLoading({ for: "country-fail" })
        }
    }

    const handleCreatePatient = async (data: PatientType) => {
        const { confirm_telephone, email_confirm, ...request_data } = data
        console.log(request_data);

        setLoading({ for: "create" })
        try {
            const response = await dispatch(
                createPatientThunk(request_data)
            )

            if (response?.payload?.data?.success) {
                setLoading({ for: "idle" });
                navigate(`/patients/${response?.payload?.data?.data?.matricule}`, { replace: true })
                let nom = response?.payload?.data?.data.nom
                notification("success", `le patient ${nom} a été créé avec succes !`);

            } else {
                setLoading({ for: "create-fail" });
                notification("error", formatData(response?.payload?.data?.data));
            }

        } catch (error) {
            setLoading({ for: "create-fail" });
        }
    }

    const handleUpdatePatient = async (data: PatientType) => {
        const { confirm_telephone, email_confirm, ...request_data } = data
        console.log(request_data);


        setLoading({ for: "create" })
        try {
            const response = await dispatch(
                updatePatientThunk({ matricule: params?.matricule, data: request_data })
            )
            console.log(response);

            if (response?.payload?.data?.success) {
                setLoading({ for: "idle" });
                navigate(`/patients/${params?.matricule}`, { replace: true })
                let nom = response?.payload?.data?.data.nom
                notification("success", `les informations du patient  ont été modifié avec succes !`);

            } else {
                setLoading({ for: "create-fail" });
                notification("error", formatData(response?.payload?.data?.data));
            }

        } catch (error) {
            setLoading({ for: "create-fail" });
        }
    }

    useEffect(() => {
        fetchCountry()
    }, [])

    return (
        <Fragment>
            <form onSubmit={handleSubmit(params.matricule ? handleUpdatePatient : handleCreatePatient)}>
                <input
                    disabled
                    hidden
                    id="lab_id"
                    type="text"
                    {...register("matricule_labo")}
                />
                <input
                    disabled
                    hidden
                    id="user_id"
                    type="text"
                    {...register("matricule_emp")}
                />
                <InputField
                    id="first_name"
                    type="text"
                    label="Nom"
                    placeholder="Entrer le nom"
                    register={register("nom")}

                    error={{ for: "first_name", text: errors?.nom?.message }}
                />
                <InputField
                    id="last_name"
                    type="text"
                    label="Prénom"
                    placeholder="Entrer le prénom"
                    register={register("prenom")}
                    error={{ for: "last_name", text: errors?.prenom?.message }}
                />

                <div className="form-group">
                    <InputField
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Entrer l'adresse email"
                        register={register("email")}
                        error={{ for: "email", text: errors?.email?.message }}
                    />
                    <InputField
                        id="email_confirm"
                        type="email"
                        label="Email à nouveau"
                        placeholder="Confirmer l'email"
                        register={register("email_confirm")}
                        error={{ for: "email_confirm", text: errors?.email_confirm?.message }}
                    />
                </div>
                <div className="form-group">
                    <InputField
                        id="phone_patient"
                        type="text"
                        label="Téléphone"
                        placeholder="Entrer le téléphone"
                        register={register("telephone")}
                        error={{ for: "phone_patient", text: errors?.telephone?.message }}
                    />
                    <InputField
                        id="confirm_phone_patient"
                        type="text"
                        label="Téléphone à nouveau"
                        placeholder="Confirmer le téléphone"
                        register={register("confirm_telephone")}
                        error={{ for: "confirm_phone_patient", text: errors?.confirm_telephone?.message }}
                    />
                </div>
                 <div className="form-group">
                    <InputField
                        id="function"
                        type="text"
                        label="Fonction"
                        placeholder="Entrer la fonction"
                        register={register("function")}
                        error={{ for: "function", text: errors?.function?.message }}
                    />
                    <InputField
                        id="statutFamilial"
                        type="text"
                        label="Statut Familial"
                        placeholder="Confirmer le téléphone"
                        register={register("statutFamilial")}
                        error={{ for: "statutFamilial", text: errors?.statutFamilial?.message }}
                    />
                </div>

                <div className="form-group">
                    <SelectField
                        id="sexe"
                        label="Sexe"
                        options={["Feminin", "Masculin"]}
                        register={register("sexe")}
                        error={{ for: "sexe", text: errors?.sexe?.message }}
                    />
                    <InputField
                        id="birthday"
                        type="date"
                        label="Date de naissance"
                        register={register("datenaissance")}
                        error={{ for: "birthday", text: errors?.datenaissance?.message }}

                    />
                </div>
                <div className="form-group">
                    <CountrySelectField
                        id="country"
                        label="Pays de naissance"
                        options={country}
                        register={register("nationalite")}
                        error={{ for: "country", text: errors?.nationalite?.message }}
                    />
                    <InputField
                        id="location"
                        type="text"
                        placeholder="Entrer le lieux de nainssance"
                        label="Lieu de naissance"
                        register={register("lieunassance")}
                        error={{ for: "location", text: errors?.lieunassance?.message }}

                    />
                </div>
                <InputField
                    id="residence"
                    type="text"
                    label="Lieu de résidence"
                    placeholder="Entrer le lieux de résidence"
                    register={register("lieuvie")}
                    error={{ for: "residence", text: errors?.lieuvie?.message }}
                />
                <hr
                    className="line-break mt-30"
                />
                <div className="form-group">
                    <InputField
                        id="person_to_contact"
                        tyep="text"
                        label="Personne à contacter"
                        placeholder="Nom de la personne à contacter"
                        register={register("personneurgence")}
                        error={{ for: "person_to_contact", text: errors?.personneurgence?.message }}
                    />
                    <InputField
                        id="phone_person_to_contact"
                        type="text"
                        placeholder="Entrer le téléphone de la personne à contacter"
                        label="Téléphone"
                        register={register("telpersonneurgence")}
                        error={{ for: "phone_person_to_contact", text: errors?.telpersonneurgence?.message }}

                    />
                </div>
                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-main"
                    >
                         Mettre à jour 
                        {loading.for === "create" &&
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
                    {/* {params?.matricule &&
                        <Link
                            to={`/patients/${singlePatient?.matricule}`}
                            type="button"
                            className="btn btn-white">
                            Fermer
                        </Link>
                    } */}

                </div>

            </form>
        </Fragment>
    )
}