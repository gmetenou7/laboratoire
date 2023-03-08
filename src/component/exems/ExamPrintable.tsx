import React, { Fragment, useEffect, useRef, useState } from "react";
import siteLogo from "../assets/site-logo.png";
import callApi, { notification } from "../../Utils/Utils.tsx";
import ReactToPrint from "react-to-print";
import { Puff } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { listExamsThunk } from "../../features/examSlice.ts";
import Barcode from "react-barcode";
import { RiErrorWarningFill } from "react-icons/ri";
import { showModalReducer } from "../../features/modalSlice.ts"
import { formatNumber } from "../utilities/numberFormater.ts";
import BillPrintable from "./bills/BillPrintable.tsx";


interface TypeExam {
  codetype: string;
  prixtotaltype: string;
  resultatrelevetype: string;
  nomtype: string;
  dureeanalyse: string;
  veleurnormaletype: string;
  unitemesuretype: string;
  nomverre: string;
  symboleverre: string;
  couleurverre: string;
}

interface ExamFamily {
  codefamille: string;
  nomfamille: string;
  decisionexam: string;
  types: [TypeExam];
}

interface ExamDetails {
  codeexamen: string;
  medecindemandeur: string;
  createat: string;
  updateat: string;
  prixtotalexam: string;
  codestatusexamen: number;
  decriptionexam: string;
  nomlaborentin: string;
  prenomlaborentin: string;
  nomcli: string;
  prenomcli: string;
  emailcli: string;
  adressecli: string;
  sexe: string;
  ageclient: string;
  telephone: string;
  nomlabo: string;
  telephonelabo: string;
  emaillabo: string;
  payslabo: string;
  villelabo: string;
  regionlabo: string;
  ruelabo: string;
  logolabo: string;
  examen: [ExamFamily];
}
interface IProps {
  data: ExamDetails;
  idExam: string;
  caisse: Boolean;
}

export function ExamPrintable({ idExam, caisse }: IProps) {
  const [singleExam, setSingleExam] = useState<ExamDetails>();
  const [loadingPay, setLoadingPay] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [confirmPayement, setConfirmPayment] = useState<Boolean>(false)
  let componentRef: any = useRef();
  const user = JSON.parse(localStorage.getItem("user") || "")

  const dispatch = useDispatch()

  function handleShowPrintableExam(id_exam: String) {
    dispatch(
      showModalReducer({
        header: `Facture pour le bon N°: ${id_exam}`,
        active: true,
        body: <BillPrintable idExam={id_exam} />
      })
    );
  }

  const handleFetchSingleExam = async () => {
    setLoading(true)
    const response = await callApi(
      true,
      "specificexamens",
      'post',
      {
        codebon: idExam,
      },
      null
    );
    if (response?.data?.success) {
      const result = response.data.data;
      setSingleExam(result);
      console.log("Single", result);

      setLoading(false)
    }
  };

  async function handlePayExam() {
    const user = JSON.parse(localStorage.getItem("user") || "");
    setLoadingPay(true);
    const response = await callApi(
      true,
      `specificfacture/${idExam}/${user?.matricule}`,
      "get"
    );
    setLoadingPay(false);
    if (response && response.data.success) {
      const exam_created = response.data.data;
      // console.log("aaaaaaaaaaaa", exam_created.codefac);

      // return
      handleShowPrintableExam(exam_created.codeexamen);
      dispatch(
        listExamsThunk({
          matricule_labo: user?.matricule_labo,
          matricule_ag: user?.matricule_ag
        })

      )

      notification("success", "paiement effectué avec succès");
      // dispatch(
      //   closeModalReducer()
      // )
    }
  }


  useEffect(() => {
    // git
    let isMounted = true;
    isMounted && handleFetchSingleExam();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {loading ?
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
        <Fragment>
          <div className="printable-wrapper p-30" ref={(el: any) => (componentRef = el)}>
            <div className="printable-header">
              <div className="grid-2">
                <div className="company-info">
                  <img className="company-logo" src={siteLogo} alt="logo" />
                  <ul className="company-info-items">
                    <li className="company-info-item">LABORATOIRE BIO-MEDICAL</li>
                    <li className="company-info-item">RCCM</li>
                    <li className="company-info-item">
                      (+243) 977 775 757 - (+243) 999 217 917
                    </li>
                    <li className="company-info-item">info@lemagnolia.org</li>
                    <li className="company-info-item">
                      98 C, Av. Justice Gombe Kinshasa RDC
                    </li>
                  </ul>
                </div>
                <div className="patient-info">
                  <ul className="patient-info-items">
                    <li className="patient-info-item">
                      Noms du Patient : {singleExam?.nomcli + " " + singleExam?.prenomcli}
                    </li>
                    <li className="patient-info-item">Sexe : {singleExam?.sexe}</li>
                    <li className="patient-info-item">Age : {singleExam?.ageclient}</li>
                    <li className="patient-info-item">Adresse Domicile: {singleExam?.adressecli}</li>
                    <li className="patient-info-item">
                      N° de Téléphone :{singleExam?.telephone}
                    </li>
                    <li className="patient-info-item">
                      Adresse Mail: {singleExam?.emailcli}
                    </li>
                    <li className="patient-info-item">
                      <Barcode
                        value={idExam}
                        format="CODE128"
                        width={1.25}
                        height={40}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h1 className="printable-headline">BON DES EXAMENS</h1>
            <div className="printable-body">
              <div className="body-header">
                <div className="grid-2">
                  <div className="doctor-info">
                    <ul className="doctor-info-items">
                      <li className="doctor-info-item">
                        Noms du Médecin Demandeur : {singleExam?.medecindemandeur}
                      </li>
                      <li className="doctor-info-item">
                        Nom du Centre ou Hôpital :{" "}
                      </li>
                      <li className="doctor-info-item">Adresse : 1</li>
                      <li className="doctor-info-item">N° de Téléphone : </li>
                      <li className="doctor-info-item">Adresse Mail : </li>
                    </ul>
                  </div>
                  <div className="exam-state">
                    <ul className="exam-state-items">
                      <li className="exam-state-item">Noms du Préleveur :</li>
                      <li className="exam-state-item">
                        Date et Heure de Prélèvement :{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="exam-content">
                <table
                  style={{
                    borderCollapse: "collapse"
                  }}
                  className="exam-content-table">
                  <thead className="content-table-header">
                    <tr>
                      <th>Type examen</th>
                      <th>Examen</th>
                      <th className="text-center">Tube</th>
                      {user?.nomservice !== "prelevement" &&
                        <th>Prix examen</th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {singleExam?.examen?.map((item) => (
                      <tr>
                        <td className="table-cell p-8">{item?.nomfamille}</td>
                        <td className="table-cell">
                          <table className="nested-table">
                            {item.types?.map((items: TypeExam) => (
                              <tr key={items.codetype}>
                                <td className="table-cell-nested p-8">
                                  {items.nomtype}
                                </td>
                              </tr>
                            ))}
                          </table>
                        </td>
                        <td className="table-cell">
                          <table className="nested-table">
                            {item.types?.map((items: TypeExam) => (
                              <tr>
                                <td className="table-cell-nested">
                                  <div
                                    className="text-center"
                                    key={items.codetype}
                                    style={{
                                      backgroundColor: `#${items?.couleurverre?.split("_")[1]
                                        }`,
                                      color: `${items?.couleurverre?.includes("_") ? items?.couleurverre?.split("_")[0] !== "Blanche" && "#fff" : "#000"
                                        }`,
                                      textAlign: "center",
                                      border: "solid 1px #a9cae8",
                                      width: "100%",
                                      padding: "8px"
                                    }}>
                                    {items?.nomverre}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </td>
                        {user?.nomservice !== "prelevement" &&
                          <td className="table-cell">
                            <table className="nested-table">
                              {item.types?.map((items: TypeExam) => (
                                <tr key={items.codetype}>
                                  <td className="table-cell-nested p-8">{formatNumber(items.prixtotaltype)} $</td>
                                </tr>
                              ))}
                            </table>
                          </td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
                {user?.nomservice !== "prelevement" &&
                  <>
                    <div className="mt-20">
                      <p className="exam-state-item"> <span >Taux de reduction %: ...</span></p>
                      <p className="exam-state-item"><span>Montant reduit: ...</span></p>
                      <p className="exam-state-item">Prix Total: <span>{formatNumber(singleExam?.prixtotalexam)} $</span></p>
                    </div>
                    <div className="price-container">
                      {singleExam?.prixtotalexam &&
                        <p>Net A Payer: <span>{formatNumber(singleExam?.prixtotalexam)} $</span></p>
                      }
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
          {caisse ? (
            <>
              {confirmPayement &&
                <div className="confirm-popup">
                  <div className="confirm-popup-header">
                    <RiErrorWarningFill className="popup-header-icon" />
                    <h5 className="popup-header-text">Confirmer l'action</h5>
                  </div>
                  <div className="confirm-popup-body">
                    <p className="popup-body-text">Est-vous sure de vouloir effectuer ce paiement ?</p>
                  </div>
                  <div className="confirm-popup-footer">
                    <button className="popup-btn-main" onClick={handlePayExam}>
                      <span>Confirmer et payer</span>
                      {loadingPay && (
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
                    <button className="popup-btn-second" onClick={() => setConfirmPayment(false)}>
                      Annuler
                    </button>
                  </div>
                </div>
              }
              <button className="btn btn-main" onClick={() => setConfirmPayment(true)}>
                Payer le bon N°: <strong>{idExam}</strong>
              </button>
            </>
          ) : (
            <ReactToPrint
              documentTitle={`Bon-d'examen-pour-${singleExam?.nomcli + "-" + singleExam?.prenomcli}`}
              trigger={() => <button className="btn btn-main"> Imprimer</button>}
              content={() => componentRef}
            />
          )}
        </Fragment>}
    </>
  );
}
