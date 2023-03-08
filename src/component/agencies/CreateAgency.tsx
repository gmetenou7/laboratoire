import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Puff } from 'react-loader-spinner';
import callApi, { notification } from "../../Utils/Utils.tsx";
import InputField, { CountrySelectField } from "../utilities/FormField.tsx";
import { closeModalReducer } from "../../features/modalSlice.ts"
import { useDispatch } from 'react-redux';
import { phoneRegex, emailRegex } from "../../Utils/regex"

interface Agency {
    created_at: string,
    email: string,
    matricule: string,
    matricule_labo: string,
    nom: string,
    pays: string,
    region: string,
    rue: string,
    telephone: string,
    updated_at: string,
    ville: string,
}

interface Country {
    id: number,
    code: number,
    alpha2: string,
    alpha3: string,
    nom_en_gb: string,
    nom_fr_fr: string
}

export function CreateAgency({ fetchAgencies }) {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loadingCountry, setLoadingCountry] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<[Country]>();
    const [isMounted, setIsMounted] = useState(true);
    const dispatch = useDispatch()
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Agency>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,
            pays: "République Démocratique du Congo"
        }
    });
    async function fetchCountries() {
        setLoadingCountry(true)
        try {
            const response = await callApi(
                true,
                "pays",
                'get',
                null
            );
            if (response?.data?.success) {
                setCountries(response?.data?.data)
                setLoadingCountry(false)
            } else {
                setLoadingCountry(false)
            }
        } catch (error) {
            setLoadingCountry(false)
        }
    };

    async function handleCreateAgency(data: Agency) {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                "agence",
                'post',
                data,
                null
            );
            if (response?.data?.success) {
                notification("success", "Agence ajoutée avec success");
                setLoading(false);
                fetchAgencies();
                dispatch(closeModalReducer());
            } else {
                notification("error", "Un problème est survenu lors de la création d'une agence");
                setLoading(false);
            }
        } catch (error) {
            notification("error", "Un problème est survenu lors de la création d'une agence");
            setLoading(false);
        };
    };

    useEffect(() => {
        isMounted && fetchCountries();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);

    return (
        <Fragment>
            {loadingCountry ?
                <div className='loading-container flex-col-center-center'>
                    <Puff
                        height="100"
                        width="100"
                        radius={1}
                        color="#528F01"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div> :
                <div className="p-30">
                    <form
                        onSubmit={handleSubmit(handleCreateAgency)}
                    >
                        <input
                            type="text"
                            disabled
                            hidden
                            {...register("matricule_labo")}
                        />
                        <InputField
                            id="nom"
                            type="text"
                            placeholder="Entrer le nom de l'agence"
                            label="Nom de l'agence"
                            register={register("nom", {
                                required: "Ce champ est requis",
                            })}
                            error={{ for: "nom", text: errors?.nom?.message }}
                        />
                        <InputField
                            id="telephone"
                            type="text"
                            placeholder="Entrer le téléphone de l'agence"
                            label="Téléphone de l'agence"
                            register={register("telephone", {
                                required: "Ce champ est requis",
                                pattern: {
                                    value: phoneRegex,
                                    message: "Format valide: +(code)numéro"
                                }
                            })}
                            error={{ for: "telephone", text: errors?.telephone?.message }}
                        />
                        <InputField
                            id="email"
                            type="email"
                            placeholder="Entrer le email de l'agence"
                            label="Email de l'agence"
                            register={register("email", {
                                required: "Ce champ est requis",
                                pattern: {
                                    value: emailRegex,
                                    message: "Entrer un email valide"
                                }
                            })}
                            error={{ for: "email", text: errors?.email?.message }}
                        />
                        <CountrySelectField
                            id="country"
                            label="Pays"
                            options={countries}
                            register={register("pays")}
                            error={{ for: "country", text: errors?.pays?.message }}
                        />
                        <InputField
                            id="ville"
                            type="text"
                            placeholder="Entrer la ville"
                            label="Ville de l'agence"
                            register={register("ville", {
                                required: "Ce champ est requis",
                            })}
                            error={{ for: "ville", text: errors?.ville?.message }}
                        />
                        <InputField
                            id="region"
                            type="text"
                            placeholder="Entrer la region"
                            label="Region de l'agence"
                            register={register("region", {
                                required: "Ce champ est requis",
                            })}
                            error={{ for: "region", text: errors?.region?.message }}
                        />
                        <button
                            type="submit"
                            className="btn btn-main"
                        >
                            Créer une agence
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
            }
        </Fragment>
    )
}
