import React, { Fragment } from 'react';
import PageLayout from "./PageLayout.tsx";
import { ListExems } from "../component/exems/ListExems.tsx";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Exams({ allowed }) {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const patients = useSelector((state: any) => state.patient.data);
  const exams = useSelector((state: any) => state.exams.listExamens);


  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        {patients?.length > 0 ?
          <> {exams?.length > 0 ? <ListExems
            accueil={user.nomservice === "accueil" ? true : false}
          /> : <>
            <div className='content-not-fount mt-40'>
              <h2 className='content-not-fount__text'>Ce laboratoire n'a enregistré aucun examen pour le moment.</h2>
              <Link
                className='content-not-fount__link'
                to="/patients">
                Choisir un patient pour ajouter un examen
              </Link>
            </div>
          </>} </> :
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
