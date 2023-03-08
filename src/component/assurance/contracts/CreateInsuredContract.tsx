import React, { Fragment, useEffect, useState } from 'react';
import InputField, { TextAreaField } from "../../../component/utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {institutionsDataSelector} from "../../../features/institutionSlice.ts"
import { createAssuranceContratThunk } from '../../../features/assuranceContratSlice.ts';
import { formatData, notification } from "../../../Utils/Utils.tsx"
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Puff } from 'react-loader-spinner';


interface InsuredContract {
  nomcontrat: string,
  numerocontrat: string,
  tauxdereduction: string,
  descriptioncontrat: string,
  codeclient: [],
  codelaboratoire: string,
  codeentreprise:string,
  codeassureur:string

}
export const CreateInsuredContract = () => {
  
  const params = useParams()
  const code = params?.code
  const user = JSON.parse(localStorage.getItem("user") || "");
  const institutions = useSelector((state:any) => institutionsDataSelector(state));
  //const insuredCompany = institutions?.filter(institutions => institutions.codeassureur === code)
  const patient = useSelector((state) => state.patient);
  const [client, setClient] = useState([])
  const selectAnimation = makeAnimated();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InsuredContract>({
    defaultValues: {
      codelaboratoire: user?.matricule_labo,
      codeassureur: params?.code
    }
  });

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
   
  async function handleCreateContract(data:InsuredContract) {
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
          codeentreprise:data?.codeentreprise,
          codeassureur:data?.codeassureur,
          codeclient: newcodeclientRequest.length > 0 ? newcodeclientRequest : ""
    }

     console.log("ezaaaaaaaaaaaa",request_data);
    //return
    setLoading(true);
   
    try {
      const response = await dispatch(createAssuranceContratThunk(request_data))
      //console.log("resssssssss",response);

      if(response.payload.data.success){
        //navigate('/employees')
          notification("success", "Le contrat a été créé avec succes");
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

  
  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleCreateContract)}>
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
                        {...register("codeentreprise", {
                          required: "ce champ est requis" })}>
                    <option disabled value="">Choisir une entreprise</option>
                    <option></option>
                     {institutions?.map((option, index )=>(
                        <option
                          value={option?.code}
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
          >Créer

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
