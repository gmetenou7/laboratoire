import React, { Fragment } from 'react'
import Barcode from 'react-barcode'
import { Card, Col, Container, Row } from 'react-bootstrap'
import logo from '../../login/logincss/logo-5.png'

const FicheResultat = () => {
  return (
    <Fragment>
         <div className="App container mt-5">
            <button className="btn btn-primary" >Export To PDF</button>
            <div id="divToPrint" className="m-3">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8">
                <div className="card ">
                    
                  {/* <div className="d-flex flex-row p-4" >
                    <div className="d-flex flex-column" style={{textAlign:"center"}}> 
                     <span className="font-weight-bold" >Laboratoire</span>  
                    </div>
                    </div> */}
                    {/* <hr /> */}
                    <div className="address p-2">
                  <Container>
                      <tbody >
                      <tr className="add" >
                        <td> <img src={logo} alt="logo" /></td>
                      <td colSpan={3} className="text-center" style={{ fontWeight: "bold", fontSize:"20px" }}>LABORATOIRE D'ANALYSE MEDICAL</td>
                      </tr>
                      <tr className="add" >
                        <td></td>
                        <td colSpan={3} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>localisation du laboratoire</td>
                      </tr>
                      <tr className="content" >
                        <td></td>
                        
                        <td  colSpan={2} className="text-center add" style={{ fontWeight: "bold", fontSize:"14px" }}>Nom du laboratoire</td>
                      </tr>
                      <tr className="content" >
                        <td> </td>
                      <td colSpan={4} className="text-center" style={{ fontWeight: "bold", fontSize:"13px" }}>Telephone: 0000 | email:email@gmail.com</td>
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
                             <Barcode value='Patient test' format="CODE128" />
                             
                             
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
                              <td className="font-weight-bold">Date de l'examen: 12/12/2022 <br /> Medecin: Dr X </td>
                              <td className="font-weight-bold">Sexe: Feminin <br />  Age: 20ans<br />  code: AZERC</td>
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
                          <tr className="add" style={{ borderColor: "silver", border: 'solid' }}>
                           
                              <td colSpan={6} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>Biochimie</td>
                              
                          </tr>
                          <tr className="content">
                              <td>Paludisme</td>
                              <td>1500</td>
                              <td>0</td>
                              <td>0</td>
                              <td className="text-center">1500 Fcfa</td>
                          </tr>
                          <br />
                          <tr className="add" style={{ borderColor: "silver", border: 'solid' }}>
                           
                              <td colSpan={6} className="text-center" style={{ fontWeight: "bold", fontSize:"16px" }}>Bilan Inflammatoire</td>
                              
                          </tr>
                          <tr className="content">
                              <td>CRP</td>
                              <td>350</td>
                              <td>0</td>
                              <td>0</td>
                              <td className="text-center">0</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
               
              <hr />
              <div className="address p-2">
                  <table className="table table-borderless">
                      <tbody >
                          <tr className="add " >
                              <td className='col-8'></td>
                              <td className='col-8'>Total: 1500</td>
                          </tr>
                          <tr className="content" >
                           <td className='col-8'></td>
                           <td className='col-8'> Total Net :1500 Fcfa </td>
                          </tr>
                          <tr className="content" >
                           <td className='col-8'></td>
                           <td className='col-8'> Reduction en % :0%</td>
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

export default FicheResultat