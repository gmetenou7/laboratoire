import React, { Fragment, useRef, useState } from 'react';
import {
    formatDateTime,
    dateTimeToPeriod
} from "../../component/utilities/dateTimeFormatter.ts";
import {
    formatNumber
} from "../../component/utilities/numberFormater.ts";
import ReactToPrint from "react-to-print";
import tamp from "../../component/assets/tamp.png"
import { log } from 'console';

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

export default function FinancialPrintable({ data, price }) {
    let componentRef: any = useRef();
   
    return (
        <Fragment>
            <div
                ref={(el: any) => (componentRef = el)}
                className="financial-printable-wrapper exam-result-container"
            >
                <div className="result-content">
                    <h1 className='exam-result-header text-center'>ETAT FINANCIERE   </h1>
                </div>
                 
                <table className="table">
                    <thead className="table-header">
                        <th className="code-col hidden">Code</th>
                        <th>Patient</th>
                        <th>Prescripteur</th>
                        <th className="hidden">Montant</th>
                        <th className="hidden text-end">Date de création</th>
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
                <div className="price-container">
                    <p className='pricing'>
                        Prix Total:
                        <span>
                            {formatNumber(price)} $
                        </span>
                    </p>
                </div>
                 
                <div className="result-exam-footer">
                    <hr />
                    <p><strong>C</strong>entre de <strong>d</strong>épistage et de <strong>d</strong>iagnostic Le <strong>M</strong>agnolia I ASBL N° 92/4311 98 Avenue de la Justice I Commune de la Gombe Ville Province de Kinshasa</p>
                    <p>Téléphone : <strong>+243977775757 ; +243999217917</strong></p>
                </div>
            </div>
            <div className="printable-footer">
                <ReactToPrint
                    documentTitle={"etat-finacier"}
                    trigger={() => <button className="btn btn-main"> Terminer l'impression</button>}
                    content={() => componentRef}
                />
            </div>
        </Fragment>
    )
}
