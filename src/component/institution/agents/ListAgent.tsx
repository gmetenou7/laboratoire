import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
//import { InstitutionTable } from '../tables/Table.tsx'
import { CreateAgent } from './CreateAgent.tsx'
import { showModalReducer } from "../../../features/modalSlice.ts"
import { AgentsTable } from '../../tables/Table.tsx'
import { UpdateAgent } from './UpdateAgent.tsx'
// import { listAgentInstitutionThunk, 
//     institutionsAgentDataSelector, 
//     institutionsAgentStatusSelector 
// } from '../../../features/agentInstitutionSlice.ts'
import { useSelector } from 'react-redux'
import { Puff } from 'react-loader-spinner'
import { useForm } from 'react-hook-form'

interface Agent {
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    password: string,
    confirmPassword: string,
    code: number,
    codelaboratoire: string,
    codeinstitution:string
}

const ListAgent = () => {

   
    const dispatch = useDispatch();
    const agents = useSelector((state: any) => institutionsAgentDataSelector(state));
    const params = useParams()
    const code = params?.code
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loading, setLoading] = useState(false)
    const institutionAgentStatus = useSelector((state: any) => institutionsAgentStatusSelector(state));

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Agent>({
        defaultValues: {
            codelaboratoire: user?.laboratoire,
            codeinstitution: code
        }
    });

    async function handlefetchAgentInstitution(data) {
       
        console.log(data);
        
        setLoading(true)
        try {
            const response = dispatch(listAgentInstitutionThunk(data))
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    
    function handleCreateCompagnyInstitutionModal() {
        dispatch(showModalReducer({
            active: true,
            header: "Créer un Agent",
            body: <CreateAgent Idinstitution = {code}/>

        }))
    }

    function handleUpdateCompagnyInstitutionModal(code: string) {
        dispatch(showModalReducer({
            active: true,
            header: ` Modifier l'Agent N° ${code}`,
            body: <UpdateAgent code={code} />

        }))
    }

    // useEffect(() => {
    //     (institutionAgentStatus.for === "idle" && institutionAgentStatus.for === "idle") && handlefetchAgentInstitution()
    // }, [institutionAgentStatus])

    return (
        <Fragment>
           
            {(institutionAgentStatus.for === "list" && institutionAgentStatus.for === "loading") ?
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
                    {(institutionAgentStatus.for === "list" && institutionAgentStatus.for === "error") ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handlefetchAgentInstitution}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                    <div className="list-patients">
                        <div className="feature-title">
                            <h4 className="title"> Liste des Agents de l'institution</h4>
                            <div className="btn-group">
                                <Link to={`#`} className='btn-link-green'
                                    onClick={handleCreateCompagnyInstitutionModal}
                                >
                                    <span >Ajouter un Agent ou Employé</span> <FaPlus />
                                </Link>
                            </div>
                        </div>
                        <div className="patients">
                                <AgentsTable data={agents}
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

export default ListAgent