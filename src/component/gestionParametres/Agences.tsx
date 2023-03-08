import React, { Fragment, useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Form, Modal,  Row, Table } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAppToken } from '../login/Utils.tsx';
import callApi from '../../Utils/Utils.tsx';
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
import Sidebar from '../layout/Sidebar.tsx';
import Navbars from '../layout/Navbar.tsx';
import Footer from '../layout/Footer.tsx';
import { Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//import Assets from '../layout/Assets';

const validationSchema = Yup.object().shape({
      nom: Yup.string()
      .required("Ce champ est obligatoire"),
      phone: Yup.string()
      .required("l'email est obligatoire"),
      email: Yup.string()
      .required("l'email' est obligatoire"),
      pays: Yup.string()
      .required("le pays est obligatoire"),
      ville: Yup.string()
      .required("ce champ est obligatoire"),
      region: Yup.string()
      .required("le nom de la personne à contacter en cas d'urgence est obligatoire"),
      
  });
  
  const initialValues = {
    nom: "",
    phone: "",
    email: "",
    pays: "",
    ville: "",
    region:"",
  };
  
  const handleSubmit = (values) => {
    console.log(values);
  };
  const pays1 =["République démocratique du Congo", "Cameroun", "France", "São Tomé-et-Principe", "Sénégal"]

const Agences = () => {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);


  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);

  const handleShow3 = () => setShow3(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const [agence, setAgence] =useState([])
  const [matricule, setMatricule]=useState(0)
  const [nom, setNom]=useState('')
  const [telephone, setTelephone]= useState(0)
  const [email, setEmail]=useState('')
  const [pays, setPays]=useState('')
  const [ville, setVille]=useState('')
  const [region, setRegion]=useState('')
  const [rue, setRue]=useState('')
  const [matricule_laboSession, setMatricule_laboSession]=useState('')
  const [matlabuser, setMatlabuser]=useState('')
  const [selected2, setSelected2] = useState(pays1[0]);

  const router = useNavigate()
const [selectAgence, setSelectAgence]=useState({})
  const handleChangeNom =(e:any)=>{

    setNom(e.target.value);
  }
  
  const handleChangeTelephone =(e:any)=>{
  
    setTelephone(e.target.value);
  }
  
  const handleChangeEmail =(e:any)=>{
  
    setEmail(e.target.value);
  }
  
  const handleChangePays=(e:any)=>{
  
    setPays(e.target.value);
  }
  
  const handleChangeVille =(e:any)=>{
  
    setVille(e.target.value);
  }
  const handleChangeRegion =(e:any)=>{
  
    setRegion(e.target.value);
  }
  const handleChangeRue=(e:any)=>{
  
    setRue(e.target.value);
  }

 

/**Afficher toutes les agence */
   const onShowAgence = async ()=>{
    
    let token= await getAppToken()
		  if(token){
			console.log(token)
     // let matricule= response.data.data.matricule
      localStorage.setItem('Apitoken', token)
			let response= await callApi(true, 'agence', 'get', null)
        let datas= response.data.data
        setAgence(datas);
        
      //   console.log(datas, "azzeer")
       
      //console.log(matricule)
			console.log(response)}
   }

  const handleShow = () => {
    setMatricule(matricule)
    setShow(true);

  }
    /****Create agence */
    const inituserLab=()=>{
      let users: any = localStorage.getItem("user")
      let user:any = JSON.parse(users)
      setMatricule_laboSession(user.matricule_labo)
    }
  const handleCreate = async (e:any) => {
   
		e.preventDefault();
		let registerAgence={
          matricule_labo:matricule_laboSession,
          nom:nom,
          telephone: telephone,
          email: email,
          pays: selected2,
          ville: ville,
          region: region,
          rue : rue,
          
}
		  let token= await getAppToken()
		  if(token){
			console.log(token)

			localStorage.setItem('Apitoken', token)
			let response= await callApi(true, 'agence', 'post', null, registerAgence)
			console.log(response)

			if (response.data.success){
				notification('success', response.data.message)
        onShowAgence()
				setShow3(false)
			}else{
				notification('error', "vous ne pouvez pas supprimer cette agence car elle contient des données")

			}
		  }
		 
		  console.log('user', registerAgence)

	  };

/**recuperer les informations d'une agence */
   const onShowAgenceByMatricule = async (agence:any)=>{
    setSelectAgence(agence)
    setShow(true)
    
    
   }

  //  const showService = ()=>{
  //   router('/agences')
  //  }

   useEffect(()=>{
    onShowAgence()
    inituserLab()
    
    
   },[])
  return (
    
    <Fragment>          
        {/* /***  Créer une agence*/ }
<Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Créer une agence</Modal.Title>
        </Modal.Header>
       
        <>        
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
                placeholder="abyster@gmail.com"
                onChange={handleChangeEmail}
              />
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Pays</Form.Label>
           <select className="form-control"  value={selected2} 
                                    onChange={e => setSelected2(e.target.value)}> 
                                    {pays1.map((value) => ( 
                                        <option value={value} key={value}> 
                                    {value} 
                                  </option> 
                                  ))} 
                              </select>
          </Form.Group>
          
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Ville</Form.Label>
              <Form.Control
                type="text"
                
                value={ville}
                placeholder="Kinshasa"
                onChange={handleChangeVille}
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                
                value={region}
                placeholder="centre"
                onChange={handleChangeRegion}
              />
          </Form.Group>
          
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Rue</Form.Label>
              <Form.Control
                type="text"
                
                value={rue}
                placeholder="centre"
                onChange={handleChangeRue}
              />
          </Form.Group>
            </Col>
          </Row>
          </Container>
          <Row style={{justifyContent: "space-between"}}>
            <Col>
            <Button variant="danger" onClick={handleClose3} >
            Annuler 
          </Button>
            </Col>
            <Col>
            <Button variant="primary" type= "submit" style={{marginLeft:"80%"}}>
            Créer 
          </Button>
            </Col>
          </Row>
          
        </Form>
        </Modal.Body>
        <Modal.Footer>
          
         
        </Modal.Footer>
        </>
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
          <Modal.Title>Informations de l'Agence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col">
                            <div className="row">
                                <div className="col-12 mt-5">Nom: {selectAgence.nom}</div>
                                <div className="col-12 mt-2">Téléphone : {selectAgence.telephone}</div>
                                <div className="col-12 mt-2">email : {selectAgence.email}</div>
                                <div className="col-12 mt-2">Pays : {selectAgence.pays}</div>
                                <div className="col-12 mt-2">Ville : {selectAgence.ville}</div>
                                <div className="col-12 mt-2"> Region : {selectAgence.region}</div>
                                <div className="col-12 mt-2"> Rue : {selectAgence.rue}</div>

                            </div>
                        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{marginLeft:"90%"}}>
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
          <Modal.Title> Modifier les Informations de l'Agence</Modal.Title>
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
           <Form.Label>Pays</Form.Label>
              <Form.Control
                type="text"
                id='pays'
                placeholder="Republique democratique du Congo"
                autoFocus
              />
          </Form.Group>
          
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Ville</Form.Label>
              <Form.Control
                type="text"
                id='ville'
                placeholder="Kinshasa"
                autoFocus
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                id='region'
                placeholder="centre"
                autoFocus
              />
          </Form.Group>
            </Col>
            
          </Row>
          </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" style={{marginLeft:"90%"}} >
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
          <Modal.Title>Etes-vous sûr de vouloir desactiver cette agence ?</Modal.Title>
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
            
                            {/* <h3 className="kt-subheader__title">
                                            Liste des Agences                               
                </h3> */}
                       

            <span className="kt-subheader__separator kt-subheader__separator--v"></span>
            
            <div className="kt-subheader__toolbar" id="kt_subheader_search">
                {/* <span className="kt-subheader__desc" id="kt_subheader_total">
                                            450 Total                                    </span>
                 */}
                                    {/* <form className="kt-subheader__search" id="kt_subheader_search_form">
                        <div className="input-group">
							<input type="text" className="form-control" placeholder="Search..." id="generalSearch"/>
							<div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">
                                    <i className="flaticon2-search-1"></i>
                                </span>
                            </div>
                        </div>
                    </form> */}
                            </div>

                           
                    </div>        
        
        <div className="kt-subheader__toolbar">
           <a onClick={handleShow3} className="btn btn-brand btn-bold" style={{color: "white"}}>
                        Créer une Agence</a>
                                        
                            
                    </div>
    </div>
</div>


        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
		
<div className="row">
{agence.map((agence:any)=>{
  if( agence.matricule_labo=== matricule_laboSession ){
    return <div className="col-xl-4 col-lg-6">
        
    <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-widget kt-widget--general-2">
            <div className="kt-portlet__body kt-portlet__body--fit">
                <div className="kt-widget__top">
                    
                    <div className="kt-widget__wrapper">
                        <div className="kt-widget__label">
                            <a href="#" className="kt-widget__title">
                            {agence.matricule}
                            </a>
                        </div>  
                        <div className="kt-widget__label">
                            <a href="#" className="kt-widget__title">
                            {agence.nom}
                            </a>
                        </div>     
                        <div className="kt-widget__toolbar">
                            <Link  className="btn btn-icon btn-circle btn-label-facebook" to={'/agences/'+agence.matricule} >
                            <i className="far fa-eye "></i>
                            </Link>
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
                            <span className="kt-widget__value">{agence.telephone}</span>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
</div>
  }
      
      })}
    
    
    
    
    </div>
    </div>
    </div>
    </div>         
    </Fragment>
  )
}

export default Agences;