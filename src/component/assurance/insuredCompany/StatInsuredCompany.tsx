import React, { Fragment, useEffect } from 'react';
import { Puff } from 'react-loader-spinner';
import InputField from "../../../component/utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { formatNumber } from "../../utilities/numberFormater.ts";
import { StatInsuredCompanyTable } from '../../tables/Table.tsx';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { StatistiqueCard } from "../../cards/StatistiqueCard.tsx";

interface FinancialType {
    codeagence: string,
    datedebut: string,
    datefin: string,
    prixfacture: number
}

interface StatInsuredCompany {
  codefacture: string
  datecreation: string
  dernieremodification: string
  prixfacture: number
  codebonexamen: string
  nomexamen:string,
  nomclient: string
  prenomclient: string
  nomemploye: string
  nomagence: string
}


export function StatInsuredCompany() {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user") || "");

    const statistiques=[
        {
        codefacture: "22-44",
        datecreation: "12-02-23",
        dernieremodification: "12-02-23",
        prixfacture: "2",
        codebonexamen: "002",
        nomexamen:"CRACHAT",
        nomclient: "LINE ",
        prenomclient: "VANEL",
        
        },
        {
        codefacture: "22-42",
        datecreation: "12-02-23",
        dernieremodification: "12-02-23",
        prixfacture: "2",
        codebonexamen: "002",
        nomexamen:"Diabethe",
        nomclient: "LINE ",
        prenomclient: "VANEL",
        
        },
        {
        codefacture: "22-46",
        datecreation: "12-02-23",
        dernieremodification: "12-02-23",
        prixfacture: "3",
        codebonexamen: "002",
        nomexamen:"hepathite",
        nomclient: "rodrigues ",
        prenomclient: "VANEL",
        
        },
        {
        codefacture: "22-45",
        datecreation: "12-02-23",
        dernieremodification: "12-02-23",
        prixfacture: "3",
        codebonexamen: "002",
        nomexamen:"sang",
        nomclient: "Claude ",
        prenomclient: "VANEL",
        
        }
    ]
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FinancialType>();

    

   
    

    return (
        <Fragment>

            <div className="single-agency-page ">
                <StatistiqueCard
                    className="statistique-card main-blue"
                    icon={<AssignmentIcon
                    className="card-icon"
                    />}
                        stateHead="4"
                        headline="Contrat(s)"
                        stateCaption="Contrat(s)"
                       />
            </div>
            <div className="services-list ">
                <form 
                    className="financial-state-form site-bg"
                    >
                    <div className="input-group">
                        <label className="label" htmlFor="id-service"> Choisisser un client
                            {/* <span className="message text-danger">
                                {errors?.codeagence?.message && errors?.codeagence?.message}
                            </span> */}
                        </label> 
                        <select
                            
                            className="input-field"
                            // {...register("codeagence", {
                            //     required: false
                            // })}
                        >
                            <option >Choisir un client</option>
                            <option >Charles</option>
                            <option >Alain</option>
                            <option >Martial</option>
                        </select> 
                    </div>
                    <InputField
                        id="datedebut"
                        label="Date de debut"
                        type="date"
                        placeholder="Entrer la date de debut"
                        register={register("datedebut", {
                            required: 'Champ requis'
                        })}
                        error={{ for: "datedebut", text: errors?.datedebut?.message }}
                    />
                    <InputField
                        id="datefin"
                        label="Date de fin"
                        type="date"
                        placeholder="Entrer la date de debut de fin"
                        register={register("datefin", {
                            required: 'Champ requis'
                        })}
                        error={{ for: "datedebut", text: errors?.datefin?.message }}
                    />

                    <div className="btn-group mt-10">
                        <button
                        
                            type="submit"
                            className="btn btn-main"
                        >
                            Enregistrer
                            
                                {/* <Puff
                                    height="20"
                                    width="20"
                                    radius={1}
                                    color="#fff"
                                    ariaLabel="puff-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                /> */}
                        
                        </button>

                    </div>
                </form>
                </div>
                <div className="list-financial">
                    <StatInsuredCompanyTable data={statistiques}/>
                </div>
                <div className="financial-state-footer site-bg">
                    <p className='pricing'>
                        Prix Total:
                        <span>
                        {formatNumber(10)} $  
                        </span>
                    </p>
                    <button      
                        type="button"
                        className="btn btn-main-blue"    
                        >
                            Imprimer
                    </button>
            </div>
    
        </Fragment>
    )
}
