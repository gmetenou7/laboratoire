import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { singlePatientSelector } from '../../features/patientSlice.ts';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Puff } from 'react-loader-spinner';
import callApi from '../../Utils/Utils.tsx';
import Notification from '../../Utils/Utils.tsx'
import { formatDateTime } from "../../component/utilities/dateTimeFormatter.ts"


export function SinglePatientView() {
  const params = useParams();
  const matricule = params.matricule;
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate()

  const patient = useSelector(state =>
    singlePatientSelector(state, matricule)
  );
  const user = JSON.parse(localStorage.getItem("user") || "")


  const handleDeactivatePatient = async () => {
    setLoadingDelete(true);
    try {

      let response = await callApi(true, `client/${patient?.matricule}`, "delete", null);

      if (response?.data?.success) {
        setLoadingDelete(false);
        Notification("success", response.data.data);
        setShowConfirmDelete(false)
        navigate("/patients", { replace: true })
      } else {
        setLoadingDelete(false);
        //notification('error',  "une erreur inatendu est survenue" )
      }

    } catch (error) {
      setLoadingDelete(false);
    }
  };

  return (
    <div className='patient-infos-contaire'>
      <div className="infos-body">
        <ul>
          <h2 className='info-header'>Patient</h2>
          <li>
            Matricule: <span>{patient?.matricule}</span>
          </li>
          <li>
            Nom: <span>{patient?.nom}</span>
          </li>
          <li>
            prenom: <span>{patient?.prenom}</span>
          </li>
          <li>
            Sexe: <span>{patient?.sexe}</span>
          </li>
          <li>
            Date de naissance: <span>{patient?.datenaissance}</span>
          </li>
          <li>
            Nationnalité: <span>{patient?.nationalite}</span>
          </li>
          <h2 className='info-header'>Contacts</h2>
          <li>
            Téléphone: <span>{patient?.telephone}</span>
          </li>
          <li>
            Email: <span>{patient?.emailcli}</span>
          </li>
          <h2 className='info-header'>Adresse</h2>
          <li>
            Ville: <span>{patient?.lieunassance}</span>
          </li>
          <li>
            Adresse: <span>{patient?.lieuvie}</span>
          </li>
          <h2 className='info-header'>Personne à contacter</h2>
          <li>
            Nom: <span>{patient?.personneurgence}</span>
          </li>
          <li>
            Téléphone: <span>{patient?.telpersonneurgence}</span>
          </li>
          <h2 className='info-header'>Autres</h2>
          <li>
            Date de création: <span>{formatDateTime(patient?.created_at)}</span>
          </li>
          <li>
            Dernière modif: <span>{formatDateTime(patient?.updated_at)}</span>
          </li>
          <li>
            Etat: <span>{patient?.state === 1 ?
              <span className='state-active'>
                Actif
              </span> :
              <span className='state-inactive'>
                Inactif
              </span>}</span>
          </li>
        </ul>
      </div>
      {showConfirmDelete &&
        <div className="confirm-popup">
          <div className="confirm-popup-header">
            <RiErrorWarningFill className="popup-header-icon" />
            <h5 className="popup-header-text">Confirmer l'action</h5>
          </div>
          <div className="confirm-popup-body">
            <p className="popup-body-text">Est-vous sure de vouloir {patient?.state === 1 ? "désactiver" : "activer"} ce patient ?</p>
          </div>
          <div className="confirm-popup-footer">
            <button className="popup-btn-main" onClick={
              handleDeactivatePatient
            } >
              <span>Confirmer</span>
              {loadingDelete && (
                <Puff
                  height="20"
                  width="20"
                  radius={1}
                  color="#fff"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              )}
            </button>
            <button className="popup-btn-second" onClick={() => setShowConfirmDelete(false)}>
              Annuler
            </button>
          </div>
        </div>
      }

      {user?.nomservice === "accueil" &&
        <div className="info-footer">
          <Link
            className='edit-btn'
            to={`/patients/matricule=${patient?.matricule}/update`}>
            Modifier
            <FaEdit className='edit-icon' />
          </Link>
         
        </div>
      }

      {user?.fonction === "admin" &&
        <div className="info-footer">
          <Link
            className='edit-btn'
            to={`/patients/matricule=${patient?.matricule}/update`}>
            Modifier
            <FaEdit className='edit-icon' />
          </Link>
          {patient?.state === 1 ?
            <div className="icon-tooltip">
              <span className="tooltip-text">Désactiver</span>
              <Link
                to="#"
                onClick={() => setShowConfirmDelete(true)}
                className='hidden-btn bg-danger'>
                <AiFillEyeInvisible className='hidden-icon' />
              </Link>
            </div> :
            <div className="icon-tooltip">
              <span className="tooltip-text">Activer</span>
              <Link
                to="#"
                onClick={() => setShowConfirmDelete(true)}
                className='hidden-btn bg-success'>
                <AiFillEye className='hidden-icon' />
              </Link>
            </div>
          }
        </div>
      }
    </div>
  )
}
