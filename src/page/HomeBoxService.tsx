import React, { Fragment } from "react";
import PageLayout from "./PageLayout.tsx";
import { Link } from "react-router-dom";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { examsReceiveStatus } from '../features/examSlice.ts'
import { BillsTable, ExamsTable } from "../component/tables/Table.tsx";
import { billStatus } from "../features/billSlice.ts";
import { Puff } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { ExamPrintable } from '../component/exems/ExamPrintable.tsx';
import { showModalReducer } from "../features/modalSlice.ts";
import BillPrintable from "../component/exems/bills/BillPrintable.tsx"

export function HomeBoxService() {

    const exams_receive_status = useSelector((state) =>
        examsReceiveStatus(state)
    );
    const bills = useSelector(
        (state: any) => state.bills.listBills
    );
    const bills_statis = useSelector(billStatus);
    const dispatch = useDispatch()

    function handleShowPrintableExam(id_exam: String) {
        dispatch(
            showModalReducer({
                header: `Bon d'examen n°: ${id_exam}`,
                active: true,
                body: <ExamPrintable idExam={id_exam} caisse={true} />,
            })
        );
    }

    function handleShowPrintableBill(id_exam: String) {
        dispatch(
            showModalReducer({
                header: `Facture pour le bon N°: ${id_exam}`,
                active: true,
                body: <BillPrintable idExam={id_exam} />
            })
        );
    }

    const content = (
        <Fragment>
            <div className="grid-2 pb-20  mt-30">
                <div className="list-patients">
                    {exams_receive_status?.length > 0 ?
                        <>
                            <div className="feature-title">
                                <h4 className="title">
                                    Registre des factures
                                </h4>
                                <div className="btn-group">
                                    <Link
                                        to="/exams/voucher"
                                        className='btn-link-main'>
                                        Voir plus <FaAngleRight />
                                    </Link>
                                </div>
                            </div>
                            <div className="patients">
                                <ExamsTable
                                    data={exams_receive_status?.slice(0, 5)}
                                    caisse={true}
                                    showPrintable={handleShowPrintableExam}
                                />
                            </div>
                        </> : <div className='content-not-fount'>
                            <h2 className='content-not-fount__text'>Aucune facture à traiter pour le moment</h2>

                        </div>
                    }
                </div>
                <div className="list-patients">
                    {bills_statis === "pending" &&
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
                    }
                    {bills?.length > 0 ?
                        <>
                            {bills_statis === "completed" &&
                                <>
                                    <div className="feature-title">
                                        <h4 className="title">
                                            Listes des Reçus
                                        </h4>
                                        <div className="btn-group">

                                            <Link
                                                to="/exams/bill"
                                                className='btn-link-main'>
                                                Voir plus <FaAngleRight />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="patients">
                                        <BillsTable
                                            data={bills?.slice(0, 5)}
                                            showPrintable={handleShowPrintableBill}
                                        />
                                    </div>
                                </>
                            }
                        </> : <div className='content-not-fount'>
                            {bills_statis === "error" &&
                                <h2 className='content-not-fount__text'>Aucun examen à traiter pour le moment</h2>
                            }
                        </div>
                    }
                </div>
            </div>
        </Fragment>
    );
    return <PageLayout children={content} useSidebar={false} />;
}
