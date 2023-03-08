import React, { Fragment } from 'react';
import PageLayout from "./PageLayout.tsx";
import { ListPatients } from "../component/patients/ListPatient.tsx"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Patients() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const patients = useSelector(state => state.patient.data);

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        {patients?.length > 0 ?
          <ListPatients accueil={user?.nomservice === "accueil" && true} /> :
          <div className='content-not-fount mt-40'>
            <h2 className='content-not-fount__text'>Ce laboratoire n'a enregistré aucun patient pour le moment.</h2>
            <Link
              className='content-not-fount__link'
              to="/patients/add">
              Ajouter un Patient pour commencer
            </Link>
          </div>
        }
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}
