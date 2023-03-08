import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../layout/Navbar.tsx';
import Sidebar from '../layout/Sidebar.tsx'
import { getAppToken } from '../login/Utils.tsx';
import callApi from '../../Utils/Utils.tsx';

const Statistique = () => {
    const [chiffreaffire, setChiffreaffire]=useState("")
    const [nbreClient, setNbreClient]=useState("")
    const [nbreExamen, setNbreExamen]=useState("")
    const [caagence, setCaagence]=useState([])
    const [caagenceExamen, setCaagenceExamen]=useState([])
    const [matricule_laboSession,setMatricule_laboSession]=useState("")
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    let sessionMatlabo: any;
    const inituserLab = () => {
        let users: any = localStorage.getItem("user");
        let user: any = JSON.parse(users);
        setMatricule_laboSession(user.matricule_labo);
        sessionMatlabo = user.matricule_labo;
        
      };
    const onShowChiffrAffaire = async ()=>{
    
        let token= await getAppToken()
              if(token){
              let id= sessionMatlabo
          localStorage.setItem('Apitoken', token)
                let response= await callApi(true, `chiffreaffire/${id}`, 'get', null)
            let ca= response.data.data.caentreprise

            setChiffreaffire(ca)
            setCaagence(response.data.data.caagence)
                console.log("ca",response)}
       }

       const onShowNbrePatient = async ()=>{
    
        let token= await getAppToken()
              if(token){
                let id= sessionMatlabo
          localStorage.setItem('Apitoken', token)
                let response= await callApi(true, `nbrclient/${id}`, 'get', null)
                let client= response.data.data

            setNbreClient(client)
             }
            }
       const onShowNbreExamen = async ()=>{
    
        let token= await getAppToken()
              if(token){
                let id= sessionMatlabo
          localStorage.setItem('Apitoken', token)
                let response= await callApi(true, `nbrexamen/${id}`, 'get', null)
                let caentreprise= response.data.data.caentreprise

                setNbreExamen(caentreprise)
                setCaagenceExamen(response.data.data.caagence)
                console.log("examen",response)}
       }

       useEffect(()=>{
        onShowChiffrAffaire()
        onShowNbreExamen()
        onShowNbrePatient()
        inituserLab() 
       },[])
  return (
    <Fragment>
        <Navbar/>
        <Sidebar/>
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
        <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

        <div className="kt-subheader   kt-grid__item" id="kt_subheader">
                        <div className="kt-container  kt-container--fluid ">
                            <div className="kt-subheader__main">
                                

                                <span className="kt-subheader__separator kt-hidden"></span>
                                <div className="kt-subheader__breadcrumbs">
                                    
                                </div>

                            </div>
                            <div className="kt-subheader__toolbar">
                                <div className="kt-subheader__wrapper">
                                    
                                    <div className="dropdown dropdown-inline" data-toggle="kt-tooltip" title="Quick actions" data-placement="top">
                                        <a href="#" className="btn btn-icon btn btn-label btn-label-brand btn-bold" data-toggle="dropdown" data-offset="0px,0px" aria-haspopup="true" aria-expanded="false">
                                            <i className="flaticon2-add-1"></i>
                                        </a>
                                        
                                    </div>
                                    <a href="#" className="btn btn-sm btn-elevate btn-brand btn-elevate" id="kt_dashboard_daterangepicker" data-toggle="kt-tooltip" title="" data-placement="left" data-original-title="Select dashboard daterange">
                                        <span className="kt-opacity-7" id="kt_dashboard_daterangepicker_title">Aujourd'hui:</span>&nbsp;
                                        <span className="kt-font-bold" id="kt_dashboard_daterangepicker_date">{date}</span>
                                        {/* <i className="flaticon-calendar-with-a-clock-time-tools kt-padding-l-5 kt-padding-r-0"></i> */}
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                    

                    
                    <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                      
                       <div className="row">
                                {/**Statistique 1 */}
                                <div className="col-lg-6 col-xl-4 order-lg-1 order-xl-1">
                                
                                <div className="kt-portlet kt-portlet--height-fluid">
                                    <div className="kt-portlet__head  kt-portlet__head--noborder">
                                        <div className="kt-portlet__head-label">
                                            <h3 className="kt-portlet__head-title">Clients</h3>
                                        </div>
                                        
                                    </div>
                                    <div className="kt-portlet__body kt-portlet__body--fluid">
                                        <div className="kt-widget-21">
                                            <div className="kt-widget-21__title">
                                                <div className="kt-widget-21__label">Total {nbreClient}</div>
                                                {/* <div className="kt-widget-21__label">Total 0</div> */}
                                            </div>
                                           <div className="kt-widget-21__data">
                                                
                                                 {/* <div className="kt-widget-21__legends">
                                                    <div className="kt-widget-21__legend">
                                                        <i className="kt-bg-brand"></i>
                                                        <span>Agence 0 | <b>0</b></span>
                                                    </div>
                                                    <div className="kt-widget-21__legend">
                                                        <i className="kt-shape-bg-color-4"></i>
                                                        <span>Agence 0 | <b>0</b></span>
                                                    </div>
                                                    <div className="kt-widget-21__legend">
                                                        <i className="kt-shape-bg-color-3"></i>
                                                        <span>Agence 0 | <b>0</b></span>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/***Statistique 2 */}
                                <div className="col-lg-6 col-xl-4 order-lg-1 order-xl-1">
                                
                                <div className="kt-portlet kt-portlet--height-fluid">
                                    <div className="kt-portlet__head  kt-portlet__head--noborder">
                                        <div className="kt-portlet__head-label">
                                            <h3 className="kt-portlet__head-title">Chiffre d'Affaire (CA)</h3>
                                        </div>
                                        
                                    </div>
                                    <div className="kt-portlet__body kt-portlet__body--fluid">
                                        <div className="kt-widget-21">
                                            <div className="kt-widget-21__title">
                                                <div className="kt-widget-21__label">Total {chiffreaffire}</div>
                                                {/* <div className="kt-widget-21__label">Total 0</div> */}
                                            </div>
                                            <div className="kt-widget-21__data">
                                                
                                                <div className="kt-widget-21__legends">
                                                {caagence.length>0 &&
                                                    caagence.map((item:any)=>{
                                                        return(
                                                        <div className="kt-widget-21__legend">
                                                            <i className="kt-bg-brand"></i>
                                                            <span>{item.agence}  | <b>{item.prixtotal}</b></span>
                                                        </div>
                                                        )
                                                    })

                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                               {/**statistiqye 3 */}
                                <div className="col-lg-6 col-xl-4 order-lg-1 order-xl-1">
                                
                                <div className="kt-portlet kt-portlet--height-fluid">
                                    <div className="kt-portlet__head  kt-portlet__head--noborder">
                                        <div className="kt-portlet__head-label">
                                            <h3 className="kt-portlet__head-title">Examens</h3>
                                        </div>
                                        
                                    </div>
                                    <div className="kt-portlet__body kt-portlet__body--fluid">
                                        <div className="kt-widget-21">
                                            <div className="kt-widget-21__title">
                                                <div className="kt-widget-21__label">Total {nbreExamen}</div>
                                                {/* <div className="kt-widget-21__label">Total 0</div> */}
                                            </div>
                                            <div className="kt-widget-21__data">
                                                
                                                <div className="kt-widget-21__legends">
                                                {caagenceExamen.length>0 &&
                                                    caagenceExamen.map((item:any)=>{
                                                        return(
                                                        <div className="kt-widget-21__legend">
                                                            <i className="kt-bg-brand"></i>
                                                            <span>{item.agence}  | <b>{item.nbrexamen}</b></span>
                                                        </div>
                                                        )
                                                    })

                                                }
                                                </div>
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

export default Statistique