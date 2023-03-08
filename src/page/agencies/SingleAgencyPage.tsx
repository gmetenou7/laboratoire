import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListServices } from '../../component/services/ListServices.tsx';
import PageLayout from "../PageLayout.tsx";
//import SingleAgency from "../../component/agencies/SingleAgency.tsx"
// import SingleAgency from '../../component/agencies/SingleAgency.tsx';
import SingleAgency from "../../component/agencies/SingleAgency.tsx"
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { StatistiqueCard } from "../../component/cards/StatistiqueCard.tsx";
import callApi from "../../Utils/Utils.tsx";
import { formatNumber } from "../../component/utilities/numberFormater.ts"

interface ChiffreAffaire {
    matricule: string,
    nom: string,
    total: string,
}

interface ExamenPayer {
    agencematricule: string,
    agence: string,
    nbrforagence: string,

}


export default function SingleAgencyPage() {
    const params = useParams();
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loadingFail, setLoadingFail] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [listExamenAgence, setListExamenAgence] = useState<[ExamenPayer]>()
    const [listExamenAgenceNotPaid, setListExamenAgenceNotPaid] = useState<[ExamenPayer]>()
    const [chiffreAffaire, setChiffreAffaire] = useState<[ChiffreAffaire]>()
    const [statistiques, setStatistiques] = useState()

    const chiffreAffaireAgence = chiffreAffaire?.find((item: ChiffreAffaire) =>
        item.matricule === params.matricule);

    const nbreExamenAgence = listExamenAgence?.find((item: ExamenPayer) =>
        item.agencematricule === params.matricule);
    const nbreExamenAgenceNotPaye = listExamenAgenceNotPaid?.find((item: ExamenPayer) =>
        item.agencematricule === params.matricule)


    async function fetchDataCA() {
        setLoading(true);
        setLoadingFail(false)
        setLoadingFail(false)
        try {
            const response = await callApi(true, `cajour/${user?.matricule_labo}`, "get", null);
            if (response?.data?.success) {

                setChiffreAffaire(response?.data?.data?.ca_agence);
                setLoading(false)
            } else {
                setLoading(false)
                setLoadingFail(true)
            }
        } catch (error) {
            setLoading(false)
            setLoadingFail(true)
        }
    }

    async function fetchDataVoucher() {
        setLoading(true);
        setLoadingFail(false)
        setLoadingFail(false)
        try {
            const response = await callApi(true, `allbon/${user?.matricule_labo}`, "get", null);
            if (response?.data?.success) {


                setStatistiques(response?.data?.data)

                setLoading(false)
            } else {
                setLoading(false)
                setLoadingFail(true)
            }
        } catch (error) {
            setLoading(false)
            setLoadingFail(true)
        }
    }

    console.log("statttt", statistiques);


    useEffect(() => {
        isMounted && fetchDataCA();
        fetchDataVoucher()
        return () => {
            setIsMounted(false)
        }

    }, [isMounted])

    const content =
        <Fragment>
            <div className="single-agency-page">
                <div className="agency-info">
                    <SingleAgency
                        agencyId={params?.matricule}
                    />
                </div>
                <div className="services-list">
                    <div className="grid-3 gap-20">
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<CurrencyExchangeTwoToneIcon
                                className="card-icon"
                            />}
                            stateHead={formatNumber(chiffreAffaireAgence?.total ? chiffreAffaireAgence?.total : 0)}
                            headline="Revenu journalier"
                            stateCaption="$"
                        />
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<AssignmentTurnedInIcon
                                className="card-icon"
                            />}
                            stateHead={nbreExamenAgence?.nbrforagence ? nbreExamenAgence?.nbrforagence : 0}
                            headline="Examen Payé"
                            stateCaption="Examen"
                        />
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<AssignmentTurnedInIcon
                                className="card-icon"
                            />}
                            stateHead={nbreExamenAgenceNotPaye?.nbrforagence ? nbreExamenAgence?.nbrforagence : 0}
                            headline="Examen non Payé"
                            stateCaption="Examen"
                        />
                    </div>

                    <div className="py-40">
                        <h2 className='list-header' > Services dans cette agence</h2>
                        <ListServices
                            agencyId={params?.matricule}
                        />
                    </div>

                </div>
            </div>
        </Fragment>
    return (
        <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
    );
};
