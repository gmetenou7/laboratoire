import React, { Fragment, useEffect } from 'react';
import { Financial } from '../../component/financial/Financial.tsx';
import PageLayout from "../PageLayout.tsx";
import {
    financialStatusSelector,
    financialStateThunk,
} from '../../features/financialStateSlice.ts';
import { useSelector } from 'react-redux';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatDateTime } from "../../component/utilities/dateTimeFormatter.ts"

export function FinancialPage() {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const financialStatus = useSelector(
        (state: any) => financialStatusSelector(state)
    );
    const dispatch = useDispatch()



    async function handleGetBaseFinancialState() {
        const today = new Date().toLocaleDateString().split("/");
        const date = `${today[2]}-${today[1]}-${today[0]}`
        const request_data = {
            codelabo: user?.matricule_labo,
            "codeagence": "",
            "datedebut": date,
            "datefin": date
        }
        try {
            await dispatch(
                financialStateThunk(request_data)
            )
        } catch (error) {
        }
    }

    useEffect(() => {
        (financialStatus.for === "idle" && financialStatus.state === "idle") && handleGetBaseFinancialState();
    }, [financialStatus])


    const content =
        <Fragment>
            {(financialStatus.for === "list" && financialStatus.state === "loading") ?
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
                </div>
                :
                <>
                    {(financialStatus.for === "list" && financialStatus.state === "error") ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handleGetBaseFinancialState}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div>
                        :
                        <div className="financial-page-wrapper">
                            <Financial />
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
