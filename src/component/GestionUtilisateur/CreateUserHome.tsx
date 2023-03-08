import React, { Fragment, useState } from 'react'
import {  Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import {Formik, ErrorMessage, Field} from 'formik';
import * as yup from "yup";
//import Assets from '../layout/Assets';

interface ValueForm{
  
  name: string;
  label: string;
  type: "email" | "text" | "number"|"date";
  required?: boolean;
  
}
const handleSubmit = (values) => {
  console.log(values)
};
const CreateUserHome = () => {

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
  return (
    <Fragment>          
        {/* /***  Créer le personnel du service d'accueil*/ }
<Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Créer un personnel du service d'accueil</Modal.Title>
        </Modal.Header>
        <Formik
             initialValues={{
                name: "",
                prenom:"",
                phone:"",
                email:"",
                service:"",
                fonction:"",
                Agence:"",
                password: "",
                passwordConfirm: "",

                      }}
                      validationSchema={yup.object().shape({
                        password: yup.string().required(  'Mot de passe obligatoire').matches(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/i,' Le mot de passe doit contenir  huit caractères soit au moins un caractere majuscule, au moins un chiffre, un symbole et des minuscules.'  ),
                        confirmPassword: yup.string()
                        .required("Confirmation de mot de passe est obligatoire")
                        .oneOf(
                            [yup.ref("password"), null],
                            "Le mot de passe de confirmation ne correspond pas"
                        ),
                        email: yup
                          .string()
                          .required("l'email est requis")
                          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"veuillez fournir un email valide" ),
                        phone: yup
                          .string()
                          .matches(
                            /^(80|84|85|89|97|98|99|81|82|83)+[0-9]{7}$/,
                            "votre numeros est invalide"
                          ),

                        nom: yup.string().required("votre nom est requis").matches(/^([a-zA-Z ]+)$/),
                        prenom: yup.string().required("votre prenom est requis").matches(/^([a-zA-Z ]+)$/, 'votre nom ne doit pas contenir de chiffre.'),
                        service: yup.string().required("votre service est requis").matches(/^([a-zA-Z ]+)$/, 'votre nom ne doit pas contenir de chiffre.'),
                        Agence: yup.string().required("votre agence est requis").matches(/^([a-zA-Z ]+)$/, ),
                        function: yup.string().required("votre function est requis").matches(/^([a-zA-Z ]+)$/, 'votre nom ne doit pas contenir de chiffre.'),
                        
                      })}
                      onSubmit={(values) =>handleSubmit(values)}
                    > {({
                      resetForm 
                      
                    }) => (
                   <>
                      <Modal.Body>
                      <Form>
          
                      <Container>
                      <Row>
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Nom</Form.Label>
                                <Field
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="nom"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Prénom</Form.Label>
                                    <Field
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="prenom"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Email address</Form.Label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                      
                        </Col>
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Téléphone</Form.Label>
                                    <Field
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="phone"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                        
                      </Row>
                      {/* <hr></hr>
                      <Row>
                        <p style={{textAlign:"center", fontSize:'20px', marginTop:"5px"}}>Personne à contacter en cas d'urgence</p>
                      </Row> */}
                      <Row >
                      <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Fonction</Form.Label>
                       <Field
                                        type="text"
                                        id="fonction"
                                        name="fonction"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="fonction"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Service</Form.Label>
                                      <Field
                                        type="text"
                                        id="service"
                                        name="service"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="service"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Agence</Form.Label>
                       <Field
                                        type="text"
                                        id="agence"
                                        name="agence"
                                        className="form-control"
                                    />
                                  <ErrorMessage
                                        name="agence"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                      </Row>
                      <Row >
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Mot de passe</Form.Label>
                       <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="password"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Confirmer le mot de passe</Form.Label>
                       <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                    />
                          <ErrorMessage
                                        name="confirmPassword"
                                        component="small"
                                        className="text-danger"
                                    />
                      </Form.Group>
                        </Col>
                      </Row>
            
                      </Container>
                        {/* <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Example textarea</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                        </Form.Group> */}
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" style={{marginLeft:"90%"}}>
                        Créer 
                      </Button>
                     
                    </Modal.Footer>
                    </>  
                    )}
                            
                    </Formik>
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
          <Modal.Title>Informations sur un personnel du service d'accueil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col">
                            <div className="row">
                                <div className="col-12 mt-5">Nom: zerrt</div>
                                <div className="col-12 mt-2">Prénom : laurine</div>
                                <div className="col-12 mt-2">Téléphone : laurine</div>
                                <div className="col-12 mt-2">Email : laurine@th.cm</div>
                                <div className="col-12 mt-2">fonction : Laboratin</div>
                                <div className="col-12 mt-2">Service : Laboratoire</div>
                                <div className="col-12 mt-2">Agence : mokolo</div>

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
          <Modal.Title> Modifier les Informations d'un personnel du service d'accueil</Modal.Title>
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
                placeholder="therese"
                autoFocus
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="murielle"
                autoFocus
              />
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
          </Form.Group>
          
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="number"
                placeholder="334456778"
                autoFocus
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Fonction</Form.Label>
              <Form.Control
                type="text"
                placeholder="laboratin"
                autoFocus
              />
          </Form.Group>
            </Col>
          </Row>
          {/* <hr></hr>
          <Row>
            <p style={{textAlign:"center", fontSize:'20px', marginTop:"5px"}}>Personne à contacter en cas d'urgence</p>
          </Row> */}
          <Row >
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                placeholder="laboratoire"
                autoFocus
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Agence</Form.Label>
              <Form.Control
                type="text"
                placeholder="agence"
                autoFocus
              />
          </Form.Group>
            </Col>
          </Row>

          </Container>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
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
          <Modal.Title>Etes-vous sûr de vouloir desactiver ce Compte ?</Modal.Title>
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

				<div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
											
<div className="kt-subheader   kt-grid__item" id="kt_subheader">
    <div className="kt-container  kt-container--fluid ">
        <div className="kt-subheader__main">
            
                            <h3 className="kt-subheader__title">
                                            Gestions  du service d'accueil                          
                </h3>
                       

            <span className="kt-subheader__separator kt-subheader__separator--v"></span>
            
            <div className="kt-subheader__toolbar" id="kt_subheader_search">
               
                                    <form className="kt-subheader__search" id="kt_subheader_search_form">
                        <div className="input-group">
							<input type="text" className="form-control" placeholder="Rechercher d'un utilisateur..." id="generalSearch"/>
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
                          
                                                <button onClick={handleShow3} className="btn btn-primary">
                        
                        Ajouter un utilisateur                    </button>
                            
                    </div>
    </div>
</div>

	
    <div className="kt-portlet kt-widget kt-widget--general-3">
            <div className="kt-portlet__body kt-portlet__body--fit">
                <div className="kt-widget__top">
                    <div className="kt-media kt-media--lg">
                    <span className="kt-widget__desc">
                                #
                            </span>
                            
                    </div>  
                    <div className="kt-widget__wrapper">
                        <div className="kt-widget__label">
                            <a href="#" className="kt-widget__title">
                                Nom & Prénom
                            </a>
                            <span className="kt-widget__desc">
                                Account Manager
                            </span>
                        </div>
                        
                        <div className="kt-widget__label">
                            <a href="#" className="kt-widget__title">
                                Téléphone
                            </a>
                            <span className="kt-widget__desc">
                                3333333
                            </span>
                        </div>
                        
                        <div className="kt-widget__label">
                            <a href="#" className="kt-widget__title">
                               Fonction
                            </a>
                            <span className="kt-widget__desc">
                                 Receptionniste
                            </span>
                        </div>
                        <div className="kt-widget__label">
                            <a href="#" className="kt-widget__title" >
                                Action
                            </a>
                            <div className="kt-widget__stats">
                            <div className="kt-widget__stat" style={{cursor:"pointer"}}>
                            <i className="far fa-eye text-primary" onClick={handleShow} ></i>
                            </div>
                            <div className="kt-widget__stat" style={{cursor:"pointer"}}>
                            <i className="fas fa-pencil-alt text-primary" onClick={handleShow1} ></i>
                            </div>
                            <div className="kt-widget__stat" style={{cursor:"pointer"}} onClick={handleShow2}>
                            <i  className="fa fa-trash text-danger over" ></i>
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

export default CreateUserHome;