import React, { Fragment, useEffect, useRef, useState } from 'react';
import callApi, { notification } from "../../../Utils/Utils.tsx";
import siteLogo from "../../assets/site-logo.png";
import ReactToPrint from 'react-to-print';
import { Puff } from "react-loader-spinner";
import { formatNumber } from "../../utilities/numberFormater.ts";

interface TypeExam {
    nomtype: string;
    prixtype: string;
    dureetype: string;
}
  

  
interface BillDetails {
  codefac:string,
    nomlabo: string;
    telephonelabo: string;
    emaillabo: string;
    payslabo: string;
    villelabo: number;
    regionlabo: string;
    ruelabo: string;
    logolabo: string;
    nomemploye: string;
    prenomemploye: string;
    prixtotalfac: string;
    creerlefac: string;
    modifierlelefac: string;
    nomcli: string;
    prenomcli: string;
    telephonecli: string;
    emailcli: string;
    adressecli: string;
    prescripteur: string;
    codeexamen: string;
    types: [TypeExam];
}
interface IProps {
    data: BillDetails;
    idExam: String;
}


export default function BillPrintable({ idExam }: IProps) {
    const [loading, setLoading] = useState(false);
    
    const [singleBill, setSingleBill] = useState<BillDetails>();
    let componentRef = useRef();
    const user = JSON.parse(localStorage.getItem("user") || "");

      
    const handleFetchSingleBill = async () => {
      setLoading(true)
        let response = await callApi(true, `specificfacture/${idExam}/${user?.matricule}`, "get", null);
        if (response?.data?.success) {
          setLoading(false)
        let result = response.data.data;
        setSingleBill(result);
          console.log(result);
        }
    };

    useEffect(() => {
        let isMounted = true;
        isMounted && handleFetchSingleBill();
        return () => {
        isMounted = false;
        };
    }, []);

  return (
    <Fragment>
      {loading? 
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
        </div>:
      <div className="printable-wrapper p-30" ref={(el) => (componentRef = el)}>
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
                  Noms du Patient : {singleBill?.nomcli + " " + singleBill?.prenomcli}
                </li>
                  <li className="patient-info-item">Adresse Domicile : {singleBill?.adressecli}</li>
                <li className="patient-info-item">
                    N° de Téléphone : {singleBill?.telephonecli}
                </li>
                <li className="patient-info-item">
                    Adresse Mail:{singleBill?.emailcli}
                </li>
                <li className="patient-info-item">
                  N° Dossier: {singleBill?.codeexamen}
                </li>
                <li className="patient-info-item">
                  N° Facture: {singleBill?.codefac}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h1 className="printable-headline">Facture d'examens</h1>
        <div className="printable-body">
          <div className="body-header">
            <div className="grid-2">
              <div className="doctor-info">
                <ul className="doctor-info-items">
                  <li className="doctor-info-item">
                    Noms du Médecin Demandeur :
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
            <table className="exam-content-table">
              <thead className="content-table-header">
                <tr>
                  <th>Examen</th>
                  <th className='text-center'>Prix examen</th>
                  <th className='text-center'>Durée</th>
                </tr>
              </thead>
              <tbody>
                {singleBill?.types?.map((item, index) =>
                    <tr key={index}>
                        <td className='table-cell p-8'>
                            {item?.nomtype}
                        </td>
                        <td className='table-cell p-8 text-center'>
                            {formatNumber(item?.prixtype)} $
                        </td>
                        <td className='table-cell p-8 text-center'>
                            {item?.dureetype}
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
            <div className="price-container">
              <p>Prix Total: <span>{formatNumber(singleBill?.prixtotalfac)} $</span></p>
            </div>
          </div>
        </div>
        </div>}
        <ReactToPrint
          documentTitle= {`facture-d'analyse-pour-${singleBill?.nomcli+ "-" + singleBill?.prenomcli}`}
          trigger={() => <button className="btn btn-mains"> Imprimer</button>}
          content={() => componentRef}
        />
    </Fragment>
  );
}
