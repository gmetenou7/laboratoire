import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { 
    closeModalReducer 
} from "../../features/modalSlice.ts";
import InputField, { TextAreaField } from "../utilities/FormField.tsx";
import callApi, { notification } from "../../Utils/Utils.tsx";
import { Puff } from "react-loader-spinner";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { 
  listLaboratoryExamsType, 
} from "../../features/examSlice.ts";
import { formatNumber } from "../../component/utilities/numberFormater.ts";
import { listExamsThunk } from "../../features/examSlice.ts";

interface ExamsType {
    codetype: string;
    prixtotaltype: string;
    resultatrelevetype: string;
    nomtype: string;
    dureeanalyse: string;
    veleurnormaletype: string;
    unitemesuretype: string;
    nomverre: string;
    symboleverre: string;
    couleurverre: string;
}

interface ExamFamily {
    codefamille: string;
    nomfamille: string;
    decisionexam: string;
    types: [ExamsType];
}
  
interface ExamDetail {
    codeexamen: string;
    medecindemandeur: string;
    createat: string;
    updateat: string;
    prixtotalexam: string;
    codestatusexamen: number;
    decriptionexam: string;
    nomlaborentin: string;
    prenomlaborentin: string;
    nomcli: string;
    prenomcli: string;
    emailcli: string;
    sexe: string;
    ageclient: string;
    telephone: string;
    nomlabo: string;
    telephonelabo: string;
    emaillabo: string;
    payslabo: string;
    villelabo: string;
    regionlabo: string;
    ruelabo: string;
    logolabo: string;
    examen: [ExamFamily];
    clientajeun:any
}
interface status_exam {
  id: number;
  libelle: String;
  class: String;
};

export const UpdateExam = (props) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const dispatch = useDispatch();
    const [listExamsType, setListExamType] =  useState<[]>();
    const [loadingCreateExam, setLoadingCreateExam] = useState(false);
    const [statusExam, setStatusExam] = useState([]);
    const selectAnimation = makeAnimated();
    let [examTotalPrice, setExamTotalPrice] = useState<number>(0);
    const [selectedExams, setSelectedExams] = useState([]);
    const [loadingLaboratoryExamType, setLoadingLaboratoryExamType] = useState(false);
    const [singleExam, setSingleExam] = useState<ExamDetail>();
    const [loadingSingleExam, setLoadingSingleExam] = useState(false);

    async function handleFetchLaboratoryExamType() {
        setLoadingLaboratoryExamType(true)
        try {
        const response = await dispatch(
            listLaboratoryExamsType(user?.matricule_labo)
        ).unwrap();

        if (response?.data?.success) {
            setListExamType(response?.data?.data);
            setLoadingLaboratoryExamType(false);            
        }
        } catch(error) {
        setLoadingLaboratoryExamType(false)
        console.log(error);
        
        }
    }

    const handleFetchSingleExam = async () => {
        setLoadingSingleExam(true)
        try {
            const response = await callApi(

                true,
                "specificexamens",
                'post',
                {
                    codebon: props.examId,
                },
      null
            );
            if (response?.data?.success) {
                setSingleExam(response.data.data);                
                setLoadingSingleExam(false)                      
            }
        } catch (error) {
            
        }
    };

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
    
    // Get the actual exam voucher and set it as the default selected when the 
    // update exam voucher load
    let selectedOptionType:any = [];
    singleExam?.examen?.forEach(function(family) {
        family?.types?.forEach(function(type) {
            const option = {
                value: `${type?.codetype}_${family?.codefamille}_${type?.prixtotaltype?type.prixtotaltype:0}`,
                label: `${type?.nomtype}--(${family.nomfamille})`
            };
            selectedOptionType.push(option);
        });
    });
  
  // This function handle the exam Voucher creation
    async function handleUpdateExam(data:any) {

        setLoadingCreateExam(true);    
        let examsRequest:any= [];
        let examsTypeRequest:any= [];
        if (selectedExams?.length > 0) {
            selectedExams.forEach((item: any) => {
                const value = item?.value.split("_");
                examsRequest.push(
                    {
                        codetype:value[0], 
                        prixtotal : parseInt(value[2])
                    }
                );
                examsTypeRequest.push(value[1]);
            });
        } else {
            selectedOptionType.forEach((item: any) => {
                const value = item?.value.split("_");
                examsRequest.push(
                    {
                        codetype:value[0], 
                        prixtotal : parseInt(value[2])
                    }
                );
                examsTypeRequest.push(value[1]);
            });
        }
        
        let status: status_exam = statusExam.find(
            (status: status_exam) => status.libelle === "reçu"
        );
        
        // Construct the object that will be send in the body of the request: exam voucher object
        const newExamTypeRequest = [...new Set(examsTypeRequest)];
        
        let request_data = {
            description: data.description? data?.description : singleExam?.decriptionexam,
            codestatusexamen: status.id,
            medecindemandeur: data.medecindemandeur? data.medecindemandeur: singleExam?.medecindemandeur,
            prixtotal: examTotalPrice > 0? examTotalPrice : singleExam?.prixtotalexam,
            matriculelabo: user.matricule_labo,
            matriculeemp: user.matricule,
            matriculeag: user.matricule_ag,
            examen: examsRequest,
            clientajeuneorno: data.clientajeun ===true ? 1 : 0,
            fam:  newExamTypeRequest?.map((item) => {
                return {codefam:item}
            }),
        };    
        
        // Api call and error management
        try {
            let response = await callApi(
                true, 
                `examens/${props.examId}`, 
                "put", 
                null, 
                request_data
            );
            setLoadingCreateExam(false);
            if (response.data.success) {
                notification("success", response.data.message);
                dispatch(   
                   listExamsThunk({
                        matricule_labo: user?.matricule_labo,
                        matricule_ag: user?.matricule_ag ? user.matricule_ag : "_",
                        })   
                )
                dispatch(
                    closeModalReducer()  
                )
            } else {
                console.log(response);
                notification("error", "une erreur est survenu lors du traitement");
            }
        } catch (error) {
            console.log(error);
        }
        // To re-fetch the exams voucher list when one exams is created
        // Purpose: Se live update
    }

  // To the get the status that will be assigned to a voucher when creating
    async function get_status_exams() {
        let response = await callApi(true, "statusexamen", "get");
        if (response) {
            setStatusExam(response.data.data);
        }
    }

    useEffect(() => {
        handleFetchLaboratoryExamType();
        handleFetchSingleExam();
        get_status_exams();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            medecindemandeur: singleExam?.medecindemandeur,
            description: singleExam?.decriptionexam
        }
    });

    return (
        <Fragment>

            {(loadingLaboratoryExamType || loadingSingleExam) ? 
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
                maxWidth: 650,
                minWidth: 650
                }}
                onSubmit={handleSubmit(handleUpdateExam)} className="flex-col-center-cente">
                <div className="input-group">
                <label className="label" htmlFor="exams">
                    Selectionner les examens
                </label>
                {!loadingSingleExam && 
                    <Select
                        components={selectAnimation}
                        required
                        options={optionsTypes}
                        defaultValue = {selectedOptionType}
                        isMulti
                        className="input-field"
                        onChange={(items) => handleSelectChange(items)}
                        autoFocus
                        placeholder = "Selectioner les examens"
                    />
                }
                </div>
                <InputField 
                    id = "asked-doctor"
                    label = "Medecin Demandeur"
                    placeholder = "Entrer le nom du Medecin Demandeur"
                    register = {register("medecindemandeur", {
                        value: singleExam?.medecindemandeur
                    })}

                    error = {{for: "asked-doctor", text : errors?.medecindemandeur?.message}}
                />
                {singleExam?.medecindemandeur &&
                <p
                    className='actual-value'
                >Valeur actuelle {" "}
                    <span>
                        {singleExam.medecindemandeur}
                    </span> 
                </p>}

                <TextAreaField
                    id = "description"
                    label="Note d'examen"
                    placeholder="Noter quelques détails sur cette examen"
                    register = {register("description", {
                        required: false,
                        value: singleExam?.decriptionexam
                    })}
                    error = {{for : "description", text : errors?.description?.message}}
                />
                {singleExam?.decriptionexam &&
                <p
                    className='actual-value'
                >Valeur actuelle {" "}
                    <span>
                        {singleExam.decriptionexam}
                    </span> 
                </p>}

                <div className="grid-4 mt-30 mb-30">
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
                        {...register('clientajeun', {
                            value: singleExam?.clientajeun === 1 ? true: false
                        })}
                    />
                    <div className="checkmark" />
                    <span>Patient à jeûne?</span>
                </label>
                </div>
                <div className="btn-section d-flex-space-between mt-70 gap-5">
                    <button className="btn btn-main" type="submit">
                        Modifier
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
                    {(examTotalPrice) > 0 && 
                        <h2 className="exam-price">Prix 
                            <span> {formatNumber(examTotalPrice)}</span> $
                        </h2>
                    }
                    {(singleExam?.prixtotalexam || 0) > 0 && 
                        <h2 className="exam-price">Prix actuel
                            <span> {formatNumber(singleExam?.prixtotalexam)}</span> $
                        </h2>
                    }
                </div>
            </form>
            }
        </Fragment>
    );
};
