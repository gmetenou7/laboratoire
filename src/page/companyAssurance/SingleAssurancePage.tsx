import React, { Fragment, useEffect, useState } from 'react'
import { FaAngleRight, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { InsuredCompanyList } from '../../component/assurance/insuredCompany/InsuredCompanyList.tsx';
import { SingleAssurance } from '../../component/assurance/SingleAssurance.tsx';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { StatistiqueCard } from "../../component/cards/StatistiqueCard.tsx";
import {institutionsDataSelector} from "../../features/institutionSlice.ts"
import {contratStateSelector} from "../../features/assuranceContratSlice.ts"
import PageLayout from "../PageLayout.tsx";
import callApi from "../../Utils/Utils.tsx"
import { useSelector } from 'react-redux';


interface Contract {
  clients: [],
  code:string,
  codeassureur:string,
  codeentrepriseinstitution:string,
  codelabortoire:string,
  creerle:string,
  description: string,
  entreprises: [],
  identifiant:number,
  modifierle:string,
  nom:string,
  numero: string,
  taux:number
}
export const SingleAssurancePage = () => {

  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "");
  const code = params.code;
  const [isMounted, setIsMounted] = useState(true)
  const institutions = useSelector((state:any) => institutionsDataSelector(state));
  const insuredCompany = institutions?.filter(institutions => institutions.codeassureur === code)
  const [contract, setContract] = useState([])

  const handleFetcheSingleAssuranceCompany = async () => {
    
    try {

      let response = await callApi(true, `assureuralldata/${code}`, "get", null);
       // console.log(response.data?.data);
        
      if (response?.data?.success) {
        
        setContract(response.data?.data?.contrats)
      // console.log("singleaaaaaaaaaa",response.data?.data);
      }

    } catch (error) {
      
    }
    };
    console.log("singleaaaaaaaaaa ",contract);
     let clientStat = 0;
     for (let i = 0; i < contract.length; i++) {
    clientStat += contract[i]?.clients?.length
  }
   console.log("nombre client",clientStat);
  
    useEffect(() => {
        isMounted && handleFetcheSingleAssuranceCompany();
        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);
  const content = <Fragment>
          <div className="single-agency-page">
            <div className="agency-info">
              <SingleAssurance
                IdAssurance={params.code}
              />
            </div>
            <div className="services-list">
              <div className="grid-3 gap-20">
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<CurrencyExchangeTwoToneIcon
                                className="card-icon"
                            />}
                            stateHead={contract?.length > 0 ? contract?.length : "0"}
                            headline="Contrats"
                            stateCaption="Contracts"
                        />
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<AssignmentTurnedInIcon
                                className="card-icon"
                            />}
                            stateHead="0"
                            headline="Nombre Client"
                            stateCaption="Clients"
                        />
                        <StatistiqueCard
                            className="statistique-card main-blue"
                            icon={<AssignmentTurnedInIcon
                                className="card-icon"
                            />}
                            stateHead={insuredCompany.length > 0 ? insuredCompany.length : "0"}
                            headline=" Entreprises"
                            stateCaption="Entreprises"
                        />
              </div>
              <div className="info-header py-40">
                
                <div className="d-flex gap-20">
                  <h2 className='list-header' > Entreprises  </h2>
                  <div className="btn-group ">
                        <Link to={`/list-contract/${params.code}`} className='btn btn-main'>Contrat</Link>
                        <Link to={`/list-client/${params.code}`} className='btn btn-main'> Clients</Link>
                        <Link to={`/statistique-assurance/${params.code}`} className='btn btn-main'>Statistiques</Link>
                  </div>
                  
                </div>
              </div>
              <InsuredCompanyList/>
            </div>
          </div>
          
    </Fragment>
  return (
    <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
  )
}
