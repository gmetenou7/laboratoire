import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Puff } from "react-loader-spinner";
import { emailRegex, phoneRegex } from "../../Utils/regex";
import InputField from "../utilities/FormField.tsx";
import { useNavigate } from "react-router-dom";
import { formatData, notification } from "../../Utils/Utils.tsx";
import { useDispatch } from "react-redux";
import { createEmployeesThunk } from "../../features/EmployeesSlice.ts";
import { Link } from "react-router-dom";
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
import { useSelector } from "react-redux";
//import Resizer from 'react-image-file-resizer';
import { read } from "fs";


interface EmployeeType {
    matricule_labo: string,
    matricule_ag: string,
    matricule_serv: string,
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    fonction: string,
    password: string,
    cpassword: string,
    specialite: number,
    chefservice: number,
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


export const CreateEmployeesForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [fileDataURL, setFileDataURL] = useState<any>(null);
    const [fileData, setFileData] = useState<any>();
    const imageMimeType = /image\/(png|jpg|jpeg)/i;

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
    async function handleFetchService() {

        try {
            const response = await dispatch(
                listServicesThunk(user?.matricule_labo)
            ).unwrap();

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleFetchAgencies() {
        try {
            const response = await dispatch(
                listAgenciesThunk(user?.matricule_labo)
            ).unwrap()
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleFetchBigFamilyExam() {
        try {
            await dispatch(
                listBigFamilyExamThunk(user?.matricule_labo)
            )
        }
        catch (error) {
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<EmployeeType>({
        defaultValues: {
            matricule_labo: user?.matricule_labo,
            chefservice: 0,
        }
    })

    const watchFormData: EmployeeType = watch();

    const handleCreateEmployees = async (data: EmployeeType) => {
        setLoading(true);
        Object.keys(data).forEach((item) => {
            if (typeof data[item] === "boolean") {
                if (data[item] === true) {
                    data[item] = 1
                } else {
                    data[item] = 0
                }
            }
        })
        try {
            const response = await dispatch(
                createEmployeesThunk(data)
            )
            if (response?.payload?.data?.success) {
                navigate('/employees')
                notification("success", "L'employé a été créé avec succes");
                setLoading(false);
            } else {
                setLoading(false);
                notification("error", formatData(response?.payload?.data?.data))
            }
        } catch (error) {
        }
    }

    const resizeFile = (file: any) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                512,
                512,
                'JPEG',
                70,
                0,
                (uri) => {
                    resolve(uri);
                },
                'base64'
            );
        });

    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        if (file.size > 1000000) {
            notification("error", "la taille du fichier trop grande. Taille maximale autorisée: 1Mo");
        } else if (!file.type.match(imageMimeType)) {
            notification("error", "le format du fichier n'est pas autorisé");
        } else {
            setFileData(file);
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const { result } = event.target;
                if (result) {
                    setFileDataURL(result);
                }
            };
            reader.readAsDataURL(file);
            return () => {
                if (reader && reader.readyState === 1) {
                    reader.abort();
                }
            }
        }


    };

    const handleImageSubmit = async (event: any) => {
        event.preventDefault();
        const resizedFile = await resizeFile(fileData);
        console.log(resizedFile);

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

    return (
        <Fragment>
            <form onSubmit={handleSubmit(handleCreateEmployees)}>
                <input
                    disabled
                    hidden
                    id="lab_id"
                    type="text"
                    {...register("matricule_labo")}
                />
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
                        register={register("telephone", {
                            required: "Ce champ est requis",
                            pattern: {
                                value: phoneRegex,
                                message: "Format autorisé: +(code)numéro"
                            }
                        })}
                        error={{ for: "telephone", text: errors?.telephone?.message }}
                    />
                </div>

                <input type="text"

                    {...register("fonction", {
                        required: false,
                        value: "Agent"
                    })}
                    hidden
                    disabled

                />

                {
                    (serviceStatus === "loading" || agencyStatus === "loading" || bigFamilyExamStatus === "loading") ?
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
                        </div>
                        :
                        <>
                            <div
                                style={{
                                    marginTop: "-30px",
                                }}
                                className="form-group">
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
                                {singleService?.nom === "laboratoire" &&
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
                                                required: "Champ requis"
                                            })}
                                        >
                                            <option disabled value="">Spécialité</option>
                                            {bigFamilyExam?.map((option: any, index: number) => (
                                                <option
                                                    value={option?.code}
                                                    key={index}>
                                                    {option.nomfmaille}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                }
                            </div>
                            {singleService?.nom === "laboratoire" &&
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

                            {/* {singleService?.nom === "biologiste" &&
                                <div>
                                    {fileDataURL && <img src={fileDataURL} alt="Preview" />}
                                    <input
                                        onChange={handleImageUpload} type="file"
                                        id="fileInput"
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleImageSubmit}
                                    >Upload</button>
                                </div>
                            } */}
                        </>
                }

                <div className="form-group">
                    <InputField
                        id="password"
                        type="text"
                        label="Mot de passe"
                        placeholder="Entrer un mot de passe"
                        register={register("password", {
                            required: "Ce champ est requis",
                        })}
                        error={{ for: "password", text: errors?.password?.message }}
                    />
                    <InputField
                        id="cpassword"
                        type="text"
                        placeholder="Confirmer le mot de passe"
                        label="Confirmer le mot de passe"
                        register={register("cpassword", {
                            required: "Ce champ est requis",

                        })}
                        error={{ for: "cpassword", text: errors?.cpassword?.message }}

                    />
                </div>
                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-main"
                    >
                        Créer Employé
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