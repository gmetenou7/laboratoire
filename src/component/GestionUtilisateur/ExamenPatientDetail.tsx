import React, { Fragment, useEffect, useRef, useState } from 'react'
import ReactToPrint from "react-to-print";
import Sidebar from '../layout/Sidebar.tsx'
import Navbar from "../layout/Navbar.tsx"
import { getAppToken } from '../login/Utils.tsx';
import callApi from '../../Utils/Utils.tsx';
const ExamenPatientDetail = () => {

    let componentRef = useRef();

    const [nom, setNom]=useState("")
    const [prenom, setPrenom]=useState("")
    const [code, setCode]=useState()
    const [prixTotal, setPrixTotal]=useState("")
    const [nomExam, setNomExam]=useState("")
    const [prixExam, setPrixExam]=useState("")
    const [detailexamen, setDetailexamen] = useState([])
    const [description, setDescription]=useState("")
    const onShowPatientById = async ()=>{
        let token= await getAppToken()
        let pathname = window.location.pathname;
        let id = pathname.split("/")[2];
              if(token){
              
        
          localStorage.setItem('Apitoken', token)
                let response= await callApi(true, `examens/${id}`, 'get', null)
            let patients= response.data.dataetype
            setDetailexamen(patients)
                    console.log(patients);  
                setNom(response.data.dataexam.nom)
                setPrenom(response.data.dataexam.prenom)
              setCode(response.data.dataexam.matricule)
              setPrixTotal(response.data.dataexam.prixtotal)
              
              patients.map((item:any)=>{
                setNomExam(item.nom)
              setPrixExam(item.prixtotal)
              setDescription(item.description)
              })
              //console.log(prixExam);
              
                }
       }

       const printDoc=()=>{
        
        let content = document.getElementById("divToPrint");
        let prints = document.getElementById("ifmcontentstoprint");
        let  pri = prints?.contentWindow;
        pri.document.open();
        pri.document.write(content?.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
       }

       useEffect(()=>{
        onShowPatientById()
       })
  return (
    <Fragment>
        <Navbar/>
        <Sidebar/>
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content"></div>
            <iframe id="ifmcontentstoprint" style={{height: "0px" ,width: "0px", position: "absolute"}}></iframe>
            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content" ref={(el) => (componentRef = el)}>  
                <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">	
                <div className="kt-portlet">
                    <div className="kt-invoice-2">
                        <div className="kt-invoice__head">
                            <div className="kt-invoice__container">
                                <div className="kt-invoice__brand">
                                    <h1 className="kt-invoice__title">Examens</h1>

                                    <div  className="kt-invoice__logo">
                                        <a href="#"><img src="../../../../themes/keen/theme/demo1/dist/assets/media/misc/invoice2-logo.png"/></a>

                                        <span className="kt-invoice__desc">
                                                    <span>Laboratoire des soins, 711-2880 Nulla St., Mankato</span>
                                        <span>Odza borne 10</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="kt-invoice__items">
                                    <div className="kt-invoice__item">
                                        <span className="kt-invoice__subtitle">Examen De:</span>
                                        <span className="kt-invoice__text" style={{fontWeight:"bold", fontSize: "16px"}}>  {nom} {prenom}</span>
                                        {/* <span className="kt-invoice__text">Domicilié à: <br/>Mendong</span> */}
                                    </div>

                                    <div className="kt-invoice__item">
                                        <span className="kt-invoice__subtitle">DATE:</span>
                                        <span className="kt-invoice__text">Dec 12, 2018</span>
                                        <span className="kt-invoice__subtitle">NO de l'examen</span>
                                        <span className="kt-invoice__text">{code}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="kt-invoice__body">
                            <div className="kt-invoice__container">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>EXAMENS</td>
                                                <td></td>
                                                <td>Prix</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {detailexamen.length >1 && 
                                            detailexamen.map((keys: any)=>{
                                                return(
                                                    <tr>
                                                    <td>{keys.nom}</td>
                                                     
                                                     <td></td>
                                                     <td>{keys.prixtotal}</td>
                                                 </tr>
                                                )
                                            })
                                           } 

                                            {detailexamen.length ==1 && 
                                                    
                                                            <tr>
                                                            <td>{nomExam}</td>
                                                            
                                                            <td>{description}</td>
                                                            <td>{prixExam}</td>
                                                        </tr>
                                                       
                                                } 
                                                
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="kt-invoice__footer">
                            <div className="kt-invoice__container">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>DATE DE DELIVRANCE</th>
                                                <th>PRIX TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Nov 24, 2022</td>
                                                <td className="kt-font-danger kt-font-xl kt-font-boldest">{prixTotal}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="kt-invoice__actions">
                            <div className="kt-invoice__container">
                            {/* <ReactToPrint
                                trigger={() => <button type="button" className="btn btn-brand btn-bold" >Imprimer</button>}
                                content={() => componentRef}
                                /> */}

<button className="btn btn-primary" style={{ marginLeft: "100px" }} onClick={printDoc}>IMPRIMER</button>
{/*                                
                                <button type="button" className="btn btn-label-brand btn-bold" onClick={"window.print();"}>Download Invoice</button> */}
                                
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

export default ExamenPatientDetail