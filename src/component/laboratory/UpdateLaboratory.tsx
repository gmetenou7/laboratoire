import React, { Fragment, useState } from 'react'
import { useForm } from "react-hook-form";
import { emailRegex, phoneRegex } from "../../Utils/regex";
import InputField from "../utilities/FormField.tsx";
import { Puff } from 'react-loader-spinner';
import callApi, { notification } from "../../Utils/Utils.tsx";

interface Laboratory {
    matricule: string,
    created_at: string,
    updated_at: string,
    nom: string,
    telephone: string,
    email: string,
    pays: string,
    ville: string,
    region: string,
    rue: string,
    active: number,
}

interface Props {
    laboratory: Laboratory
}

export const UpdateLaboratory = ({ laboratory }: Props) => {
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem("user") || "");

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Laboratory>({
        defaultValues: laboratory
    });

    async function handleUpdateLaboratory(data: Laboratory) {
        setLoading(true);
        try {
            const response = await callApi(
                true,
                `laboratoire/${user?.matricule_labo}`,
                'put',
                data,
                null
            );
            if (response?.data?.success) {
                notification("success", "Laboratoire modiffié avec succès");
                setLoading(false);


            } else {
                notification("error", "Un problème est survenu lors de la modiffication du laboratoire");
                setLoading(false);
            }
        } catch (error) {

            setLoading(false);
        };
    }
    return (
        <Fragment>
            <div className="update-form-wrapper p-30">
                <form
                    onSubmit={handleSubmit(handleUpdateLaboratory)}
                >
                    <InputField
                        type="text"
                        id="nom"
                        placeholder="modifier le nom du laboratoire"
                        label="Nom du laboratoire"
                        register={register("nom")}

                    />
                    <InputField
                        type="text"
                        id="email"
                        placeholder="modifier l'adresse email du laboratoire"
                        label="Email du laboratoire"
                        register={register("email", {
                            required: "Ce champ est requis",
                            pattern: {
                                value: emailRegex,
                                message: "Email non valide"
                            }
                        })}
                        error={{
                            for: "email",
                            text: errors.email?.message
                        }}
                    />
                    <InputField
                        type="text"
                        id="telephone"

                        placeholder="modifier le nom du laboratoire"
                        label="telephone du laboratoire"
                        register={register("telephone", {
                            required: "Ce champ est requis",
                            pattern: {
                                value: phoneRegex,
                                message: "numero de téléphone non valide"
                            }
                        })}
                        error={{
                            for: "telephone",
                            text: errors.telephone?.message
                        }}
                    />
                    <InputField
                        type="text"
                        id="pays"
                        placeholder="modifier le nom du pays"
                        label="Pays"
                        register={register("pays")}

                    />
                    <InputField
                        type="text"
                        id="ville"

                        placeholder="modifier le nom la ville"
                        label="Nom la ville"
                        register={register("ville")}

                    />
                    <InputField
                        type="text"
                        id="region"

                        placeholder="modifier le nom de la region"
                        label="Nom de la region"
                        register={register("region")}

                    />
                    <InputField
                        type="text"
                        id="rue"

                        placeholder="modifier le nom de la rue"
                        label="Nom de la rue"
                        register={register("rue")}

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
