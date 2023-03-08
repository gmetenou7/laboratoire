import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AssuranceTable } from '../tables/Table.tsx'
import { CreateAssurrance } from './CreateAssurrance.tsx'
import { showModalReducer } from "../../features/modalSlice.ts"
import { listAssuranceCompanyThunk, assuranceCompanyStatusSelector } from '../../features/assuranceCompanySlice.ts'
import { useSelector } from 'react-redux'
import { Puff } from 'react-loader-spinner'

const ListAssurance = () => {
    const dispatch = useDispatch();
    const assuranceCompany = useSelector((state) => state.assuranceCompany);
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loading, setLoading] = useState(false)
    const assuranceCompanyStatus = useSelector((state: any) => assuranceCompanyStatusSelector(state))


    async function handlefetchAssuranceCompany() {
        setLoading(true)
        try {
            const response = dispatch(listAssuranceCompanyThunk(user?.matricule_labo))
            setLoading(false)
        } catch (error) {
            setLoading(false);
        }
    }

    function handleCreateCompagnyAssuranceModal() {
        dispatch(showModalReducer({
            active: true,
            header: "Créer une compagnie d'assurance",
            body: <CreateAssurrance />

        }))
    }

    function handleUpdateCompagnyAssuranceModal(code: string) {
        dispatch(showModalReducer({
            active: true,
            header: ` Modifier la compagnie d'assurance N° ${code}`,
            body: <CreateAssurrance code={code} />

        }))
    }

    useEffect(() => {
        (assuranceCompanyStatus.for === "idle" && assuranceCompanyStatus.for === "idle") && handlefetchAssuranceCompany()
    }, [assuranceCompanyStatus])

    return (
        <Fragment>
            {(assuranceCompanyStatus.for === "list" && assuranceCompanyStatus.for === "loading") ?
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
                    {(assuranceCompanyStatus.for === "list" && assuranceCompanyStatus.for === "error") ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handlefetchAssuranceCompany}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        <div className="list-patients">
                            <div className="feature-title">
                                <h4 className="title"> Compagnies d'Assurance</h4>
                                <div className="btn-group">
                                    <Link to={`#`} className='btn-link-green'
                                        onClick={handleCreateCompagnyAssuranceModal}
                                    >
                                        <span >Ajouter une Compagnie</span> <FaPlus />
                                    </Link>
                                </div>
                            </div>
                            <div className="patients">
                                <AssuranceTable data={assuranceCompany?.data}
                                    showEditCompagny={handleUpdateCompagnyAssuranceModal}
                                />
                            </div>
                        </div>
                    }
                </>
            }
        </Fragment>
    )
}

export default ListAssurance