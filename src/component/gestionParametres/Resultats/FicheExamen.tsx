import React, { Fragment, useEffect, useRef, useState } from 'react'
import Barcode from 'react-barcode';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import logo from '../../login/logincss/logo-5.png'
import {getAppToken} from '../../login/Utils.tsx'
import callApi from '../../../Utils/Utils.tsx';
import ReactToPrint from "react-to-print";
import './ficheExamen.css'
import { Link } from 'react-router-dom';

const FicheExamen = () => {

  let componentRef = useRef();
  let componentRef1 = useRef();

  const [show, setShow] = useState(false);
    const [nom, setNom]=useState("")
    const [prenom, setPrenom]=useState("")
    const [code, setCode]=useState()
    const [prixTotal, setPrixTotal]=useState("")
    const [nomExam, setNomExam]=useState("")
    const [prixExam, setPrixExam]=useState("")
    const [detailexamen, setDetailexamen] = useState([])
    const [description, setDescription]=useState("")
    const [emaillabo, setEmaillabo]=useState('')
    const [sexe, setSexe]=useState("")
    const [nomlabo, setNomlabo]=useState('')
    const [tellabo, setTellabo]=useState("")
    const [datecreatexam, setDatecreatexam]=useState("")
    const [age, setAge]=useState("")
    const [region, setRegion]= useState("")
    const [rue, setRue]= useState("")

    const handleClose1 = () => setShow(false);
    const handleShow = () => setShow(true);

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
              setCode(response.data.dataexam.matcli)
              setEmaillabo(response.data.dataexam.emaillabo)
              setPrixTotal(response.data.dataexam.prixtotal)
              setSexe(response.data.dataexam.clisexe)
              setNomlabo(response.data.dataexam.nomlabo)
              setTellabo(response.data.dataexam.tellabo)
              setAge(response.data.dataexam.datenaisscli)
              setDatecreatexam(response.data.dataexam.datecreatexam)
              setRegion(response.data.dataexam.regionlabo)
              setRue(response.data.dataexam.ruelabo)
              patients.map((item:any)=>{
                setNomExam(item.nom)
              setPrixExam(item.prixtotal)
              setDescription(item.description)
              })
              //console.log(prixExam);
              
                }
       }

       useEffect(()=>{
        onShowPatientById()
       })

      //  const printDoc=()=>{
        
      //   let content = document.getElementById("divToPrint");
      //   let prints = document.getElementById("ifmcontentstoprint");
      //   let  pri = prints?.contentWindow;
      //   pri.document.open();
      //   pri.document.write(content?.innerHTML);
      //   pri.document.close();
      //   pri.focus();
      //   pri.print();
      //  }
  return (
    <Fragment>

     <Modal show={show} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Imprimer le code barre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card style={{height: "90px", border: "none", width:"25%"}} ref={(el) => (componentRef1 = el)}> 
          <Barcode value={code} format="CODE128" />
        </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Annuler
          </Button>
          <ReactToPrint
            trigger={() => <button className="btn btn-primary" >IMPRIMER</button>}
            content={() => componentRef1}
                                />
        </Modal.Footer>
      </Modal>
      
         <div className="App container mt-5">
          <div className='row ' style={{ justifyContent: "space-between" }}>
          <Col >
              
            <Link to="/examens" className="btn btn-primary" style={{marginLeft: "25px"}}>Retour sur examen</Link>
            </Col>
            <Col  >
             
            <Link to={`/listepatient/${code}`} className="btn btn-primary">Retour sur patient</Link>
            </Col>
            <Col  >
              
              {/* <button className="btn btn-primary" style={{ marginLeft: "100px" }} onClick={printDoc}>IMPRIMER</button> */}
            <ReactToPrint
            trigger={() => <button className="btn btn-primary" >IMPRIMER</button>}
            content={() => componentRef}
                   />
            </Col>
            <Col  >
             
             <button className="btn btn-primary" onClick={handleShow} style={{marginLeft: "25px"}} >Code Barre Imprimer</button>
            </Col>
          </div >
         
          {/* <iframe id="ifmcontentstoprint" style={{height: "0px" ,width: "0px", position: "absolute"}}></iframe> */}
            <div id="divToPrint"  className="m-3" ref={(el) => (componentRef = el)}>
            <div className="row d-flex justify-content-center">
              <div className="col-md-8">
                <div style={{backgroundColor: "white"}} >
                    
                  {/* <div className="d-flex flex-row p-4" >
                    <div className="d-flex flex-column" style={{textAlign:"center"}}> 
                     <span className="font-weight-bold" >Laboratoire</span>  
                    </div>
                    </div> */}
                    {/* <hr /> */}
                    <div className="address p-2">
                  <Container>
                      <tbody >
                      {/* <tr className="add" >
                        <td> <img src={logo} alt="logo" /></td>
                      <td colSpan={3} className="text-center" style={{ fontWeight: "bold", fontSize:"20px" }}>LABORATOIRE D'ANALYSE MEDICAL</td>
                      </tr> */}
                      <tr className="add"  >
                      <td> <img src={logo} alt="logo" /></td>
                        <td colSpan={3} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>{nomlabo}</td>
                      </tr>
                      <tr className="content" >
                        <td></td>
                        
                        <td  colSpan={2} className="text-center add" style={{ fontWeight: "bold", fontSize:"14px" }}>{region}  {rue} </td>
                      </tr>
                      <tr className="content" >
                        <td> </td>
                      <td colSpan={4} className="text-center" style={{ fontWeight: "bold", fontSize:"13px" }}>Telephone: {tellabo} | email:{emaillabo}</td>
                      </tr>
                      <br />
                      <br />
                      <tr className="add" >
                       
                      <td colSpan={4} className="text-center" style={{ fontWeight: "bold", fontSize:"20px" }}>Fiche d'examen</td>
                      </tr>
                      <br />
                        <tr className="content" >
                           <td className='col-8'></td>
                           <td className='col-8'>
                           <Card style={{height: "90px", border: "none", width:"25%"}}> 
                             <Barcode value={code} format="CODE128" />
                             
                             
                           </Card>
                           </td>
                          </tr>
                           
                          
                      </tbody>
                  </Container>
              </div>
                    <div className="table-responsive p-2">
                     <table className="table table-borderless">
                       <tbody>
                          <tr className="add">
                             
                          </tr>
                          <tr className="content">
                              <td className="font-weight-bold">Date de l'examen: {datecreatexam} <br /> </td>
                              <td className="font-weight-bold">Nom: {nom} {prenom} <br /> Sexe: {sexe} <br />  Age: {age}<br />  code: {code}</td>
                          </tr>
                        </tbody>
                      </table>
                   </div>
                  <hr />
                  <div className="products p-2">
                  <table className="table table-borderless">
                      <tbody>
                          <tr className="add" style={{ backgroundColor: "#eff1f3" }}>
                              <td>Examens</td>
                              <td>Prix</td>
                              <td>Reduction en %</td>
                              <td>Reduction en CUR</td>
                              <td className="text-center">Total</td>
                          </tr>
                          <br />
                          {/* <tr className="add" style={{ borderColor: "silver", border: 'solid' }}>
                           
                              <td colSpan={6} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>Biochimie</td>
                              
                          </tr> */}
                          {detailexamen.length >1 && 
                                            detailexamen.map((keys: any)=>{
                                                return(
                                                  <tr className="content">
                                                  <td>{keys.nom}</td>
                                                  <td>{keys.prixtotal}</td>
                                                  <td>0</td>
                                                  <td>0</td>
                                                  <td className="text-center">{keys.prixtotal} Fcfa</td>
                                              </tr>
                                                )})}
                                                {detailexamen.length ==1 && 
                                                    
                                                    <tr  className="content">
                                                    <td>{nomExam}</td>
                                                    <td>{prixExam}</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td className="text-center">{prixExam}</td>

                                                </tr>
                                               
                                        } 
                          
                          <br />
                          {/* <tr className="add" style={{ borderColor: "silver", border: 'solid' }}>
                           
                              <td colSpan={6} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>Bilan Inflammatoire</td>
                              
                          </tr>
                          <tr className="content">
                              <td>CRP</td>
                              <td>350</td>
                              <td>0</td>
                              <td>0</td>
                              <td className="text-center">0</td>
                          </tr> */}
                      </tbody>
                  </table>
                </div>
               
              <hr />
              <div className="address p-2">
                  <table className="table table-borderless">
                      <tbody >
                          <tr className="add " >
                              <td className='4' ></td>
                              <td className='6'></td>
                              <td className='6'></td>
                              <td className='6'></td>
                              <td className='6'></td>
                              <td className='6'></td>
                              
                              <td className='6' style={{ fontWeight: "bold", fontSize:"16px" }}>Total: {prixTotal}</td>
                          </tr>
                          
                      </tbody>
                  </table>
              </div>
                </div>
              </div> 
            </div>
            </div>
         </div>
           
    </Fragment>
  )
}

export default FicheExamen