import React, { Fragment, useEffect } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { CreateInsuredCompagny } from './CreateInsuredCompagny.tsx';
import { InterfaceIsuredCompany } from './InterfaceIsuredCompany.tsx';
import {showModalReducer} from "../../../features/modalSlice.ts"
import { useParams } from 'react-router-dom';
import { listInstitutionThunk,
    institutionsDataSelector,
    institutionsStatusSelector
 } from '../../../features/institutionSlice.ts';
import { useSelector } from 'react-redux';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';



export function InsuredCompanyList(){
    

     const dispatch = useDispatch()
     const params = useParams();
     const code = params.code
     const user = JSON.parse(localStorage.getItem("user") || "");
     const institutions = useSelector((state:any) => institutionsDataSelector(state));
     const insuredCompany = institutions?.filter(institutions => institutions.codeassureur === code)
     const institutionStatus = useSelector((state: any) => institutionsStatusSelector(state))
      console.log("zzzzzzzzz", institutions);
      
    // const insuredCompagny =[
    //     {
    //         nom: "Export Express",
    //         email: "string@gmail.com",
    //         telephone: "+237699660099",
    //         adresse: "BP-Dla",
    //         code: "22-31",
    //         infoShared: "oui"
    //     },
    //     {
    //         nom: "Security IT",
    //         email: "string@gmail.com",
    //         telephone: "+237699660099",
    //         adresse: "BP-YDE",
    //         code: "22-32",
    //         infoShared: "oui"
    //     },
    //     {
    //         nom: "Issis Hotel",
    //         email: "string@gmail.com",
    //         telephone: "+237699660099",
    //         adresse: "BP-YDE",
    //         code: "22-33",
    //         infoShared: "oui"
    //     },
    //     {
    //         nom: "Brasserie",
    //         email: "string@gmail.com",
    //         telephone: "+237699660099",
    //         adresse: "BP-Ouset",
    //         code: "22-34",
    //         infoShared: "oui"
    //     },
    // ]
    //console.log("zzzzzzzzz", insuredCompagny);
    async function handlefetchInsuredCompany() {
               
               try {
                const response = dispatch(listInstitutionThunk( 
                    {matricule_labo: user?.matricule_labo,
                     code : params?.code  
                    }
                    ))
                
                 } catch (error) {
                  console.log("error", error);
                  
                 }
    }

    function handleCreateInsuredCompanyModal() {
        dispatch(showModalReducer({
            active: true,
            header: "Ajouter une entreprise assurée à votre liste",
            body: <CreateInsuredCompagny IdCompany={params.code}/>

        }))
    }

    useEffect(()=>{
         (institutionStatus.for === "idle" && institutionStatus.for === "idle") &&
        handlefetchInsuredCompany()
    }, [institutionStatus])
  return (
    <Fragment>
        {(institutionStatus.for ==="list" && institutionStatus.for === "loading") ? 
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
          <>
           {(institutionStatus.for ==="list" && institutionStatus.for === "error") ?
            <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={handlefetchInsuredCompany}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        institutions.length >0 ?
                        <div className='grid-4 gap-20'>
                            <InterfaceIsuredCompany data={ insuredCompany  }/> 
                        </div> 
                        : <h4 className='fail-text' >Aucune entreprise enregistrée </h4>
                        }
          </>
          }
        <div className="agencies-items py-40">
            <div              
               className="add-agency-item icon-tooltip"
               onClick={handleCreateInsuredCompanyModal}
               >
                <span className="tooltip-text">Ajouter Entreprise</span>
                 <BsFillPlusCircleFill
                    className='add-agency-icon'
                                />
            </div>
        </div>
    </Fragment>
  )
}
