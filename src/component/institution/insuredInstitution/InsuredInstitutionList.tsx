import React, { Fragment, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
//import { CreateAssurrance } from './CreateAssurrance.tsx'
import { showModalReducer } from "../../features/modalSlice.ts"
import { ContractInstitutionTable } from '../../tables/Table.tsx'
import { institutionsDataSelector } from "../../../features/institutionSlice.ts"
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
    listAssuranceContratThunk,
    contratStateSelector,
    contractStatusSelector
} from '../../../features/assuranceContratSlice.ts'
import { Puff } from 'react-loader-spinner'

interface FinancialType {
    codelabo: string,
    codecli: string,
    codeentreprise: string,
    codeassureur: string,
}

const InsuredInstituionList = () => {

    const contract = [

        {
            nom: "Maladie cardio-vasculaire",
            numberContract: "22-55",
            taux: "34%",
            description: "string",
            code: 4
        },
        {
            nom: "Examens",
            numberContract: "22-5",
            taux: "40%",
            description: "string",
            code: 2
        },
        {
            nom: 'Maladie',
            numberContract: "2206-22",
            taux: "15%",
            description: "string",
            code: 1
        },
    ]

    const params = useParams()
    const code = params?.code
    const institutions = useSelector((state: any) => institutionsDataSelector(state));
    const insuredCompany = institutions?.filter(institutions => institutions.codeassureur === null)
    const patient = useSelector((state) => state.patient);
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loading, setLoading] = useState(false)
    const contrat = useSelector(
        (state: any) => contratStateSelector(state)
    );
    const contractStatus = useSelector(
        (state: any) => contractStatusSelector(state)
    );
    console.log(contrat);

    const dispatch = useDispatch()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FinancialType>({
        defaultValues: {
            codelabo: user?.matricule_labo,
            codeassureur: params?.code ? params?.code : ""
        }
    });

    async function handleGetContratState(data) {
        setLoading(true)
        try {
            const response = await dispatch(
                listAssuranceContratThunk(data)
            )
            // console.log("tttttttttt",response)

            if (response) {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(handleGetContratState)}

                className="financial-state-form site-bg"
            >

                <div className="input-group">
                    <label className="label" htmlFor="id-service">
                        Nom de l'entreprise
                    </label>
                    <select
                        className="input-field"
                        {...register("codeentreprise", {
                            required: false
                        })}>
                        <option disabled value="">Choisir une entreprise</option>
                        <option></option>
                        {insuredCompany?.map((option, index) => (
                            <option
                                value={option?.code}
                                key={index}
                            >
                                {option?.nom}
                            </option>
                        ))}

                    </select>
                </div>


                <div className="input-group">
                    <label className="label" htmlFor="id-service">
                        Nom du client
                    </label>
                    <select
                        className="input-field"
                        {...register("codecli", {
                            required: false
                        })}>
                        <option disabled value="">Choisir un patient</option>
                        <option></option>
                        {patient?.data?.map((option, index) => (
                            <option
                                value={option?.matricule}
                                key={index}
                            >
                                {option?.nom}
                            </option>
                        ))}

                    </select>
                </div>


                <div className="btn-group mt-10">
                    <button
                        //disabled={(financialStatus.for === "range" && financialStatus.state === "loading")}
                        type="submit"
                        className="btn btn-main"
                    >
                        Enregistrer
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
            <div className="list-patients">
                <div className="feature-title">
                    <h4 className="title">Contrats</h4>
                    <div className="btn-group">
                        <Link to={`/create-institution-contrat/${params.code}`} className='btn-link-green'

                        >
                            <span >Ajouter contrat</span> <FaPlus />
                        </Link>
                    </div> 
                </div>
                {contrat?.length > 0 ?
                    <div className="patients">
                        <ContractInstitutionTable data={contrat}
                        />
                    </div>
                    :
                    <div className='loading-fail'>
                        <h4 className='fail-text text-center'>Aucun contrat trouvé. veuillez soumettre le formulaire ou selectionner
                            une entreprise</h4>
                    </div>
                }

            </div>
        </Fragment>
    )
}

export default InsuredInstituionList