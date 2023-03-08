import React, { Fragment, useState } from 'react'
import { Puff } from 'react-loader-spinner'
import { RiErrorWarningFill } from "react-icons/ri";
import callApi from '../../Utils/Utils.tsx'; 
import Notification from '../../Utils/Utils.tsx'
import {examsReceiveStatus} from "../../features/examSlice.ts"
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const DeleteExam = () => {

    const [loadingDelete, setLoadingDelete] = useState<Boolean>(false);
    const [showDelete, setShowDelete]= useState(false)

    const user = JSON.parse(localStorage.getItem("user") || "")
    
    // const codebon = useSelector((state) => state.exams.matricule);
    
  const handleDeactivatePatient = async () => {
    setLoadingDelete(true);
    
    try {
      let codebon: any
      
      let response = await callApi(true, `Examen/${codebon}`, "delete", null);

      if (response?.data?.success) {
        setLoadingDelete(false);
        Notification("success", response.data.data);
        setLoadingDelete(false)
        
      } else {
        setLoadingDelete(false);
        //notification('error',  "une erreur inatendu est survenue" )
      }
      
    } catch (error) {
      setLoadingDelete(false);
    }
  };
  return (
    <Fragment>
        <div className="confirm-popup">
        <div className="confirm-popup-header">
            <RiErrorWarningFill className="popup-header-icon" />
            <h5 className="popup-header-text">Confirmer l'action</h5>
        </div>
        <div className="confirm-popup-body">
            <p className="popup-body-text">Est-vous sure de vouloir supprimer ce bon ?</p>
        </div>
        <div className="confirm-popup-footer">
            <button className="popup-btn-main" onClick={handleDeactivatePatient}>
                <span>Supprimer</span>
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
            <button className="popup-btn-second" onClick={() =>setLoadingDelete(false)}>
                Annuler
            </button>
        </div>
    </div>
 
    </Fragment>
  )
}




    