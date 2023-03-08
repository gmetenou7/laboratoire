import React, { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputField from "../component/utilities/FormField.tsx";
import { useForm } from "react-hook-form";
import siteLogo from "../component/assets/site-logo.png";
import { phoneRegex, emailRegex } from "../Utils/regex";
import { Puff } from "react-loader-spinner";
import callApi, { formatData, notification } from "../Utils/Utils.tsx";
import { useNavigate } from "react-router-dom";

interface FormData {
  nomlabo: string;
  telephonelabo: string;
  emaillabo: string;
  payslabo: string;
  villelabo: string;
  regionlabo: string;
  ruelabo: string;
  nomag: string;
  telephoneag: string;
  emailag: string;
  paysag: string;
  villeag: string;
  regionag: string;
  rueag: string;
  telephoneemp: string;
  fonctionemp: string;
  emailemp: string;
  nomemp: string;
  prenomemp: string;
}

export const CompleteProfile = () => {
  let [active, setActive] = useState(1);

  const [matriculLabo, setMatriculLabo] = useState();
  const [loading, setLoading] = useState({ step: 0 });
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user") || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      emailemp: user?.email,
      nomemp: user?.nom,
      prenomemp: user?.prenom,
      fonctionemp: "admin",
    },
  });

  const handleCreateLaboratory = async (data: FormData) => {
    setLoading({ step: 1 });
    const requestData = {
      nom: data.nomlabo,
      telephone: data.telephonelabo,
      email: data.emaillabo,
      pays: data.payslabo,
      ville: data.villelabo,
      region: data.regionlabo,
      rue: data.ruelabo,
      codeutulisateur: user?.matricule,
    };
    let response = await callApi(
      true,
      "laboratoire",
      "post",
      null,
      requestData
    );
    if (response?.data?.success) {
      notification("success", response.data.message);
      if (user) {
        user.matricule_labo = response?.data?.data?.matricule_labo;
        localStorage.setItem("user", JSON.stringify(user));
      }
      setMatriculLabo(response.data.data.matricule);
      setActive(active + 1);
      setLoading({ step: 0 });
    } else {
      notification(
        "error",
        formatData(response.data.data) === ""
          ? response.data.message
          : formatData(response.data.data)
      );
    }
    setLoading({ step: 0 });
  };

  const handleUpdateAccount = async (data: FormData) => {
    setLoading({ step: 2 });
    const requestData = {
      nom: user.nom,
      prenom: user.prenom,
      fonction: data.fonctionemp,
      telephone: data.telephoneemp,
      email: user.email,
    };

    const _user = JSON.parse(localStorage.getItem("user") || "");
    let matricule = _user.matricule;
    let response = await callApi(
      true,
      `employe/${matricule}`,
      "put",
      null,
      requestData
    );
    setLoading({ step: 0 });
    if (response?.data?.success) {
      notification("success", response.data.message);
      setActive(active + 1);
    } else {
      notification(
        "error",
        formatData(response.data.data) === ""
          ? response.data.message
          : formatData(response.data.data)
      );
    }


  };

  const handleCreateAgency = async (data: FormData) => {
    setLoading({ step: 3 });
    const requestData = {
      nom: data.nomag,
      telephone: data.telephoneag,
      email: data.emailag,
      pays: data.paysag,
      ville: data.villeag,
      region: data.regionag,
      rue: data.rueag,
      matricule_labo: matriculLabo,
    };

    let response = await callApi(true, "agence", "post", null, requestData);
    if (response?.data?.success) {
      notification("success", response.data.message);
      navigate("/new-dashboard", { replace: true });
    } else {
      notification(
        "error",
        formatData(response.data.data) === ""
          ? response.data.message
          : formatData(response.data.data)
      );
    }
  };

  function redirect_user() {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user.matricule_labo) setActive(2);
  }

  useEffect(() => {
    redirect_user();
  }, []);
  return (
    <Fragment>
      <div className="complete-profile-page-wrapper">
        <motion.div className="profile-form-container">
          <div className="content">
            <motion.h2 className="welcom-message">
              {" "}
              Hello{" "}
              <span className="name">{user?.nom + " " + user?.prenom}</span>,
              Voici la dernière étape pour commencer à utiliser la gestion de
              laboratoir
            </motion.h2>
            <div className="content-form">
              {/* Create laboratory form*/}
              <motion.div className="accordion">
                <motion.header
                  whileHover={{
                    backgroundColor: active === 1 ? "#8CC63F" : "#0A018E",
                  }}
                  className="accordion-header"
                  animate={{
                    backgroundColor: active === 1 ? "#528F01" : "#2F2980",
                  }}
                >
                  Créer votre Laboratoire
                </motion.header>
                <AnimatePresence initial={false}>
                  {active === 1 && (
                    <motion.section
                      className="accordion-body"
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <motion.div
                        style={{ padding: "30px 20px" }}
                        variants={{
                          collapsed: { scale: 0.8 },
                          open: { scale: 1 },
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <form onSubmit={handleSubmit(handleCreateLaboratory)}>
                          <InputField
                            id="name_labo"
                            tyep="text"
                            placeholder="Donner le nom du laboratoire"
                            label="Nom du laboratoire"
                            register={register("nomlabo", {
                              required: "Ce champ est requis",
                            })}
                            error={{
                              for: "name_labo",
                              text: errors?.nomlabo?.message,
                            }}
                          />
                          <div className="form-group">
                            <InputField
                              id="email_labo"
                              tyep="email"
                              placeholder="Donner l'adresse email du laboraratoir"
                              label="Email du laboratoire"
                              register={register("emaillabo", {
                                required: "Ce champ est requis",
                                pattern: {
                                  value: emailRegex,
                                  message: "Donner une adresse email valide",
                                },
                              })}
                              error={{
                                for: "email_labo",
                                text: errors?.emaillabo?.message,
                              }}
                            />
                            <InputField
                              id="phone_labo"
                              tyep="text"
                              placeholder="Donner le téléphone du laboraratoir"
                              label="Téléphone du laboratoire"
                              register={register("telephonelabo", {
                                required: "Ce champ est requis",
                                pattern: {
                                  value: phoneRegex,
                                  message: "Format autorisé: +(code)numéro",
                                },
                              })}
                              error={{
                                for: "phone_labo",
                                text: errors?.telephonelabo?.message,
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <InputField
                              id="county_labo"
                              tyep="text"
                              placeholder="Donner le pays du laboratoire"
                              label="Pays du laboratoire"
                              register={register("payslabo", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "county_labo",
                                text: errors?.payslabo?.message,
                              }}
                            />
                            <InputField
                              id="region_labo"
                              tyep="text"
                              placeholder="Dans quelle region se trouve le laboratoire?"
                              label="Region"
                              register={register("regionlabo", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "region_labo",
                                text: errors?.regionlabo?.message,
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <InputField
                              id="town_labo"
                              tyep="text"
                              placeholder="Dans quelle ville se trouve le laboratoire?"
                              label="Ville"
                              register={register("villelabo", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "town_labo",
                                text: errors?.villelabo?.message,
                              }}
                            />
                            <InputField
                              id="address_labo"
                              tyep="text"
                              placeholder="Donner le nom la rue"
                              label="Nom de la rue"
                              register={register("ruelabo", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "address_labo",
                                text: errors?.ruelabo?.message,
                              }}
                            />
                          </div>
                          {active === 1 && (
                            <button
                              type="submit"
                              className="btn btn-main mt-30"
                            >
                              Créer mon laboratoire
                              {loading?.step === 1 && (
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
                              )}
                            </button>
                          )}
                        </form>
                      </motion.div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.div>
              {/* Update account form*/}
              <motion.div className="accordion">
                <motion.header
                  whileHover={{
                    backgroundColor: active === 2 ? "#8CC63F" : "#0A018E",
                  }}
                  className="accordion-header"
                  animate={{
                    backgroundColor: active === 2 ? "#528F01" : "#2F2980",
                  }}
                >
                  Compléter votre compte
                </motion.header>
                <AnimatePresence initial={false}>
                  {active === 2 && (
                    <motion.section
                      className="accordion-body"
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <motion.div
                        style={{ padding: "30px 20px" }}
                        variants={{
                          collapsed: { scale: 0.8 },
                          open: { scale: 1 },
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <form onSubmit={handleSubmit(handleUpdateAccount)}>
                          <input
                            hidden={true}
                            disabled={true}
                            {...register("fonctionemp", {
                              required: false,
                            })}
                          />
                          <div className="form-group">
                            <InputField
                              id="first_name"
                              tyep="text"
                              disabled={true}
                              label="Votre nom"
                              register={register("nomemp")}
                            />
                            <InputField
                              id="last_name"
                              tyep="text"
                              disabled={true}
                              label="Votre prénom"
                              register={register("prenomemp")}
                            />
                          </div>
                          <InputField
                            id="user_email"
                            tyep="email"
                            disabled={true}
                            label="Votre email"
                            register={register("emailemp")}
                          />
                          <InputField
                            id="user_phone"
                            tyep="tel"
                            placeholder="Votre numéro de téléphone"
                            label="Entrer un numéro de téléphone"
                            register={register("telephoneemp", {
                              required: "Ce champ est requis",
                              pattern: {
                                value: phoneRegex,
                                message: "Format autorisé: +(code)numéro",
                              },
                            })}
                            error={{
                              for: "user_phone",
                              text: errors?.telephoneemp?.message,
                            }}
                          />
                          {active === 2 && (
                            <button
                              type="submit"
                              className="btn btn-main mt-30"
                            >
                              Mettre a jour mon compte
                              {loading?.step === 2 && (
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
                              )}
                            </button>
                          )}
                        </form>
                      </motion.div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.div>
              {/* Create agency form*/}
              <motion.div className="accordion">
                <motion.header
                  whileHover={{
                    backgroundColor: active === 3 ? "#8CC63F" : "#0A018E",
                  }}
                  className="accordion-header disabled"
                  animate={{
                    backgroundColor: active === 3 ? "#528F01" : "#2F2980",
                  }}
                >
                  Ajouter une agence
                </motion.header>
                <AnimatePresence initial={false}>
                  {active === 3 && (
                    <motion.section
                      className="accordion-body"
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <motion.div
                        style={{ padding: "30px 20px" }}
                        variants={{
                          collapsed: { scale: 0.8 },
                          open: { scale: 1 },
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <form onSubmit={handleSubmit(handleCreateAgency)}>
                          <InputField
                            id="name_agence"
                            tyep="text"
                            placeholder="Donner le nom de l'agence"
                            label="Nom de l'agence"
                            register={register("nomag", {
                              required: "Ce champ est requis",
                            })}
                            error={{
                              for: "name_agence",
                              text: errors?.nomag?.message,
                            }}
                          />
                          <div className="form-group">
                            <InputField
                              id="email_agence"
                              tyep="email"
                              placeholder="Donner l'adresse email de l'agence"
                              label="Email de l'agence"
                              register={register("emailag", {
                                required: "Ce champ est requis",
                                pattern: {
                                  value: emailRegex,
                                  message: "Donner une adresse email valide",
                                },
                              })}
                              error={{
                                for: "email_agence",
                                text: errors?.emailag?.message,
                              }}
                            />
                            <InputField
                              id="phone_labo"
                              tyep="text"
                              placeholder="Donner le téléphone de l'agence"
                              label="Téléphone de l'agence"
                              register={register("telephoneag", {
                                required: "Ce champ est requis",
                                pattern: {
                                  value: phoneRegex,
                                  message: "Format autorisé: +(code)numéro",
                                },
                              })}
                              error={{
                                for: "phone_labo",
                                text: errors?.telephoneag?.message,
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <InputField
                              id="county_agence"
                              tyep="text"
                              placeholder="Donner le pays de l'agence"
                              label="Pays de l'agence"
                              register={register("paysag", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "county_agence",
                                text: errors?.paysag?.message,
                              }}
                            />
                            <InputField
                              id="region_agence"
                              tyep="text"
                              placeholder="Dans quelle region se trouve l'agence?"
                              label="Region"
                              register={register("regionag", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "region_agence",
                                text: errors?.regionag?.message,
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <InputField
                              id="town_agence"
                              tyep="text"
                              placeholder="Dans quelle ville se trouve l'agence?"
                              label="Ville"
                              register={register("villeag", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "town_agence",
                                text: errors?.villeag?.message,
                              }}
                            />
                            <InputField
                              id="address_agence"
                              tyep="text"
                              placeholder="Donner le nom la rue"
                              label="Nom de la rue"
                              register={register("rueag", {
                                required: "Ce champ est requis",
                              })}
                              error={{
                                for: "address_agence",
                                text: errors?.rueag?.message,
                              }}
                            />
                          </div>

                          {active === 3 && (
                            <button
                              type="submit"
                              className="btn btn-main mt-30"
                            >
                              Créer une agence
                              {loading?.step === 3 && (
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
                              )}
                            </button>
                          )}
                        </form>
                      </motion.div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div className="element-container">
          <motion.div className="element-header">
            <motion.img className="header-logo" src={siteLogo} alt="site log" />
            <motion.h2 className="header-text">Laboratoire</motion.h2>
          </motion.div>
        </motion.div>
      </div>
    </Fragment>
  );
};
