import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    listStatistiqueThunk,
    statisticStatusSelector,
    statisticExamPaySelector,
    statisticExamUnPaySelector

} from "../../features/statistiqueSlice.ts"
import PageLayout from "../PageLayout.tsx";
import { StatistiqueCard } from "../../component/cards/StatistiqueCard.tsx";
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

interface ExamenPayer {
    agencematricule: string,
    agence: string,
    nbrforagence: string,

}

export const Statistiques = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user") || "");
    const statisticStatus = useSelector(
        (state: any) => statisticStatusSelector(state)
    );
    const statisticExamPay = useSelector(
        (state: any) => statisticExamPaySelector(state)
    );
    const statisticExamUnPay = useSelector(
        (state: any) => statisticExamUnPaySelector(state)
    );

    async function fetchNumberVoucher() {
        try {
            dispatch(
                listStatistiqueThunk(user?.matricule_labo)
            ).unwrap()
        } catch (error) {

        }
    }

    useEffect(() => {
        statisticStatus === "idle" && fetchNumberVoucher()
    }, [statisticStatus])

    const content =
        <Fragment>
            {statisticStatus === "loading" ?
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
                <>
                    {statisticStatus === "error" ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={fetchNumberVoucher}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        <div className="d-flex gap-20 statistics">
                            <div className="laboratory-stats with-30">
                                <h2 className='info-header'>Statistiques du laboratoire</h2>
                                <div className="stats">
                                    <StatistiqueCard
                                        className="statistique-card main-blue"
                                        icon={<CurrencyExchangeTwoToneIcon
                                            className="card-icon"
                                        />}
                                        stateHead={statisticExamPay?.[0].in_labo}
                                        headline="Bon d'examens payés"
                                        stateCaption="Bons"
                                    />
                                    <StatistiqueCard
                                        className="statistique-card main-blue"
                                        icon={<CurrencyExchangeTwoToneIcon
                                            className="card-icon"
                                        />}
                                        stateHead={statisticExamUnPay?.[0].in_labo}
                                        headline="Bon d'examens non payés"
                                        stateCaption="bons"
                                    />
                                </div>

                            </div>
                            <div className="agencies-stats with-70">
                                <div className="">
                                    <h2 className='info-header mb-20'>Bon d'examens payés par agence</h2>
                                    <div className="stats">
                                        {statisticExamPay?.[0]?.in_agences?.map((item: any, index: number) =>
                                            <StatistiqueCard
                                                className="statistique-card main-blue"
                                                icon={<AssignmentTurnedInIcon
                                                    className="card-icon"
                                                />}
                                                stateHead={item?.nbrforagence}
                                                headline={item?.agence}
                                                stateCaption="Bons"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-30">
                                    <h2 className='info-header mb-20'>Bon d'examens non payés par agence</h2>
                                    <div className="stats">
                                        {statisticExamUnPay?.[0]?.in_agences?.map((item: any, index: number) =>
                                            <StatistiqueCard
                                                className="statistique-card main-blue"
                                                icon={<AssignmentLateIcon
                                                    className="card-icon"
                                                />}
                                                stateHead={item?.nbrforagence}
                                                headline={item?.agence}
                                                stateCaption="Bons"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </Fragment>


    return (
        <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
    )

}
