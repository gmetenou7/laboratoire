import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import { Button, Card, Container, Modal } from "react-bootstrap";
import Examen from "./Examen.tsx";
import callApi from "../../Utils/Utils.tsx";
import logo from '../login/logincss/logo-5.png'

export default function ResultExamens() {

  let componentRef = useRef();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [listExamens, setListExamens] = useState([]);
  const [dataExamens, setDataExamens] = useState([]);
  const [villelabo, setVillelabo]=useState('')
  const [ruelabo, setRuelabo]=useState('')
  const [nomlabo ,setNomlabo]=useState('')
  const [emailLabo, setEmailLabo]=useState('')
  const [telLabo, setTelLabo]= useState('')
  const [code, setCode]=useState("")
  const [nom, setNom]=useState('')
  const [prenom, setPrenom]=useState("")
  const [age, setAge]=useState("")
  const [date, setDate]=useState("")
  const [sexe, setSexe]=useState("")
  const [statusresultat, setStatusResultat] = useState("");
 async function showPreview(data, status) {
    setShowPreviewModal(status);
    let id = data.matricule
    let response = await callApi(true, `examens/${id}`, "get", null);
    setShowPreviewModal(status);

    if (response.data.success) {
      setListExamens(response.data.dataetype);
      setDataExamens(response.data.dataexam);
      setVillelabo(response.data.dataexam.villelabo)
      setRuelabo(response.data.dataexam.ruelabo)
      setNomlabo(response.data.dataexam.nomlabo)
      setEmailLabo(response.data.dataexam.emaillabo)
      setTelLabo(response.data.dataexam.tellabo)
      setCode(response.data.dataexam.matcli)
      setNom(response.data.dataexam.nom)
      setPrenom(response.data.dataexam.prenom)
      setAge(response.data.dataexam.datenaisscli)
      setDate(response.data.dataexam.datecreatexam)
      setSexe(response.data.dataexam.clisexe)
      setStatusResultat(response.data.dataexam.statusresultat);
    }
    console.log(response.data);
   console.log(data);
  }
  const handleClose=()=>{
    setShowPreviewModal(false)
  }

  return (
    <>
      <Examen status_to_display="terminer" print={showPreview} />

      <Modal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Imprimer les resultats des examens du patient.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="App container mt-5" >
            
            <div id="divToPrint" className="m-3" ref={(el) => (componentRef = el)}>
            <div className="row d-flex justify-content-center">
              <div className="col-md-8">
                
                    
                  
                    <div className="address p-2">
                  <Container>
                      <tbody >
                      {/* <tr className="add" >
                        <td> <img src={logo} alt="logo" /></td>
                      <td colSpan={3} className="text-center" style={{ fontWeight: "bold", fontSize:"20px" }}>LABORATOIRE D'ANALYSE MEDICAL</td>
                      </tr> */}
                       <tr className="add" >
                       <td> <img src={logo} alt="logo" /></td>
                        <td  colSpan={2} className="text-center add" style={{ fontWeight: "bold", fontSize:"14px" }}>{nomlabo}</td>
                      </tr>
                      <tr className="content" >
                          <td></td>
                          <td colSpan={3} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>{villelabo} <br /> {ruelabo}</td>
                      </tr>
                     
                      <tr className="content" >
                        <td> </td>
                      <td colSpan={4} className="text-center" style={{ fontWeight: "bold", fontSize:"13px" }}>Telephone: {telLabo} | email: {emailLabo}</td>
                      </tr>
                      <br />
                      <br />
                      <tr className="add" >
                       
                      <td colSpan={4} className="text-center" style={{ fontWeight: "bold", fontSize:"20px" }}>FICHE RESULTAT</td>
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
                              <td className="font-weight-bold">Date de l'examen: {date}<br /> Medecin:  </td>
                              <td className="font-weight-bold">Nom du Patient: {nom} {prenom} <br /> Sexe: {sexe} <br />  Age: {age}<br />  code: {code}</td>
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
                              <td>Description</td>
                              <td>Statuts</td>
                              <td></td>
                              <td className="text-center"></td>
                          </tr>
                          <br />
                          {/* <tr className="add" style={{ borderColor: "silver", border: 'solid' }}>
                           
                              <td colSpan={6} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>Biochimie</td>
                              
                          </tr> */}
                          {listExamens.length >0 &&
                            listExamens.map((item:any)=>{
                              return(
                              <tr className="content">
                              <td>{item.nom}</td>
                              <td>{item.descriptionresultat}</td>
                              <td>{item.statustype}</td>
                              <td></td>
                              <td className="text-center"></td>
                          </tr>
                              )
                            })
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
              <div className="products p-2">
                  <table className="table table-borderless">
                      <tbody >
                          <tr className="add " >
                              <td className='col-8'> Conclusion</td>
                              
                          </tr>
                          <tr className="content" >
                          <td className='col-8'>{statusresultat} </td>
                           <td className='col-8'>  Signature</td>
                          </tr>
                          <tr className="content" >
                           <td className='col-8'> </td>
                           <td className='col-8'></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
                </div>
              </div> 
           
            </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Annuler</Button>
        <ReactToPrint
             trigger={() => <Button variant="primary"> Imprimer</Button>}
              content={() => componentRef}
                                />
          
        </Modal.Footer>
      </Modal>
      
    </>
  );
}
