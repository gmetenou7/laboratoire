import React, { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputField from "../component/utilities/FormField.tsx";
import { useForm } from "react-hook-form";
import siteLogo from "../component/assets/site-logo.png";
import { phoneRegex, emailRegex } from "../Utils/regex"


interface FormData {
    nom: string,
    prenom: string,
    telephone: string,
    nationalite: string,
    sexe: string,
    date_naissance: string,
    lieu_nassance: string,
    residence: string,
    personne_urgence: string,
    telpersonne_urgence: string,

}



export const CreateClient = () => {
    let [active, setActive] = useState(1)
    let [activeAll, setActiveAll] = useState(false)

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>({
        mode: "all",

    });




    const handleRegister = async (data: FormData) => {
        setLoading(true)


    }



    return (
        <Fragment>
            <div className="complete-profile-page-wrapper">
                <motion.div
                    className="profile-form-container"
                >
                    <div className="content">
                        <form onSubmit={handleSubmit(handleRegister)} className="content-form">
                            <motion.div className="accordion">
                                <motion.header
                                    whileHover={{ backgroundColor: active === 2 ? "#8CC63F" : "#0A018E" }}
                                    className="accordion-header"
                                    animate={{ backgroundColor: active === 2 ? "#528F01" : "#2F2980" }}

                                >NOUVEAU PATIENT !</motion.header>
                                <AnimatePresence initial={false}>
                                    <motion.section
                                        className="accordion-body"
                                        key="content"
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { opacity: 1, height: "auto" },
                                            collapsed: { opacity: 0, height: 0 }
                                        }}
                                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <motion.div
                                            style={{ padding: "30px 20px" }}
                                            variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="form-group">
                                                <InputField
                                                    id="nom"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Nom du patient"
                                                    register={
                                                        register("nom", {
                                                            required: "Ce champ est requis"
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "nom", text: errors?.nom?.message }}
                                                />
                                                <InputField
                                                    id="prenom"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Prénom"
                                                    register={
                                                        register("prenom", {
                                                            required: "Ce champ est requis"
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "prenom", text: errors?.prenom?.message }}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <InputField
                                                    id="sexe"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Sexe"
                                                    register={
                                                        register("sexe", {
                                                            required: "Ce champ est requis"
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "sexe", text: errors?.sexe?.message }}
                                                />
                                                <InputField
                                                    id="date_naissance"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Date de naissance"
                                                    register={
                                                        register("date_naissance", {
                                                            required: "Ce champ est requis"
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "date_naissance", text: errors?.date_naissance?.message }}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <InputField
                                                    id="lieu_nassance"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Lieu de naissance"
                                                    register={
                                                        register("lieu_nassance", {
                                                            required: "Ce champ est requis"
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "lieu_nassance", text: errors?.lieu_nassance?.message }}
                                                />
                                                <InputField
                                                    id="nationalite"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Nationalité"
                                                    register={
                                                        register("nationalite", {
                                                            required: "Ce champ est requis"
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "nationalite", text: errors?.nationalite?.message }}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <InputField
                                                    id="telephone"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Téléphone"
                                                    register={
                                                        register("telephone", {
                                                            required: "Ce champ est requis",
                                                            pattern: {
                                                                value: phoneRegex,
                                                                message: "Format autorisé: +(code)numéro"
                                                            }
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "telephone", text: errors?.telephone?.message }}
                                                />
                                                <InputField
                                                    id="residence"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Lieu de residence"
                                                    register={
                                                        register("residence", {
                                                            required: "Ce champ est requis",
                                                            pattern: {
                                                                value: phoneRegex,
                                                                message: "Format autorisé: +(code)numéro"
                                                            }
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "residence", text: errors?.residence?.message }}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <InputField
                                                    id="personne_urgence"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Nom personne  en cas d'urgenge"
                                                    register={
                                                        register("personne_urgence", {
                                                            required: "Ce champ est requis",
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "personne_urgence", text: errors?.personne_urgence?.message }}
                                                />
                                                <InputField
                                                    id="telpersonne_urgence"
                                                    tyep="text"
                                                    placeholder=""
                                                    label="Numéro Téléphone en cas d'urgenge"
                                                    register={
                                                        register("telpersonne_urgence", {
                                                            required: "Ce champ est requis",
                                                            pattern: {
                                                                value: phoneRegex,
                                                                message: "Format autorisé: +(code)numéro"
                                                            }
                                                        }
                                                        )
                                                    }
                                                    error={{ for: "telpersonne_urgence", text: errors?.telpersonne_urgence?.message }}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-main mt-30"

                                            >
                                                CREER
                                            </button>
                                        </motion.div>
                                    </motion.section>

                                </AnimatePresence>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
                <motion.div
                    className="element-container"
                >
                    <motion.div className="element-header">
                        <motion.img
                            className="header-logo"
                            src={siteLogo}
                            alt="site log"
                        />
                        <motion.h2
                            className="header-text"
                        >
                            Laboratoire
                        </motion.h2>
                    </motion.div>
                </motion.div>
            </div>
        </Fragment>
    );
};
