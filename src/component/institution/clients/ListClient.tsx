import React, { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CreateClient } from "./CreateClient.tsx"
import { showModalReducer } from "../../../features/modalSlice.ts"
import { ClientsTable } from '../../tables/Table.tsx'
import { UpdateClientInstitution } from './UpdateClientInstitution.tsx'

const ListClient = () => {

    const clients = [

        {
            nom: "Laurine",
            prenom: "Laurine",
            email: "laurine@gmail.com",
            telephone: "+237696295892",
            fonction: "Ingenieur Logiciel",
            code: "22-31"
        },
        {
            nom: "Loe Therese",
            prenom: "Laurine",
            email: "loetherese@gmail.com",
            telephone: "+237696295892",
            fonction: "Ingenieur Logiciel",
            code: "22-32"
        },
        {
            nom: "Gildas Metenou",
            prenom: "Laurine",
            email: "metenou@gmail.com",
            telephone: "+237696295892",
            fonction: "Ingenieur Logiciel",
            code: "22-33"
        },
    ]
    const dispatch = useDispatch();

    function handleCreateCompagnyInstitutionModal() {
        dispatch(showModalReducer({
            active: true,
            header: "Créer un Client",
            body: <CreateClient />

        }))
    }

    function handleUpdateCompagnyInstitutionModal(IdClient: string) {
        dispatch(showModalReducer({
            active: true,
            header: ` Modifier le Client N° ${IdClient}`,
            body: <UpdateClientInstitution IdCompany={IdClient} />

        }))
    }

    return (
        <Fragment>
            <div className="list-patients">
                <div className="feature-title">
                    <h4 className="title"> Liste des Clients de l'institution</h4>
                    <div className="btn-group">
                        <Link to={`#`} className='btn-link-green'
                            onClick={handleCreateCompagnyInstitutionModal}
                        >
                            <span >Ajouter un Client</span> <FaPlus />
                        </Link>
                    </div>
                </div>
                <div className="patients">
                    <ClientsTable data={clients}
                        showEditCompagny={handleUpdateCompagnyInstitutionModal}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default ListClient