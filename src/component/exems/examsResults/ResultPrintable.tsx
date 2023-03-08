import React, { useEffect, useRef, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import ReactToPrint from 'react-to-print';
import callApi from "../../../Utils/Utils.tsx";
import { formatDateTime } from "../../../component/utilities/dateTimeFormatter.ts"
import QRCode from "react-qr-code";
import tamp from "../../../component/assets/tamp-re.png"

interface ReferenceValue {
    code: number,
    intitule: string,
    description: string,
    codeexamen_type: string,
    valeur_reference1: string,
    valeur_reference2: string,
    code_examen: string
}
interface TypeExam {
    codetype: string,
    prixtotaltype: string,
    resultatrelevetype: string,
    nomtype: string,
    dureeanalyse: string,
    veleur_reference: [ReferenceValue],
    unite: string,
    nomverre: string,
    symboleverre: string,
    couleurverre: string,
    gras: number
}
interface ExamFamily {
    codefamille: string,
    nomfamille: string,
    decisionexam: string,
    comment: string,
    types: [TypeExam],
}
interface DataExamResultDetails {
    codeexamen: string,
    comments: string,
    medecindemandeur: string,
    createat: string,
    updateat: string,
    prixtotalexam: string,
    codestatusexamen: number,
    decriptionexam: string,
    nomlaborentin: string,
    prenomlaborentin: string,
    nomcli: string,
    prenomcli: string,
    emailcli: string,
    sexe: string,
    ageclient: string,
    telephone: string,
    nomlabo: string,
    telephonelabo: string,
    emaillabo: string,
    payslabo: string,
    villelabo: string,
    regionlabo: string,
    ruelabo: string,
    logolabo: string,
    examen: [ExamFamily],
}
export function ResultPrintable({ examId }) {
    const [resultExam, setResultExam] = useState<DataExamResultDetails>();
    const [isMounted, setIsMounted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingSendExam, setLoadingSendExam] = useState(false)

    let componentRef: any = useRef();

    async function fetchResultExam() {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                "specificexamens",
                'post',
                {
                    codebon: examId,
                },
                null
            );
            if (response?.data?.success) {
                setLoading(false)
                setResultExam(response?.data?.data);
                console.log(response?.data?.data);
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)

        }
    };


    async function sendResultExam() {
        setLoadingSendExam(true)
        try {
            const response = await callApi(
                true,
                `sendresulttoclient/${examId}`,
                'get',
                null
            );
            if (response?.data?.success) {

                setLoadingSendExam(false)
            } else {
                setLoadingSendExam(false);
            }
        } catch (error) {
            setLoadingSendExam(false);
        }
    };


    useEffect(() => {
        if (isMounted) {
            fetchResultExam();
        }
        return () => {
            setIsMounted(false)
        }
    }, [isMounted, setIsMounted]);


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
                <div className='exam-result-container' ref={(el) => (componentRef = el)}>
                    <div className="result-content">
                        <h1 className='exam-result-header text-center'>RAPPORT D’ANALYSE DE LABORATOIRE</h1>
                        <div className="result-exam-info">
                            <h4 className="exam-info-header">
                                1. IDENTITE DU PATIENT
                            </h4>
                            <div className="patient-info">
                                <div className="info-detail">
                                    <ul className="">
                                        <li>Nom: <span>{resultExam?.nomcli}</span></li>
                                        <li>Prénom: <span>{resultExam?.prenomcli}</span></li>
                                        <li>Age: <span>{resultExam?.ageclient}</span></li>
                                        <li>Sexe: <span>{resultExam?.sexe}</span></li>
                                    </ul>
                                    <ul className="">
                                        <li>CATEGORIE: <span>Privé(e)</span></li>
                                        <li>NATURE ECHANTILLON: </li>
                                        <li>DATE DE PRELEVEMENT: <span>{formatDateTime(resultExam?.createat)}</span></li>
                                    </ul>
                                </div>
                                <u>
                                    <QRCode
                                        value={examId}
                                        size={80}
                                    />
                                </u>
                            </div>
                            <hr />
                        </div>
                        <div className="exam-result-body">
                            <h4 className="exam-info-header">
                                2. Résultat des examens
                            </h4>
                            {resultExam?.examen?.map((exam, index) =>
                                <div className='result-content'>
                                    <h5>2.{index + 1} {exam?.nomfamille}</h5>
                                    <table>
                                        <thead>
                                            <th className='width-40 text-start'>
                                                Examen
                                            </th>
                                            <th className='width-25 text-center'>
                                                Résultat
                                            </th>
                                            <th className='width-25 text-center'>
                                                Valeur normale
                                            </th>
                                            <th className='width-10 text-center'>
                                                Unité
                                            </th>
                                        </thead>
                                        <tbody>
                                            {exam?.types?.map((item, index) =>
                                                <tr>
                                                    <td className='width-40 text-start'>
                                                        <strong>{item?.nomtype}</strong>
                                                    </td>
                                                    <td className='width-25 text-center'>
                                                        {item?.resultatrelevetype ? item?.resultatrelevetype : "En attente"}
                                                    </td>
                                                    <td className='width-25 text-center'>
                                                        {item?.veleur_reference?.length > 0 ?
                                                            <ul className='exam-normal-values'>
                                                                {item?.veleur_reference?.slice(0, 5).map((item, index) =>
                                                                    <li key={index}>
                                                                        {item?.valeur_reference2 && "["}{item.valeur_reference1}{item?.valeur_reference2 && "-"}{item.valeur_reference2}{item?.valeur_reference2 && "]"}
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            :
                                                            "N/S"
                                                        }
                                                    </td>
                                                    <td className='width-10 text-center'>
                                                        {item?.unite ? item?.unite : "N/S"}
                                                    </td>
                                                </tr>

                                            )}
                                        </tbody>
                                    </table>
                                    {exam?.comment &&
                                        <p className="comment">Commentaire: <span>{exam.comment}</span></p>
                                    }
                                </div>
                            )}
                            <hr />
                            <div className="other-infos">
                                <div className="other-infos-content">
                                    <p className='mt-20'>Commentaires: {resultExam?.comments && resultExam?.comments} </p>
                                    <p className='mt-70'>Date de Rapport: <span>{formatDateTime(resultExam?.updateat)}</span></p>

                                    <p className='mt-20'>Les analyses sont certifiées correctes</p>
                                    <p className='mt-10'>Pour le Laboratoire</p>
                                    <p className='mt-10'><strong>Dr. KABAMBA NUMBI</strong></p>
                                    <p className='mt-10'>Médecin biologiste</p>
                                </div>
                                <div className="tamp">
                                    <img src={tamp} alt="tamp" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="result-exam-footer">
                        <hr />
                        <p><strong>C</strong>entre de <strong>d</strong>épistage et diagnostic Le <strong>M</strong>agnolia 
                             I ASBL N° 92/4311 98 Avenue de la 
                            Justice I Commune de la Gombe Ville Province de Kinshasa 
                        </p>
                        <p>Téléphone : <strong>+243977775757 ; +243999217917</strong></p>
                    </div>
                </div>}
            <div className='modal-content-footer'>
                <ReactToPrint
                    documentTitle={`résultat-d'analyse-pour-${resultExam?.nomcli + "-" + resultExam?.prenomcli}`}
                    trigger={() => <button className="btn btn-main"> Imprimer</button>}
                    content={() => componentRef}
                />
                <button className='btn btn-main-blue'
                    onClick={sendResultExam}
                >Envoyer par mail
                    {loadingSendExam &&
                        <Puff
                            height="30"
                            width="30"
                            radius={1}
                            color="#528F01"
                            ariaLabel="puff-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    }
                </button>

            </div>

        </>
    )
}
