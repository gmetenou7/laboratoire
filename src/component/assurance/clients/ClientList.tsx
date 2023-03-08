import React, { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { CompanyClientTable } from '../../tables/Table.tsx'
import { showModalReducer } from "../../../features/modalSlice.ts"

interface CompanyClient {
  nom: string,
  email: string,
  telephone: string,
  prenom: string,
  password: string,
  confirmpassword: string,
  matricule: string
}

export const ClientList = () => {

  const params = useParams()

  const clients = [

    {
      nom: "richard",
      email: "charles@gmail.com",
      telephone: "+237655775544",
      prenom: "Charles",
      matricule: "22-34",

    },
    {
      nom: "alain",
      email: "charles@gmail.com",
      telephone: "+237655775544",
      prenom: "Charles",
      matricule: "22-34",

    },
    {
      nom: "gildas",
      email: "charles@gmail.com",
      telephone: "+237655775544",
      prenom: "Charles",
      matricule: "22-34",

    },
  ]

  const dispatch = useDispatch()

 
  return (
    <Fragment>
      <div className="list-patients">
        <div className="feature-title">
          <h4 className="title">Liste des clients</h4>
          <div className="btn-group">

            <Link to={`/create-client-compagny/${params.code}`} className='btn-link-green'

            >
              <span >Ajouter un Client</span> <FaPlus />
            </Link>
          </div>
        </div>

        <div className="patients">
          <CompanyClientTable data={clients} />

        </div>

      </div>
    </Fragment>
  )
}
