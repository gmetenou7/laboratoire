import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { InstitutionTable } from '../tables/Table.tsx'
import { CreateInstitution } from './CreateInstitution.tsx'
import { showModalReducer } from "../../features/modalSlice.ts"
import { listInstitutionThunk, institutionsDataSelector } from '../../features/institutionSlice.ts'
import { UpdateInstitution } from './UpdateInstitution.tsx'
import { useSelector } from 'react-redux'
import { Puff } from 'react-loader-spinner'
import { institutionsStatusSelector } from '../../features/institutionSlice.ts'

const ListInstitution = () => {

   
    const dispatch = useDispatch();
    const institutions = useSelector((state:any) => institutionsDataSelector(state));
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loading, setLoading] = useState(false)
    const institutionStatus = useSelector((state: any) => institutionsStatusSelector(state));
    //const insuredInstitutions = institutions?.filter(institution => institution.codeassureur === null)
   // console.log(insuredInstitutions);
    
    async function handlefetchInstitution() {
         setLoading(true)
        try {
            const response = dispatch(listInstitutionThunk({matricule_labo: user?.matricule_labo,
                code: 'null'
             }))
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }


    function handleCreateCompagnyInstitutionModal() {
        dispatch(showModalReducer({
            active: true,
            header: "Créer une Institution",
            body: <CreateInstitution />

        }))
    }

    function handleUpdateCompagnyInstitutionModal(code: string) {
        dispatch(showModalReducer({
            active: true,
            header: ` Modifier l'Institution N° ${code}`,
            body: <CreateInstitution code={code} />

        }))
    }

    useEffect(() => {
        (institutionStatus.for === "idle" && institutionStatus.for === "idle") && handlefetchInstitution()
    }, [institutionStatus])

    
    return (
      
         <Fragment>
          {(institutionStatus.for ==="list" && institutionStatus.for === "loading") ? 
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
          {(institutionStatus.for ==="list" && institutionStatus.for === "error") ?
            <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handlefetchInstitution}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        <div className="list-patients">
                            <div className="feature-title">
                                <h4 className="title">Liste des Institutions</h4>
                                <div className="btn-group">
                                    <Link to= {`#`} className='btn-link-green'
                                        onClick={handleCreateCompagnyInstitutionModal}
                                    >
                                        <span >Ajouter une Institution</span> <FaPlus />
                                    </Link>
                                </div>
                            </div>
                            <div className="patients">
                                <InstitutionTable data={institutions} 
                                    showEditCompagny={handleUpdateCompagnyInstitutionModal}
                                />
                            </div>
                        </div>
             }
          </>
        }
    </Fragment>
    )
}

export default ListInstitution