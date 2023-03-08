import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { showModalReducer } from "../../features/modalSlice.ts";
import InputField, { TextAreaField } from "../utilities/FormField.tsx";
import { ExamPrintable } from "./ExamPrintable.tsx";
import callApi, { notification } from "../../Utils/Utils.tsx";
import { Puff } from "react-loader-spinner";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { 
  listLaboratoryExamsType, 
} from "../../features/examSlice.ts";

import { formatNumber } from "../../component/utilities/numberFormater.ts"
import { useParams } from "react-router-dom";

interface GlasswareType {
  id: number;
  name: string;
  symbol: string;
  color: string;
}

interface typeExam {
  matricule: string;
  nom: string;
  matricule_fam: string;
  prix: string;
  glassware: GlasswareType;
}
interface status_exam {
  id: number;
  libelle: String;
  class: String;
};

export const CreateExam = (props) => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const dispatch = useDispatch();
  const [listExamsType, setListExamType] =  useState<[]>();
  const [loadingCreateExam, setLoadingCreateExam] = useState(false);
  const [statusExam, setStatusExam] = useState([]);
  const selectAnimation = makeAnimated();
  let [examTotalPrice, setExamTotalPrice] = useState<number>(0);
  const [selectedExams, setSelectedExams] = useState([]);
  const [loadingLaboratoryExamType, setLoadingLaboratoryExamType] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  async function handleFetchLaboratoryExamType() {
    setLoadingLaboratoryExamType(true)
    try {
      const response = await dispatch(
        listLaboratoryExamsType(user?.matricule_labo)
      ).unwrap();

      if (response?.data?.success) {
        setListExamType(response?.data?.data)
        setLoadingLaboratoryExamType(false)
      }
    } catch(error) {
      setLoadingLaboratoryExamType(false)
      console.log(error);
      
    }
  }

  let totalPrice:number = 0
  function handleSelectChange(data:any) {
    setSelectedExams(data);    
    totalPrice = 0
    data?.forEach((item) => {
      const value = item?.value.split("_");
      totalPrice = totalPrice + parseInt(value[2]);  
    })
    setExamTotalPrice(totalPrice)
  }
  
  // This function handle the exam Voucher creation
  async function handleCreateExam(data:any) {
    setLoadingCreateExam(true);    
    let examsRequest:any= [];
    let examsTypeRequest:any= [];
    selectedExams.forEach((item: any) => {
      const value = item?.value.split("_");
      examsRequest.push({codetype:value[0], prixtotal : parseInt(value[2])});
      examsTypeRequest.push(value[1]);
    });
    
    let codeclient = document.location.pathname.split("/")[2];

    let status: status_exam = statusExam.find(
      (status: status_exam) => status.libelle === "reçu"
    );
    
    // Construct the object that will be send in the body of the request: exam voucher object
    const newExamTypeRequest = [...new Set(examsTypeRequest)];
    
    let request_data = {
      codeclient,
      clientajeuneorno: data.clientajeun ===true ? 1 : 0,
      description: data.description,
      codestatusexamen: status.id,
      medecindemandeur: data.medecindemandeur,
      prixtotal: examTotalPrice,
      matriculelabo: user.matricule_labo,
      matriculeemp: user.matricule,
      matriculeag: user.matricule_ag,
      examen: examsRequest,
      fam:  newExamTypeRequest?.map((item) => {
        return {codefam:item}
      }),
    };    
    
    // Api call and error management
    try {
      let response = await callApi(true, "examens", "post", null, request_data);
      setLoadingCreateExam(false);
      if (response.data.success) {
        let exam_created = response.data.data;
        handleShowPrintableExam(exam_created.matricule);
        notification("success", response.data.message);
      } else {
        console.log(response);
        notification("error", "une erreur est survenu lors du traitement");
      }
    } catch (error) {
      console.log(error);
      
    }
    // To re-fetch the exams voucher list when one exams is created
    // Purpose: Se live update
    props.get_exam_list();
  }

  // To the get the status that will be assigned to a voucher when creating
  async function get_status_exams() {
    let response = await callApi(true, "statusexamen", "get");
    if (response) {
      setStatusExam(response.data.data);
    }
  }

  // Tho show the exam voucher wen teb it's created for a patient
  function handleShowPrintableExam(id_exam: String) {
    dispatch(
      showModalReducer({
        header: "Bon d'examen",
        active: true,
        body: <ExamPrintable idExam={id_exam} />,
      })
    );
  }

  // Map the exams type and push the exams in for the select searchable field
  let optionsTypes:any= []
  listExamsType?.forEach(
    function (types:any) {
      types?.examens?.forEach(
        function(exams:any) {
          const options = {
            value: `${exams?.matriculeexam}_${exams?.matriculetypeexam}_${exams?.prixexam?exams.prixexam:0}`,
            label: `${exams?.nomexam}--(${types.nomtype})`
          }
          optionsTypes.push(options)
        }
      )
    }
  )

  useEffect(() => {
    handleFetchLaboratoryExamType();
    get_status_exams();
  }, []);

  return (
    <Fragment>

      {loadingLaboratoryExamType ? 
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

      <form
        style={{
          maxWidth: 600
        }}
        onSubmit={handleSubmit(handleCreateExam)} className="flex-col-center-cente p-30">
        <div className="input-group">
          <label className="label" htmlFor="exams">
            Selectionner les examens
          </label>
          <Select
            components={selectAnimation}
            required
            options={optionsTypes}
            isMulti
            className="input-field"
            onChange={(items) => handleSelectChange(items)}
            autoFocus
            placeholder = "Selectioner les examens"
          />
        </div>
        <InputField 
          id = "asked-doctor"
          label = "Medecin Demandeur"
          placeholder = "Entrer le nom du Medecin Demandeur"
          register = {register("medecindemandeur", {
            required : "Ce champ est requis"
          })}

          error = {{for: "asked-doctor", text : errors?.medecindemandeur?.message}}
        />

        <TextAreaField
          id = "description"
          label="Note d'examen"
          placeholder="Noter quelques détails sur cette examen"
          register = {register("description", {
            required: false
          })}
          error = {{for : "description", text : errors?.description?.message}}
        />

        <div className="grid-2 mt-30 mb-30">
          {statusExam.map((status: status_exam, index) => {
            return (
              <>
                {status.libelle === "reçu" &&
                  <label htmlFor="exam-status-1" className="input-checkbox-group">
                  <input
                    disabled
                    checked={status.libelle === "reçu"}
                    className="checkbox-field"
                    id="exam-status-1"
                    type="checkbox"
                  />
                  <div className="checkmark" />
                  <span>{status.libelle}</span>
                </label>
                }
              </>
            )
          })}
          <label htmlFor="clientajeun" className="input-checkbox-group">
            <input
              className="checkbox-field"
              id="clientajeun"
              type="checkbox"
              {...register('clientajeun')}
            />
            <div className="checkmark" />
            <span>Patient à jeûne?</span>
          </label>
        </div>
        <div className="input-group mb-30">
          <InputField 
          id = "asked-doctor"
          label = "Taux de reduction % (Assurance)"
          placeholder = "Entrer le taux de reduction"
          // register = {register("medecindemandeur", {
          //  // required : "Ce champ est requis"
          // })}

          // error = {{for: "asked-doctor", text : errors?.medecindemandeur?.message}}
        />
        </div>
        <div className="btn-section d-flex-space-between mt-70">
          <button className="btn btn-main" type="submit">
            Créer un examen
            {loadingCreateExam && 
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
            }
          </button>
          {examTotalPrice > 0 && <h2 className="exam-price">Prix <span>{formatNumber(examTotalPrice)}</span> $</h2>}
        </div>
      </form>
      }
    </Fragment>
  );
};
