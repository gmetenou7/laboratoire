import React, { Fragment, useEffect, useState } from 'react';
import InputField, { TextAreaField } from "../../../component/utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {institutionsDataSelector} from "../../../features/institutionSlice.ts"
import { updateAssuranceContratThunk,
singleContractStatusSelector } from '../../../features/assuranceContratSlice.ts';
import callApi, { formatData, notification } from "../../../Utils/Utils.tsx"
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Puff } from 'react-loader-spinner';


interface SingleContrat {
        identifiant: number,
        code: string
        nom: string,
        numero: number,
        description: string,
        taux: number,
        codelabortoire: string,
        codeentrepriseinstitution: string,
        codeassureur: string,
        creerle: string,
        modifierle: string,
        activeornot: number,
        nomentreprise: string,
        nomassureur: string,
        clients: []
}
interface InsuredContract {
  nomcontrat: string,
  numerocontrat: number,
  tauxdereduction: number,
  descriptioncontrat: string,
  codeclient: [],
  codelaboratoire: string,
  codeentrepriseinstitution:string,
  codeassureur:string

}


export const UpdateInsuredContract = () => {
  
  const params = useParams()
  const code = params?.code
  const user = JSON.parse(localStorage.getItem("user") || "");
  const institutions = useSelector((state:any) => institutionsDataSelector(state));
  const insuredCompany = institutions?.filter(institutions => institutions.codeassureur === code)
  const patient = useSelector((state) => state.patient);
  const [client, setClient] = useState([])
  const selectAnimation = makeAnimated();
  const [singleContrat, setSingleContrat] = useState<SingleContrat>()
  const singleContrats = useSelector(state => singleContractStatusSelector(state, code))
  const [isMounted, setIsMounted] = useState(true)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleFetchSingleContrat= async () => {
    
    try {

      let response = await callApi(true, `contrat/${params?.code}`, "get", null);
        
        
      if (response?.data?.success) {
       
        setSingleContrat(response.data?.data)
       
      }

    } catch (error) {
      
    }
    };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InsuredContract>({
    defaultValues: {
      nomcontrat: singleContrats?.nom,
      numerocontrat: singleContrats?.numero,
      tauxdereduction: singleContrats?.taux,
      descriptioncontrat: singleContrats?.description,
      codeclient: singleContrats?.clients,
      codelaboratoire: singleContrats?.codelabortoire,
      codeentrepriseinstitution:singleContrats?.codeentrepriseinstitution,
      codeassureur:singleContrats?.codeassureur
    }
  });

  console.log("deatail", singleContrats);
  
  let optionsClients:any= []
  
      patient?.data?.forEach(
        function(item:any) {
          const options = {
            value: `${item?.matricule}`,
            label: `${item?.nom}`
          }
          optionsClients.push(options)
        }
      )
   
        function handleSelectChange(data:any) {
          setClient(data);   
          console.log(data);
          
        } 
   
  async function handleupdateContract(data:InsuredContract) {
      let codeclientRequest:any = []
      //codeclientRequest.push(optionsClients)
      client.forEach((item: any) => {
      const value = item?.value
      codeclientRequest.push(value);
      
    });
       const newcodeclientRequest = [...new Set(codeclientRequest)];
    let request_data = {
          nomcontrat: data?.nomcontrat,
          numerocontrat: data?.numerocontrat,
          tauxdereduction: data?.tauxdereduction,
          descriptioncontrat: data?.descriptioncontrat,
          codelaboratoire: data?.codelaboratoire,
          codeentrepriseinstitution:data?.codeentrepriseinstitution,
          codeassureur:data?.codeassureur,
          codeclient: newcodeclientRequest.length > 0 ? newcodeclientRequest : ""
    }

     console.log("ezaaaaaaaaaaaa",request_data);
    //return
    setLoading(true);
   
    try {
      const response = await dispatch(updateAssuranceContratThunk({
        data:request_data,
        code: code
      }))
      console.log("resssssssss",response);

      if(response.payload.data.success){
        
          notification("success", "Le contrat a été modifié  avec succes");
          handleFetchSingleContrat()
          setLoading(false);
      }
      else{
          setLoading(false);
          notification("error", formatData(response?.payload?.data?.data))
      }
      
    } catch (error) {
      setLoading(false);
      
    }
    
  }
  useEffect(() => {
        isMounted && handleFetchSingleContrat();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);
  
  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleupdateContract)}>
        <InputField
          id="nom"
          label="Nom du contrat"
          placeholder="Entrer le nom"
          register={register("nomcontrat", {
            required: "Ce champ est requis"
          })}
          error={{ for: "nom", text: errors?.nomcontrat?.message }}
        />
        <InputField
          id="numberContract"
          label="Numero de contrat"
          placeholder="Entrer le numero du contrat"
          register={register("numerocontrat", {
            required: "Ce champ est requis"
          })}
          error={{ for: "numberContract", text: errors?.numerocontrat?.message }}
        />
        <InputField
          id="taux"
          label="Taux de reduction %"
          placeholder="Entrer le taux"
          register={register("tauxdereduction", {
            required: "Ce champ est requis"
          })}
          error={{ for: "taux", text: errors?.tauxdereduction?.message }}
        />
        <div className="input-group">
          <label className="label" htmlFor="exams">
            Selectionner un ou plusieurs client
          </label>
          <Select
            components={selectAnimation}
            required
            options={optionsClients}
            isMulti
            className="input-field"
            onChange={(items) => handleSelectChange(items)}
            autoFocus
            placeholder = "Selectionner les clients"
          />
        </div>
        <div  className="form-group">               
            <div className="input-group">
              <label className="label" htmlFor="id-service">
                 Nom de l'entreprise                    
              </label>
                <select
                    className="input-field"
                        {...register("codeentrepriseinstitution", {
                          required: "ce champ est requis" })}>
                    <option disabled value="">Choisir une entreprise</option>
                    <option></option>
                    <option value={singleContrats?.codeentrepriseinstitution} selected>{singleContrats?.nomentreprise}  </option>
                    {insuredCompany?.map((option, index )=>(
                        <option
                          value={singleContrats?.codeentrepriseinstitution}
                          key={index}
                        >
                           {option?.nom}                     
                       </option>
                    ))}
                    
                </select>
           </div>                       
        </div>
      <TextAreaField
          id="description"
          label="Description du contrat"
          placeholder="Noter quelques détails sur ce contrat"
          register={register("descriptioncontrat", {
            required: false
          })}
          error={{ for: "description", text: errors?.descriptioncontrat?.message }}
      />
        <div className="btn-group">
          <button
            type="submit"
            className="btn btn-main"
          >Modifier

            {loading &&
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

        </div>
      </form>
    </Fragment>
  )
}
