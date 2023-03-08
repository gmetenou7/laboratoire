import React, { Fragment } from 'react'
import PageLayout from './PageLayout.tsx';
import { PatientTable, ExamsTable } from '../component/tables/Table.tsx';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';



export function HomeServicePage() {

    const patient = useSelector((state: any) => state.patient);
    const examensData = useSelector((state: any) => state.exams.listExamens)

    const content =
        <Fragment>

            {patient?.data?.length > 0 ? <>
                <div className="grid-2 pb-20  mt-30">
                    <div className="list-patients">
                        <div className="feature-title">
                            <h4 className="title">
                                Liste patients
                            </h4>
                            <div className="btn-group">
                                <Link
                                    to="/patients/add"
                                    className='btn-link-green'>
                                    <span>Ajouter patient</span> <FaPlus />
                                </Link>
                                <Link
                                    to="/patients"
                                    className='btn-link-main'>
                                    Voir plus <FaAngleRight />
                                </Link>
                            </div>
                        </div>
                        <div className="patients">
                            <PatientTable
                                data={
                                    patient?.data?.filter(
                                        (item: any) => item?.state === 1
                                    ).slice(0, 10)
                                }
                                simple={true}
                            />
                        </div>
                    </div>
                    <div className="list-patients">
                        {examensData?.length > 0 ?
                            <>
                                <div className="feature-title">
                                    <h4 className="title">
                                        Liste des examens
                                    </h4>
                                    <div className="btn-group">
                                        <Link
                                            to="#"
                                            className='btn-link-green'>
                                            <span>Ajouter examens</span> <FaPlus />
                                        </Link>
                                        <Link
                                            to="/exams"
                                            className='btn-link-main'>
                                            Voir plus <FaAngleRight />
                                        </Link>
                                    </div>
                                </div>
                                <div className="patients">
                                    <ExamsTable
                                        data={examensData?.slice(0, 10)}
                                        simple={true}
                                    />
                                </div>
                            </> : <div className='content-not-fount'>
                                <h2 className='content-not-fount__text'>Aucun examen trouvé pour le moment, commencer par ajouter un</h2>
                                <Link
                                    className='content-not-fount__link'
                                    to="#">
                                    Ajouter un examen
                                </Link>
                            </div>
                        }
                    </div>
                </div>

            </> :
                <div className='content-not-fount mt-40'>
                    <h2 className='content-not-fount__text'>Ce laboratoire n'a enregistré aucun patient pour le moment.</h2>
                    <Link
                        className='content-not-fount__link'
                        to="/patients/add">
                        Ajouter un Patient pour commencer
                    </Link>
                </div>}


        </Fragment>
    return (
        <PageLayout children={content} useSidebar={false} />
    )
}

