import React, { Fragment } from "react";
import { AiFillEye, AiOutlineBarcode, AiFillDelete, AiOutlineSend } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsFillPrinterFill, BsFillCreditCard2BackFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import {
  dateTimeToPeriod,
  formatDateTime,
} from "../utilities/dateTimeFormatter.ts";
import { formatNumber } from "../utilities/numberFormater.ts";

interface PatientDataTable {
  matricule: string,
  nom: string,
  prenom: string,
  telephone: string,
  created_at: string
}

interface ExamsDataTable {
  code: string,
  laborentin: string,
  nomcli: string,
  prenomcli: string,
  statut: string,
  createdat: string
  prixtotal: number
  laborantins: [],
  modifier: number
}
interface Client {
  nom: string,
  prenom: string,
  email: string,
  telephone: string,
  fonction: string,
  statutFamilial: string,
  choixEntreprise: string,
  code: number
}
interface USersDataTable {
  code: string;
  nom: string;
  prenom: string;
  phone: string;
  fonction: string;
  service: string;
  mail: string;
}
interface Agent {
  nom: string,
  prenom: string,
  email: string,
  telephone: string,
  password: string,
  confirmPassword: string,
  code: number
}

interface Assurance {
  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  code: string
}

interface CompanyClient {
  nom: string,
  email: string,
  telephone: string,
  prenom: string,
  password: string,
  confirmpassword: string,
  matricule: string
}
interface CompanyUser {
  nom: string,
  email: string,
  telephone: string,
  prenom: string,
  password: string,
  confirmpassword: string,
  matricule: string
}

interface InsuredContract {
  nom: string,
  numberContract: string,
  taux: string,
  description: string,
  code: string
}

interface ContractInstitution {
  nom: string,
  numberContract: string,
  taux: string,
  description: string,
  code: string
}

interface Glassware {
  id: number;
  nomverre: string;
  symbole: string;
  couleur: string;
  colorName: string;
}

interface ExamsType {
  matricule: number;
  nom: string;
  prix: string;
  duree: number;
  valeurn: string;
}

interface BigExamsFamily {
  code: number;
  nomfmaille: string;
  creerle: string;
  modifier: string;
}

interface Bills {
  prixtotalfac: number,
  creerlefac: string,
  modifierlelefac: string,
  nomcli: string,
  prenomcli: string,
  prescripteur: string,
  codeexamen: string
}

interface FinancialStat {
  codefacture: string
  datecreation: string
  dernieremodification: string
  prixfacture: number
  codebonexamen: string
  nomclient: string
  prenomclient: string
  nomemploye: string
  nomagence: string
}
interface StatInsuredCompany {
  codefacture: string
  datecreation: string
  dernieremodification: string
  prixfacture: number
  codebonexamen: string
  nomexamen: string,
  nomclient: string
  prenomclient: string

}
interface ExamsFamily {
  matricule: string;
  nom: string;
  etat: number;
  created_at: string;
}

interface Unity {
  id: number,
  unite: string,
  codelabo: string,
  created_at: string,

}
interface Institution {

  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  PartageInfo: boolean,
  code: string
}

export function PatientTable({ data, simple }) {

  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            {!simple &&
              <th className="hidden">Code</th>
            }
            <th>Nom</th>
            <th className="hidden">Contact</th>
            {!simple &&
              <th className="hidden">Date de création</th>
            }
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: PatientDataTable, index: number) => (
            <tr key={index} className="table-cell">
              {!simple &&
                <td className="hidden">{item.matricule}</td>
              }
              <td className="hidden">
                {
                  (item.nom + " " + item.prenom).length > 10 ?
                    ((item.nom + " " + item.prenom).substring(0, 10) + "...") :
                    (item.nom + " " + item.prenom)
                }
              </td>
              <td className="hidden">{item.telephone}</td>
              {!simple &&
                <td className="hidden">
                  {formatDateTime(item.created_at)} (Depuis:{" "}
                  <strong>{dateTimeToPeriod(item.created_at)}</strong>)
                </td>
              }
              <td className="text-end">
                <Link
                  className="action-icon color-main"
                  to={`/patients/${item.matricule}`}
                >
                  <div className="icon-tooltip">
                    <span className="tooltip-text">Details du patient</span>
                    <AiFillEye className="icon-view" />
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function ExamsTable(props: any) {
  const { data, caisse, it, laboratory, simple, accueil } = props;
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "")

  function formatStatus(status: string, isBoxService: boolean = false) {
    if (status === "reçu") {
      if (isBoxService) {
        return "Non payé"
      }

      return "Reçu"
    }

    if (status === "terminer") {
      return "Terminé"
    }

    if (status === "encours") {
      return "En cours"
    }

    return "Annulé"
  }

  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">Code</th>
            {(params?.matricule || user?.nomservice === "laboratoire") ? <></> : <th>Patient</th>}
            {user?.nomservice === "caisse" &&
              <th className="text-center" >Prix</th>
            }
            {!simple &&
              <th className="hidden text-center">Date de création</th>
            }
            <th className="status-col hidden text-center">Status</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: ExamsDataTable, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item.code}</td>
              {(params?.matricule || user?.nomservice === "laboratoire") ? <></> : <td>{
                (item.nomcli + " " + item.prenomcli).length > 10 ?
                  ((item.nomcli + " " + item.prenomcli).substring(0, 10) + "...") :
                  (item.nomcli + " " + item.prenomcli)
              }</td>}
              {user?.nomservice === "caisse" &&
                <td className="text-center" >{formatNumber(item?.prixtotal)} $</td>
              }
              {!simple &&
                <td className="hidden text-center">

                  {formatDateTime(item.createdat)} (Depuis:{" "}
                  <strong>{dateTimeToPeriod(item.createdat)}</strong>)
                </td>
              }

              
              <td className="status-col hidden">
                <span className={"badge badge-" + item.statut}>
                  {formatStatus(item.statut, caisse)}
                </span>
              </td>
              <td className="action-col text-end">
                <div className="list-action-group">
                  <div className="action-icon color-main">
                    {caisse &&
                      <div className="icon-tooltip">
                        <span className="tooltip-text">Payer?</span>
                        <BsFillCreditCard2BackFill
                          className="icon-view"
                          onClick={() => props.showPrintable(item.code)}
                        />
                      </div>
                    }

                    {it &&
                      <div className="d-flex gap-10">
                        {(item?.statut === "terminer" || item?.statut === "encours") &&
                          <>
                            <div className="icon-tooltip">
                              <span className="tooltip-text">Resultat</span>
                              <BsFillPrinterFill
                                className="icon-view"
                                onClick={() => props.showPrintableResult(item.code)}
                              />
                            </div>
                            <div className="icon-tooltip">
                              <span className="tooltip-text">Imprimer</span>
                              <AiOutlineBarcode
                                className="icon-view"
                                onClick={() => props.showPrintableBarcode(item.code)}
                              />
                            </div>
                          </>
                        }
                        {item?.statut === "reçu" &&
                          <>
                            {item?.modifier === 0 ? <div className="icon-tooltip">
                              <span className="tooltip-text">Modifier</span>
                              <FaEdit
                                className="icon-edit"
                                onClick={() => props.showEditExam(item.code)}
                              />
                            </div> : <span></span>
                            }
                            {/* <div className="icon-tooltip">
                                <span className="tooltip-text">Supprimer</span>
                                <AiFillDelete
                                  className="icon-edit"
                                  onClick={() => props.showDeleteExam(item.code)}
                                />
                              </div> */}
                          </>
                        }
                      </div>
                    }
                    {(!it && !caisse && !laboratory && user?.nomservice !== "prelevement") &&
                      <div className="d-flex gap-10">
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Imprimer</span>
                          <BsFillPrinterFill
                            className="icon-view"
                            onClick={() => props.showPrintable(item.code)}
                          />
                        </div>
                        {accueil &&
                          <>
                            {item?.statut === "reçu" &&
                              <>
                                {item?.modifier === 0 ? <div className="icon-tooltip">
                                  <span className="tooltip-text">Modifier</span>
                                  <FaEdit
                                    className="icon-edit"
                                    onClick={() => props.showEditExam(item.code)}
                                  />
                                </div> : <span></span>
                                }

                              </>
                            }
                          </>
                        }
                      </div>
                    }
                  </div>
                  {laboratory &&
                    <Link className="action-icon" to={`/exams/exams_code=${item?.code}`}>
                      {item?.statut === "terminer" ?
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Plus de détails</span>
                          <AiFillEye className="icon-view" /></div> :
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Resultats</span>
                          <FaEdit className="icon-edit" /></div>
                      }
                    </Link>
                  }

                  {user?.nomservice === "prelevement" &&
                    <div className="d-flex gap-10">
                      <Link
                        className="action-icon"
                        to="#"
                        onClick={() => props.showRecordSample(item?.code)}
                      >
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Préléver</span>
                          <AiFillEye className="icon-view" />
                        </div>

                      </Link>
                      <Link
                        className="action-icon"
                        to="#"
                        onClick={() => props.showPrintable(item.code)}
                      >
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Imprimer</span>
                          <BsFillPrinterFill
                            className="icon-view"
                          />
                        </div>
                      </Link>
                    </div>
                  }

                  {(!it && !caisse && !laboratory && user?.fonction === "admin") &&
                    <>
                      <Link className="action-icon" to={`/exams/exams_code=${item?.code}`}>
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Plus de détails</span>
                          <AiFillEye className="icon-view" />
                        </div>
                      </Link>
                    </>
                  }
                  {user.nomservice === "it" &&
                    <>
                      <Link className="action-icon"
                        onClick={() => props.showTransfer(item?.code)}
                        to={`#`}
                      >
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Transferer le bon</span>
                          <AiOutlineSend className="icon-view" />
                        </div>
                      </Link>
                    </>
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function UsersTable({ data }) {

  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th className="hidden">Prénom</th>
            <th className="hidden">Téléphone</th>
            <th className="hidden">Adresse email</th>
            <th className="hidden">Spécialité</th>
            {/* <th className="hidden">Service</th> */}
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: USersDataTable, index: number) => (
            <tr key={index} className="table-cell">
              <td>{item?.code}</td>
              <td>{item?.nom}</td>
              <td className="hidden">{item?.prenom}</td>
              <td className="hidden">{item.phone}</td>
              <td className="hidden">{item.mail}</td>
              <td className="hidden">{item.specialite ? item?.specialite : "-"}</td>

              {/* <td className="hidden">{item.nomservice}</td> */}
              <td>
                <div className="list-action-group">
                  <Link className="action-icon" to={`/employees/employee-id=${item?.code}`}>
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Détails</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function GlasswareTable({ data, showUpdateForm }) {
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="hidden">N°</th>
            <th>Nom du tube</th>
            <th className="hidden text-center">Symbole</th>
            <th className="text-center">Couleur</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Glassware, index: number) => (
            <tr key={index} className="table-cell">
              <td className="hidden">{item.id}</td>
              <td>{item.nomverre}</td>
              <td className="text-center">{item.symbole}</td>
              <td className="hidden text-center">
                <div
                  style={{
                    backgroundColor: `#${item.couleur.split("_")[1]
                      }`,
                    color: `${item.couleur.includes("_") ? item.couleur.split("_")[0] !== "Blanche" && "#fff" : "#000"
                      }`,
                    padding: "10px 20px",
                    textAlign: "center",
                    border: "solid 1px #a9cae8"
                  }}
                >
                  {item.couleur.split("_")[0]}
                </div>
              </td>
              <td>
                <div className="list-action-group">
                  <Link
                    onClick={() => showUpdateForm(item?.id)}
                    className="action-icon"
                    to={`#`}>
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit" />
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function ExamsTypeTable(props: any) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="hidden">N°</th>
            <th>Examen</th>
            <th className="hidden text-center">Prix</th>
            <th className="hidden text-center">Durée de traitement</th>
            <th className="hidden text-center">Valeur normale</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length < 0 ? (
            <h1>Aucun type trouvé</h1>
          ) : (
            <>
              {data?.map((item: ExamsType, index: number) => (
                <tr key={index} className="table-cell">
                  <td className="hidden">{item.matricule}</td>
                  <td>{item.nom}</td>
                  <td className="hidden text-center">{formatNumber(item.prix ? item.prix : 0)} $</td>
                  <td className="hidden text-center">{item.duree ? <>{item.duree > 1 ? `${item.duree} Jours` : `${item.duree} Jour`}</> : "N/S"}</td>
                  <td className="hidden text-center">{item.valeurn ? item.valeurn : "N/S"}</td>
                  <td>
                    <div className="list-action-group">
                      <Link className="action-icon" to={`#`}>
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Plus de détails</span>
                          <AiFillEye className="icon-view" />
                        </div>
                      </Link>
                      <Link
                        className="action-icon"
                        to={`#`}
                        onClick={() => props.showUpdateExamType(item.matricule)}
                      >
                        <div className="icon-tooltip">
                          <span className="tooltip-text">Modifier</span>
                          <FaEdit className="icon-edit" />
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </Fragment>
  );
}

export function ExamsFamilyTable(props: any) {

  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="hidden">Matricule</th>
            <th>Type examen</th>
            {/* <th className="hidden text-center">Etat</th> */}
            <th className="hidden text-end">Date de création</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item: ExamsFamily, index: number) => (
            <tr key={index} className="table-cell">
              <td className="hidden">{item.matricule}</td>
              <td>{item.nom}</td>
              {/* <td className="hidden text-center">{item.etat}</td> */}
              <td className="hidden text-end">
                {formatDateTime(item.created_at)} (Depuis:{" "}
                <strong>{dateTimeToPeriod(item.created_at)}</strong>)
              </td>
              <td>
                <div className="list-action-group">
                  <Link
                    className="action-icon"
                    to={`#`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"
                        onClick={() => props.showEditExamFamily(item?.matricule)}
                      />
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function BigExamsFamilyTable(props: any) {

  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="hidden">code</th>
            <th>Famille examen</th>
            {/* <th className="hidden text-center">Etat</th> */}
            <th className="hidden text-end">Date de création</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item: BigExamsFamily, index: number) => (
            <tr key={index} className="table-cell">
              <td className="hidden">{item.code}</td>
              <td>{item.nomfmaille}</td>
              {/* <td className="hidden text-center">{item.etat}</td> */}
              <td className="hidden text-end">
                {formatDateTime(item.creerle)} (Depuis:{" "}
                <strong>{dateTimeToPeriod(item.creerle)}</strong>)
              </td>
              <td>
                <div className="list-action-group">
                  <Link
                    className="action-icon"
                    to={`#`}
                    onClick={() => props.showEditBigFamily(item.code)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}


export function BillsTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">Code</th>
            <th>Patient</th>
            <th className="hidden">Prescripteur</th>
            <th className="">Prix</th>
            <th className="hidden">Date de création</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Bills, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item.codeexamen}</td>
              <td>
                {
                  (item.nomcli + " " + item.prenomcli).length > 10 ?
                    ((item.nomcli + " " + item.prenomcli).substring(0, 10) + "...") :
                    (item.nomcli + " " + item.prenomcli)
                }
              </td>
              <td className="hidden">{item.prescripteur}</td>
              <td className="d-flex gap-10">{formatNumber(item.prixtotalfac)} <span>$</span></td>
              <td className="hidden">
                {formatDateTime(item.creerlefac)} (Depuis:{" "}
                <strong>{dateTimeToPeriod(item.creerlefac)}</strong>)
              </td>
              <td>
                <div className="list-action-group">
                  <Link
                    className="action-icon"
                    to="#"
                    onClick={() => props.showPrintable(item.codeexamen)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Imprimer</span>
                      <BsFillPrinterFill className="icon-view" />
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function FinancialTable(props) {
  const { data } = props;
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">Code</th>
            <th>Patient</th>
            <th>Prescripteur</th>
            <th className="hidden">Montant</th>
            <th className="hidden text-end">Date de création</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: FinancialStat, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item.codefacture}</td>
              <td>{item.nomclient + " " + item.prenomclient}</td>
              <td className="hidden">{item.nomemploye}</td>
              <td className="hidden d-flex gap-10">{formatNumber(item.prixfacture)} <span>$</span></td>
              <td className="hidden text-end">
                {formatDateTime(item.datecreation)} (Depuis:{" "}
                <strong>{dateTimeToPeriod(item.datecreation)}</strong>)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function UnityTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">Numero</th>
            <th>Unités</th>
            <th className="hidden">Date de création</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Unity, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item.id}</td>
              <td>{item.unite}</td>
              <td className="hidden">
                {formatDateTime(item.created_at)} (Depuis:{" "}
                <strong>{dateTimeToPeriod(item.created_at)}</strong>)
              </td>
              <td>
                <div className="list-action-group">
                  <Link
                    className="action-icon"
                    to={`#`}
                    onClick={() => props.showEditUnity(item?.id)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}


export function AssuranceTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom</th>
            <th>Telephone</th>
            <th className="hidden">Email</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Assurance, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.code}</td>
              <td>{item.nom}</td>
              <td>
                {item.telephone}
              </td>
              <td className="hidden">
                {item.email}
              </td>
              <td>
                <div className="list-action-group">
                  <Link
                    className="action-icon"
                    to={`#`}
                    onClick={() => props.showEditCompagny(item?.code)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link>
                  <Link
                    className="action-icon"
                    to={`/assurances/${item?.code}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details Compagnies</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function InsuredContractTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom du contrat</th>
            <th>taux de reduction</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: InsuredContract, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.code}</td>
              <td>{item.nom}</td>
              <td>
                {item.taux}
              </td>
              <td>
                <div className="list-action-group">
                  {/* <Link
                    className="action-icon"
                    to={`#`}
                    onClick={()=> props.showEditCompagny(item?.code)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link> */}
                  <Link
                    className="action-icon"
                    to={`/contract/${item?.code}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details Compagnies</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function CompanyUserTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom </th>
            <th>Téléphone</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: CompanyUser, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.matricule}</td>
              <td>{item?.nom} {item?.prenom}</td>
              <td>{item?.telephone}</td>
              <td>
                <div className="list-action-group">
                  {/* <Link
                    className="action-icon"
                    to={`#`}
                    onClick={()=> props.showEditCompagny(item?.matricule)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link> */}
                  <Link
                    className="action-icon"
                    to={`/details-agent/${item?.matricule}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function CompanyClientTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom </th>
            <th>Téléphone</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: CompanyClient, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.matricule}</td>
              <td>{item.nom} {item.prenom}</td>
              <td>{item.telephone}</td>
              <td>
                <div className="list-action-group">
                  {/* <Link
                    className="action-icon"
                    to={`#`}
                    onClick={()=> props.showEditCompagny(item?.matricule)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link> */}
                  <Link
                    className="action-icon"
                    to={`/details-client/${item?.matricule}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function InstitutionTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom</th>
            <th>Telephone</th>
            <th className="hidden">Email</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Institution, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.code}</td>
              <td>{item.nom}</td>
              <td>
                {item.telephone}
              </td>
              <td className="hidden">
                {item.email}
              </td>
              <td>
                <div className="list-action-group">
                  <Link
                    className="action-icon"
                    to={`#`}
                    onClick={() => props.showEditCompagny(item?.code)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link>
                  <Link
                    className="action-icon"
                    to={`/institutions/${item?.code}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details Institution</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
export function ClientsTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th className="hidden">Email</th>
            <th>Telephone</th>
            <th>Fonction</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Client, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.code}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td className="hidden">
                {item.email}
              </td>
              <td>
                {item.telephone}
              </td>
              <td>
                {item.fonction}
              </td>
              <td>
                <div className="list-action-group">
                  {/* <Link
                    className="action-icon"
                    to={`#`}
                    onClick={() => props.showEditCompagny(item?.code)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link> */}
                  <Link
                    className="action-icon"
                    to={`/clients/${item?.code}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details Client</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function AgentsTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th className="hidden">Email</th>
            <th>Telephone</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Agent, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.code}</td>
              <td>{item?.nom}</td>
              <td>{item?.prenom}</td>
              <td className="hidden">
                {item?.email}
              </td>
              <td>
                {item?.telephone}
              </td>
              <td>
                <div className="list-action-group">
                  {/* <Link
                    className="action-icon"
                    to={`#`}
                    onClick={() => props.showEditCompagny(item?.code)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link> */}
                  <Link
                    className="action-icon"
                    to={`/agents/${item?.code}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details Agent</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function StatInsuredCompanyTable(props) {
  const { data } = props;
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">Code</th>
            <th>Client</th>
            <th >Examen</th>
            <th >Montant</th>
            <th className="hidden text-end">Date examen</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: StatInsuredCompany, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item.codefacture}</td>
              <td>{item.nomclient + " " + item.prenomclient}</td>
              <td className="code-col hidden">{item.nomexamen}</td>
              <td className="hidden d-flex gap-10">{formatNumber(item.prixfacture)} <span>$</span></td>
              {/* <td className="hidden text-end">
                {formatDateTime(item.datecreation)} (Depuis:{" "}
                <strong>{dateTimeToPeriod(item.datecreation)}</strong>)
              </td> */}
              <td className="hidden text-end">
                {item.datecreation} (Depuis:{" "}
                <strong>{item.datecreation}</strong>)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export function ContractInstitutionTable(props) {
  const { data } = props
  return (
    <Fragment>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="code-col hidden">code</th>
            <th>Nom du contrat</th>
            <th>taux de reduction</th>
            <th className="action-col text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: ContractInstitution, index: number) => (
            <tr key={index} className="table-cell">
              <td className="code-col hidden">{item?.code}</td>
              <td>{item.nom}</td>
              <td>
                {item.taux}
              </td>
              <td>
                <div className="list-action-group">
                  {/* <Link
                    className="action-icon"
                    to={`#`}
                    onClick={()=> props.showEditCompagny(item?.code)}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Modifier</span>
                      <FaEdit className="icon-edit"

                      />
                    </div>
                  </Link> */}
                  <Link
                    className="action-icon"
                    to={`/contract/${item?.code}`}
                  >
                    <div className="icon-tooltip">
                      <span className="tooltip-text">Details contrat</span>
                      <AiFillEye className="icon-view" />
                    </div>
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
