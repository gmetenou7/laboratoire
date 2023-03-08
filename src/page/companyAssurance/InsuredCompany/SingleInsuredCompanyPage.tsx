import React, { Fragment } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { SingleInsuranceCompany } from '../../../component/assurance/insuredCompany/SingleInsuranceCompany.tsx';
import PageLayout from '../../PageLayout.tsx'
import { CompanyUserTable, CompanyClientTable } from "../../../component/tables/Table.tsx"


export const SingleInsuredCompanyPage = () => {

  const  agents= [

        {
            nom: "Wona",
            email: "charles@gmail.com",
            telephone: "+237655775544",
            prenom: "Charles",
            matricule: "22-34",
            
        },
        {
            nom: "Wona",
            email: "charles@gmail.com",
            telephone: "+237655775544",
            prenom: "Charles",
            matricule: "22-34",
            
        },
        {
            nom: "Wona",
            email: "charles@gmail.com",
            telephone: "+237655775544",
            prenom: "Charles",
            matricule: "22-34",
            
        },
            ]
  const  clients= [

        {
            nom: "richard",
            email: "charles@gmail.com",
            telephone: "+237655775544",
            prenom: "Charles",
            matricule: "22-34",
            
        },
        {
            nom: "alain",
            email: "charles@gmail.com",
            telephone: "+237655775544",
            prenom: "Charles",
            matricule: "22-34",
            
        },
        {
            nom: "gildas",
            email: "charles@gmail.com",
            telephone: "+237655775544",
            prenom: "Charles",
            matricule: "22-34",
            
        },
            ]

  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "");

  const content = <Fragment>
    
          <div className="single-agency-page">
            <div className="agency-info">
              <SingleInsuranceCompany
                IdAssurance={params.code}
              />
            </div>
             
                <div className="list-patients pb-20">
                  <div className="feature-title">
                    <h4 className="title">Liste clients</h4> 
                    <div className="btn-group">
                      <Link to={`/list-client/${params.code}`} className="btn-link-main">
                        Voir plus <FaAngleRight />
                      </Link>
                      <Link to={`/count-society/${params.code}`} className="btn-link-green">
                         Statitique <FaAngleRight />
                      </Link>
                    </div>
                  </div>
                  <div className="patients">
                    <CompanyClientTable
                      data={clients.slice(0, 2)}
                      simple={true}
                    />
                  </div>
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
