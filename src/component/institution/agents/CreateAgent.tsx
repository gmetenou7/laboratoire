import React, { Fragment, useState } from 'react';
import InputField from "../../utilities/FormField.tsx";
import { formatData, notification } from "../../../Utils/Utils.tsx";
import { useForm } from 'react-hook-form';
import { emailRegex, passwordRegex, phoneRegex } from '../../../Utils/regex';
import { closeModalReducer } from "../../../features/modalSlice.ts";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { institutionsAgentDataSelector, 
//     institutionsAgentStatusSelector, 
//     singleInstitutionsAgentStatusSelector 
// } from '../../../features/agentInstitutionSlice.ts';
// import { createAgentInstitutionThunk } from '../../../features/agentInstitutionSlice.ts';
import { Puff } from 'react-loader-spinner';

interface Agent {
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    code: number,
    matriculelabo: string,
    matriculeinstitution: string,
    modifierle: string,
    creerle: string,
    etat: string,
    password: string,
    cpassword: string
}
export const CreateAgent = ({ Idinstitution }) => {

    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch()
    const institutions = useSelector((state: any) => institutionsAgentDataSelector(state));
    const institutionAgentStatus = useSelector((state: any) => institutionsAgentStatusSelector(state));
    //const SingleAgent = useSelector((state) => singleInstitutionsAgentStatusSelector(state, code));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Agent>({
        defaultValues: {
            matriculelabo: user?.matricule_labo,
            matriculeinstitution: Idinstitution,
            // nom: nom,
            // prenom: SingleAgent.prenom,
            // email: SingleAgent.email,
            // telephone: SingleAgent.telephone
        }
    });

    async function handleCloseCreateAgent() {
        dispatch(closeModalReducer());
    }

    const handleCreateAgentInstitution = async (data: Agent) => {

        // console.log(data);
        // return
        
        setLoading(true)

        // Object.keys(data).forEach(
        //     (item) => {
        //         if (typeof data[item] === "boolean") {
        //             if (data[item] === true) {
        //                 data[item] = 1
        //             } else {
        //                 data[item] = 0
        //             }
        //         }
        //     }

        // )
        try {

            const response = await dispatch(
                createAgentInstitutionThunk(data)
            );
            console.log(response);
            
            

            if (response) {
                dispatch(closeModalReducer());
                notification("success", "L'agent a été créé avec succes");
                setLoading(false)
            }
            else {
                notification("error", "Une erreur s'est produite veuiller rééssayer");
            }

        } catch (error) {

        }
    }
    return (
        <Fragment>
            <form
                onSubmit={handleSubmit(handleCreateAgentInstitution)}
            >
        
                <InputField
                    id="nom"
                    label="Nom de l'Agent"
                    placeholder="Entrer le nom"
                    register={register("nom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "nom", text: errors?.nom?.message }}
                />
                <InputField
                    id="prenom"
                    label="Prenom de l'Agent"
                    placeholder="Entrer le prénom"
                    register={register("prenom", {
                        required: "Ce champ est requis"
                    })}
                    error={{ for: "prenom", text: errors?.nom?.message }}
                />
                <InputField
                    id="email"
                    type="email"
                    label="Email de l'Agent "
                    placeholder="Entrer l'adresse mail de l'Agent"
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
                    label="Téléphone de l'Agent"
                    placeholder="Entrer le téléphone de l'Agent"
                    register={register("telephone", {
                        required: "Ce champ est requis",
                        pattern: {
                            value: phoneRegex,
                            message: "Format autorisé: +(code)numéro"
                        }
                    })}
                    error={{ for: "telephone", text: errors?.telephone?.message }}
                />
                
                    <div className="form-group">
                        <InputField
                            id="password"
                            type="password"
                            label="Mot de passe"
                            placeholder="Entrer un mot de passe"
                            register={register("password", {
                                required: "Ce champ est requis",
                                pattern: {
                                    value: passwordRegex,
                                    message: "entrer un mot de passe valide"
                                },
                            })}
                            error={{ for: "password", text: errors?.password?.message }}
                        />
                        <InputField
                            id="cpassword"
                            type="password"
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
                    >Créer
                        {(institutionAgentStatus.for === "create" && institutionAgentStatus.for === "loading") &&
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
                        }</button>
                    <Link
                        onClick={handleCloseCreateAgent}
                        to={`#`}
                        type="button"
                        className="btn btn-white">
                        Fermer
                    </Link>
                </div>
            </form>
        </Fragment>
    )
}
