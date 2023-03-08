import React, { Fragment, useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Form, Modal,  Row, Table } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dashboard from '../layout/Dashboard';
import { getAppToken } from '../login/Utils.tsx';
import callApi from '../../Utils/Utils.tsx';
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
import Sidebar from '../layout/Sidebar.tsx';
import Navbars from '../layout/Navbar.tsx';
import Footer from '../layout/Footer.tsx';

const Services = () => {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);


  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);

  const handleShow3 = () => setShow3(true);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const [service, setService] =useState([])
  //const [matricule, setMatricule]=useState(0)

  const [matricule, setMatricule]=useState(0)
  const [nom, setNom]=useState('')
  const [telephone, setTelephone]= useState(0)
  const [email, setEmail]=useState('')
  

const [selectService, setSelectService]=useState({})
  const handleChangeNom =(e:any)=>{

    setNom(e.target.value);
  }
  
  const handleChangeTelephone =(e:any)=>{
  
    setTelephone(e.target.value);
  }
  
  const handleChangeEmail =(e:any)=>{
  
    setEmail(e.target.value);
  }
  
  

 

/**Afficher tous les services */
   const onShowService = async ()=>{
    
    let token= await getAppToken()
		  if(token){
			console.log(token)
     // let matricule= response.data.data.matricule
      localStorage.setItem('Apitoken', token)
			let response= await callApi(true, 'service', 'get', null)
        let datas= response.data.data
        setService(datas);
        
      //   console.log(datas, "azzeer")
      // response.data.data.map((id:any)=>{
      //  console.log( id.matricule, id.nom)
      // })
      //console.log(matricule)
			console.log(response)}
   }


   /***Create service */

   
  const handleCreate = async (e:any) => {
    let mat= '22-38054'
		e.preventDefault();
		let registerAgence={
      matricule_ag:mat,
          nom:nom,
          telephone: telephone,
          email: email,
          
          
}
		  let token= await getAppToken()
		  if(token){
			console.log(token)

			localStorage.setItem('Apitoken', token)
			let response= await callApi(true, 'service', 'post', null, registerAgence)
			console.log(response)

			if (response.data.success){
				notification('success', response.data.message)
				
			}else{
				notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))

			}
		  }
		 
		  console.log('user', registerAgence)

	  };

/**recuperer les informations d'une agence */
   const onShowServiceByMatricule = async (service:any)=>{
    setSelectService(service)
    setShow(true)
    
    
   }
   useEffect(()=>{
    onShowService()
   },[])

  return (
    <Fragment>          
        {/* /***  Créer un service*/ }
<Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Créer un service</Modal.Title>
        </Modal.Header>   
        <Modal.Body>
        <Form onSubmit={handleCreate}>
          
          <Container>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={nom}
                placeholder="AByster"
                onChange={handleChangeNom}
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="number"
                value={telephone}
                placeholder="+237696295892"
                onChange={handleChangeTelephone}
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="gildas@gmail.com"
                onChange={handleChangeEmail}
              />
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           {/* <Form.Label>Matricule_ag</Form.Label>
              <Form.Control
                type="text"
                id='matricule_ag'
                placeholder="22-36040"
                autoFocus
              /> */}
          </Form.Group>
          
            </Col>
            
          </Row>
          </Container>
          <Button variant="primary" type='submit' style={{marginLeft:"90%"}}>
            Créer 
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          
         
        </Modal.Footer>
        
           
      </Modal>
{/* /***Views user information */ }
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Informations du service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col">
                            <div className="row">
                                <div className="col-12 mt-5">Nom: {selectService.nom}</div>
                                <div className="col-12 mt-2">Téléphone : {selectService.telephone}</div>
                                <div className="col-12 mt-2">email : {selectService.email}</div>
                                

                            </div>
                        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Fermer
          </Button>
         
        </Modal.Footer>
      </Modal>

      
{/* /*** modifier user information */ }
<Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Modifier les Informations du service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          
        <Container>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                id='nom'
                placeholder="TestingShop"
                autoFocus
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="number"
                id='phone'
                placeholder="+237696295892"
                autoFocus
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id='email'
                placeholder="testingshop@gmail.com"
                autoFocus
              />
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Matricule_ag</Form.Label>
              <Form.Control
                type="text"
                id='matricule_ag'
                placeholder="22-36040"
                autoFocus
              />
          </Form.Group>
          
            </Col>
           
          </Row>
          </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" style={{marginLeft:"90%"}}>
            Enregistrer 
          </Button>
         
        </Modal.Footer>
      </Modal>

      {/* /***Views user information */ }
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Etes-vous sûr de vouloir desactiver ce service ?</Modal.Title>
        </Modal.Header>
       
        <Modal.Footer>
          <Button variant="danger" >
            Oui
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Non
          </Button>
         
        </Modal.Footer>
      </Modal>
<Navbars/>
<Sidebar/>
<div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
  <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
        
  <div className="kt-subheader   kt-grid__item" id="kt_subheader">
    <div className="kt-container  kt-container--fluid ">
        <div className="kt-subheader__main">
            
                            <h3 className="kt-subheader__title">
                                            Liste des Services                               
                </h3>
                       

            <span className="kt-subheader__separator kt-subheader__separator--v"></span>
            
            <div className="kt-subheader__toolbar" id="kt_subheader_search">
                <span className="kt-subheader__desc" id="kt_subheader_total">
                                            450 Total                                    </span>
                
                                    <form className="kt-subheader__search" id="kt_subheader_search_form">
                        <div className="input-group">
							<input type="text" className="form-control" placeholder="Search..." id="generalSearch"/>
							<div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">
                                    <i className="flaticon2-search-1"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                            </div>

                           
                    </div>        
        
        <div className="kt-subheader__toolbar">
           <a onClick={handleShow3} className="btn btn-brand btn-bold" style={{color: "white"}}>
                        Créer un Service</a>
                                        
                            
                    </div>
    </div>
</div>
        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
		
<div className="row">
{service.map((service:any)=>{
    return <div className="col-xl-4 col-lg-6">
        
        <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-widget kt-widget--general-2">
                <div className="kt-portlet__body kt-portlet__body--fit">
                    <div className="kt-widget__top">
                        
                        <div className="kt-widget__wrapper">
                            <div className="kt-widget__label">
                                <a href="#" className="kt-widget__title">
                                    Matricule
                                </a>
                                <span className="kt-widget__desc">
                                {service.matricule}
                                </span>
                            </div>  
                            <div className="kt-widget__label">
                                <a href="#" className="kt-widget__title">
                               Nom
                                </a>
                                <span className="kt-widget__desc">
                                {service.nom}
                                </span>
                            </div>     
                            <div className="kt-widget__toolbar">
                                <a  className="btn btn-icon btn-circle btn-label-facebook"  onClick={()=>onShowServiceByMatricule(service)}>
                                <i className="far fa-eye "></i>
                                </a>
                                <a  className="btn btn-icon btn-circle btn-label-twitter" onClick={handleShow1}>
                                <i className="fas fa-pencil-alt "></i>
                                </a>
                                <a  className="btn btn-icon btn-circle btn-label-linkedin" onClick={handleShow2}>
                                <i  className="fa fa-trash over text-danger" ></i>
                                </a>  
                            </div>   
                        </div>
                    </div>
                    <div className="kt-widget__bottom">
                        <div className="kt-widget__progress">
                            <div className="kt-widget__stat">
                                <span className="kt-widget__caption">Contact</span>
                                <span className="kt-widget__value">{service.telephone}</span>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
      })}
   
    
    </div>
    </div>
    </div>
    </div>         
    </Fragment>
  )
}

export default Services;