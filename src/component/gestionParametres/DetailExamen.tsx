import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import Navbar from '../layout/Navbar.tsx';
import Sidebar from '../layout/Sidebar.tsx';
import { getAppToken } from '../login/Utils.tsx';
import callApi from '../../Utils/Utils.tsx';
import { notification } from "../../Utils/Utils.tsx"
import { Link } from 'react-router-dom';

const DetailExamen = () => {
    const [show, setShow] = useState(false);
    const [loaderExam, setLoaderExam]= useState(false)
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [examen, setExamen]= useState([])
    const [nomfam, setNomfam]=useState("")
    const [matricule_laboSession, setMatricule_laboSession]=useState();
    const [nom, setNom]=useState("")
    const [prix, setPrix]=useState("")
    const [selectTypeExam, setSelectTypeExam]=useState({})

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);

    const handleShow = () => setShow(true);

    const handleShow1 = (examen:any) => {
        setSelectTypeExam(examen)
        setShow1(true);}

        const handleShow2 = (examen:any) => {
            setSelectTypeExam(examen)
            setShow2(true);}
    
    let pathname = window.location.pathname;
        let id = pathname.split("/")[2];
    const onShowExamById = async ()=>{
    
        let token= await getAppToken()
        let pathname = window.location.pathname;
        let id = pathname.split("/")[2];
              if(token){
                console.log(token)
        
          localStorage.setItem('Apitoken', token)
                let response= await callApi(true, `famille/${id}`, 'get', null)
                if (response?.data?.success){
           console.log("aaaaaaaaaaaaaaa", response.data.data.nom);
           setNomfam(response.data.data.nom)
                }
               }
       }
       const onShowTypeExam = async ()=>{
    
        let token= await getAppToken()
        
        
              if(token){
                setLoaderExam(true)
                
        
          localStorage.setItem('Apitoken', token)
                let response= await callApi(true, "typeexamen", 'get', null)
                if (response?.data?.success){
           
           let result = response.data.data
           setExamen(result)
           setLoaderExam(false)
                }
           
               }
       }
       const inituserMat=()=>{
        let users: any = localStorage.getItem("matriculeLabo")
        setMatricule_laboSession(users)
        
      }

      const handleChangeModify = (e: any, key: string) => {
        setSelectTypeExam((state) => {
          return { ...state, [key]: e.target.value };
        });
      }
       const handleCreateTypeExam = async (e:any)=>{
                e.preventDefault();
            let type=    {
                    nom : nom,
                    prix : prix,
                    matricule_labo : matricule_laboSession,
                    matricule_fam : id
                 }
        let token= await getAppToken()
        
        
              if(token){
                
        
          localStorage.setItem('Apitoken', token)
                let response= await callApi(true, "typeexamen", 'post', null, type)
                if (response?.data?.success){
                    onShowTypeExam()
           let result = response.data.data
           setExamen(result)
           setShow(false)
                }
           
               }
       }



       const handleModifyExamen = async ( e:any)=>{
        e.preventDefault()
       
       let token= await getAppToken()
       let typeModify=    {
        nom : selectTypeExam.nom,
        prix : selectTypeExam.prix,
        matricule_labo : matricule_laboSession,
        matricule_fam : id
     }
  
       if(token){
        
         
  
         localStorage.setItem('Apitoken', token)
         let response= await callApi(true, `typeexamen/${selectTypeExam.matricule}`, 'put', null, typeModify)
         
  
         if (response?.data?.success){
            onShowTypeExam();
           setShow1(false)
             notification('success', response.data.message)
            // console.log(response)
             let result = response.data.data
             //console.log("zzzzzzzzzzzz", result)
             
         }else{
            // notification('error',  "une erreur inatendu est survenue" )
  
         }
       }
      }


      const handleDeleteTypeExamen = async ( e:any)=>{
        e.preventDefault()
       
       let token= await getAppToken()
       
       if(token){
        
         localStorage.setItem('Apitoken', token)
         let response= await callApi(true, `typeexamen/${selectTypeExam.matricule}`, 'delete', null)
         
  
         if (response?.data?.success){
            onShowTypeExam();
           setShow2(false)
             notification('success', response.data.message)
            // console.log(response)
             let result = response.data.data
             //console.log("zzzzzzzzzzzz", result)
             
         }else{
            // notification('error',  "une erreur inatendu est survenue" )
  
         }
       }
      }
       useEffect(()=>{
        onShowTypeExam()
        onShowExamById()
        inituserMat()
       }, [])
  return (
    <Fragment>
        {/* Créer un type d'examen */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Créer un type d'Examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleCreateTypeExam}>
                <Container>
                   <Row>
                    <Col >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nom </Form.Label>
                            <Form.Control
                                type="text"
                                id='nom'
                                value={nom}
                                onChange={(e)=>setNom(e.target.value)}
                                placeholder="type d'examen"
                                autoFocus
                            />
                    </Form.Group>
                    </Col>
                    </Row>
                    {/* <Row>
                    <Col >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Famille d'examen </Form.Label>
                            <Form.Control
                                type="text"
                                id='nom'
                                value=''
                                
                                placeholder="nom de la famille"
                                autoFocus
                            />
                    </Form.Group>
                    </Col>
                    </Row> */}
                    <Row>
                    <Col >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Prix </Form.Label>
                            <Form.Control
                                type="text"
                                id='nom'
                                value={prix}
                                onChange={(e)=>setPrix(e.target.value)}
                                placeholder="prix"
                                autoFocus
                            />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button variant="primary" type='submit'>
                        Créer
                    </Button>
                    </Col>
                </Row>
                </Container>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="danger"onClick={handleClose} >
            Annuler
          </Button> */}
          
         
        </Modal.Footer>
      </Modal>
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier un type d'Examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleModifyExamen}>
                <Container>
                   <Row>
                    <Col >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nom </Form.Label>
                            <Form.Control
                                type="text"
                                id='nom'
                                value={selectTypeExam.nom}
                                onChange={(e)=>handleChangeModify(e, "nom")}
                                placeholder="type d'examen"
                                autoFocus
                            />
                    </Form.Group>
                    </Col>
                    </Row>
                    
                    <Row>
                    <Col >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Prix </Form.Label>
                            <Form.Control
                                type="text"
                                id='nom'
                                value={selectTypeExam.prix}
                                onChange={(e)=>handleChangeModify(e, "prix")}
                                placeholder="prix"
                                autoFocus
                            />
                    </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} md={6}>
                    <Button variant="danger"onClick={handleClose1} >
                      Annuler
                   </Button>
                    </Col>
                    <Col xs={6} md={6}>
                    <Button variant="primary" type='submit'>
                    Modifier
                   </Button>
                    </Col>
                </Row>
                </Container>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Supprimer un type d'Examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           Voulez supprimer ce type <strong>{selectTypeExam.nom}</strong>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger"onClick={handleClose2} >
                      Annuler
        </Button>
        <Button variant="primary" onClick={handleDeleteTypeExamen}>
                    Supprimer
        </Button>
        </Modal.Footer>
      </Modal>
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
                            <h3 className="kt-portlet__head-title">Nom de la famille : {nomfam}  
                            </h3>
                            <button style={{ marginLeft: '20px'}} onClick={handleShow} type="button" className="btn btn-default btn-bold btn-upper btn-font-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Nouveau type 	
                            </button>
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
                           
                                {/* <div className="kt-form__actions" >
                                    <div className="row">
                                        <div className="col-lg-3 col-xl-3">
                                        <h3 className="kt-section__title kt-section__title-sm">type d'examens</h3>
                                        </div> 
                                    </div>
                               </div>  */}
                            <table className="table table-striped- table-bordered table-hover table-checkable" id="kt_table_1">
                                 <thead>
                                    <tr>
                                     <th>Code</th>
                                     <th>Nom</th>
                                     <th>Prix</th>
                                     <th>Description</th>  
                                                 
                                    </tr>
                                </thead>
                                <tbody>
                                    {examen.length > 0 && !loaderExam && <>
                                    {examen.map((item:any)=>{
                                        if(id=== item.matricule_fam){
                                            return(
                                                <tr>
                                                <td>{item.matricule}</td>
                                                <td>{item.nom}</td>
                                                <td>{item.prix}</td>
                                                    
                                              <td data-field="Actions" data-autohide-disabled="false" className="kt-datatable__cell">
                                                  <span style={{overflow: "visible", position: "relative", width: "110px"}}>
                                                      <a title="Modifier les informations" onClick={()=>handleShow1(item)} className="btn btn-sm btn-clean btn-icon btn-icon-md" >							
                                                      <i className="fas fa-pencil-alt text-success"></i></a>
                                                      <a title="Supprimer " className="btn btn-sm btn-clean btn-icon btn-icon-md"   onClick={()=>handleShow2(item)}>
                                                          <i className="la la-trash over text-danger"></i>
                                                      </a>
                                                  </span>
                                              </td>
                                            </tr>
                                            )
                                        }
                                       
                                    })}
                                    </>
                                }
                                {loaderExam && <div className="row justify-content-center">
                              <div className="col-6" style={{width: "100%"}}>
                                <Spinner animation="border" />
                              </div>
                            </div>}
    
                                </tbody>
                            </table>

                            
                        </div>
                    </div>

                </div>
             
        </div>
    </div>
    
</div>
<Link to='/familleExamen' className="btn btn-primary">Retour  </Link>
            </div>
           
        </div>
        </div> 
    </Fragment>
  )
}

export default DetailExamen