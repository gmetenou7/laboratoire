import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layout/Navbar.tsx'
import Sidebar from '../layout/Sidebar.tsx'
const ListeFacture = () => {
  return (
    <Fragment>
        <Navbar/>
        <Sidebar/>
       <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
    <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content"></div>
    			
        <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
            <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
   
    <button className="kt-app__aside-close" id="kt_profile_aside_close">
        <i className="la la-close"></i>
    </button>
    
    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
        <div className="kt-portlet">
            <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                    <div className="form-group " style={{marginTop: '50px', justifyContent: 'space-betweem'}}>
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">Liste des factures du patient
                            </h3>
                            
                        </div>
                   </div>
                    
                </div>
                <div className="kt-portlet__head-toolbar">
                    <div className="kt-portlet__head-wrapper">
                        
                    </div>
                </div>
            </div>
            
               <div className="kt-portlet__body">
                    <div className="kt-section kt-section--first">
                        <div className="kt-section__body">
                           
                               
                            <table className="table table-striped- table-bordered table-hover table-checkable" id="kt_table_1">
                                 <thead>
                                    <tr>
                                     <th>Numero de la facture</th>
                                     <th>Date</th>
                                     <th>Prix</th>
                                     <th>Statut</th>
                                     <th>Action</th>               
                                    </tr>
                                </thead>
                                <tbody>

                                <tr>
				  					<td>00001</td>
				  					<td>23/11/2022</td>
				  					<td>25000</td>
                                    <td className='text-success'>Payé</td>
				  					<td  data-field="Actions" data-autohide-disabled="false" className="kt-datatable__cell">
                                        <span style={{overflow: "visible", position: "relative", width: "110px"}}>
                                        <Link title=" Voir les details d'une facture" to='/detailfacture/id' className="btn btn-sm btn-clean btn-icon btn-icon-md" >
                                        <i className="far fa-eye text-primary"></i>   
                                       </Link>	
                                            <a title="Supprimer la facture" className="btn btn-sm btn-clean btn-icon btn-icon-md" >
                                              <i className="la la-trash over text-danger"></i>
                                            </a>
                                        </span>
                                    </td>			
				  				</tr>
                                </tbody>
                            </table>

                            
                        </div>
                    </div>

                </div>
             
        </div>
    </div>
    
    </div>
    </div>
    </div>
    </div> 
    </Fragment>
  )
}

export default ListeFacture