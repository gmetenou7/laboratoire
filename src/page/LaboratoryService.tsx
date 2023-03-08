import React, { Fragment } from "react";
import PageLayout from "./PageLayout.tsx";
import { ExamsTable } from "../component/tables/Table.tsx";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function LaboratoryService() {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const exams = useSelector(
        (state: any) => state.exams.listExamens
    );

    const content = (
        <Fragment>
            <div className="patient-page-wrapper">
                <div className="list-patients">
                    {exams?.filter((item: any) => item?.mesbons !== "yes" && item.laborantins?.filter((item: any) => item?.specialite !== user?.specialite)).length > 0 ?
                        <>
                            <div className="feature-title">
                                <h4 className="title">
                                    Bons d'examen
                                </h4>
                                <div className="btn-group">
                                    {exams?.length > 10 &&
                                        <Link
                                            to="/exams/voucher"
                                            className='btn-link-main'>
                                            Voir plus <FaAngleRight />
                                        </Link>
                                    }
                                </div>
                            </div>
                            <div className="patients">
                                <ExamsTable
                                    caisse={
                                        user.nomservice === "caisse" ? true : false
                                    }
                                    it={
                                        user.nomservice === "it" ? true : false
                                    }
                                    laboratory={
                                        user.nomservice === "laboratoire" ? true : false
                                    }
                                    data={
                                        exams?.filter((item: any) => item?.mesbons !== "yes").slice(0, 10)
                                    }
                                />

                            </div>
                        </> :
                        <div className='content-not-fount'>
                            <h2 className='content-not-fount__text'>Aucun bon d'examen à suivre pour le moment</h2>
                        </div>
                    }
                </div>
            </div>

        </Fragment>
    );
    return <PageLayout children={content} useSidebar={false} />;
};