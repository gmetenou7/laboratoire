import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import callApi from "./../../../Utils/Utils.tsx"


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

interface DataExamResultDetails {
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
export function ResultExamPrintablr() {

    const params = useParams();
    const [resultExam, setResultExam] = useState<DataExamResultDetails>()
    const [isMounted, setIsMounted] = useState(true);

    async function fetchResultExam() {

        try {
            const response = await callApi(
                true,
                `examens/${params?.code}`,
                'get',
                null
            );
            if (response?.data?.success) {
                setResultExam(response?.data?.data);
            } else {
            }
        } catch (error) {

        }
    };

    async function sendResultExam() {

        try {
            const response = await callApi(
                true,
                `sendresulttoclient/${params?.code}`,
                'get',
                null
            );
            if (response?.data?.success) {
            } else {

            }
        } catch (error) {
        }
    };

    useEffect(() => {
        if (isMounted) {
            fetchResultExam();

        }

        return () => {
            setIsMounted(false)
        }
    }, [isMounted, setIsMounted])

    return (
        <div >
            <button
                onClick={() => sendResultExam()}
                className='btn btn-main' >Envoyer les resultats à {resultExam?.nomcli}</button>
        </div>
    )
}

