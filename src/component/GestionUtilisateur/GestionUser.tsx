import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import Dashboard from "../layout/Dashboard";
import * as yup from "yup";
import { getAppToken } from "../login/Utils.tsx";
import callApi from "../../Utils/Utils.tsx";
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
import Navbar from "../layout/Navbar.tsx";
import Sidebar from "../layout/Sidebar.tsx";
//import Assets from '../layout/Assets';

const handleSubmit = (values) => {
  console.log(values);
};
const GestionUser = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [agence, setAgence] = useState([]);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);

  const handleShow3 = () => setShow3(true);
  const handleShow = () => setShow(true);

  const [employe, setEmploye] = useState([]);
  const [initialEmploye, setInitialEmploye] = useState([]);

  const [matricule, setMatricule] = useState(0);
  const [titre, setTitre] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [fonction, setFonction] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [matricule_laboSession, setMatricule_laboSession] = useState("");
  const [matricule_serv, setMatricule_serv] = useState("");
  const [matricule_ag, setMatricule_ag] = useState("");
  const [list, setList] = useState([]);
  const [matlabuser, setMatlabuser] = useState("");
  const [selectEmploye, setSelectEmploye] = useState({});
  const [userNumber, setUserNumber] = useState();
  const [sericeAgenceMat, setSericeAgenceMat] = useState();
  const [loadingGetUsers, setLoadingGetUsers] = useState(false);

  const handleShow2 = (data: any) => {
    console.log(data);
    setSelectEmploye(data);
    setShow2(true);
  };

  const handleChangeNom = (e: any) => {
    setNom(e.target.value);
  };
  const handleChangePrenom = (e: any) => {
    setPrenom(e.target.value);
  };

  const handleChangeTelephone = (e: any) => {
    setTelephone(e.target.value);
  };
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangeFonction = (e: any) => {
    setFonction(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleShow1 = (employe: any) => {
    setSelectEmploye(employe);
    
    console.log(selectEmploye);

    setShow1(true);
  };
  const handleChangeCpassword = (e: any) => {
    setCpassword(e.target.value);
  };
  

  const handleChangeMatricule_serv = (e: any) => {
    setMatricule_serv(e.target.value);
  };

  const handleChangeMatricule_ag = (e: any) => {
    setMatricule_ag(e.target.value);
  };

  const handleChangeModify = (e: any, key: string) => {
    setSelectEmploye((state) => {
      return { ...state, [key]: e.target.value };
    });

    console.log("state modify ", selectEmploye);
  };

  /**declarations pour la modif des users debut */
  /**declarations pour la modif des users fin */

  /**** recuperer le matricule du labo*/
  let sessionMatagence: any;
  const inituserLab = () => {
    let users: any = localStorage.getItem("user");
    let user: any = JSON.parse(users);
    setMatricule_laboSession(user.matricule_labo);
    sessionMatagence = user.matricule_ag;
    console.log("azeerrt", matricule_laboSession);
  };
  /**Afficher tous les services */

  const onShowEmploye = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);
      localStorage.setItem("Apitoken", token);

      setLoadingGetUsers(true);
      let response = await callApi(true, "employe", "get", null);
      setLoadingGetUsers(false);
      let datas = response.data.data;
      setInitialEmploye(datas);
      setEmploye(datas);
      // if( matlabuser=== matricule_laboSession ){
      //   console.log('taille', datas.length)
      // }
      datas.map((item: any) => {
        setMatlabuser(item.matricle);
      });

      //console.log('matlabuser', matlabuser);
      console.log("employe", response);
    }
  };
  /**afficher la liste des agences  if(matricule_labo){ */
  const onShowAgence = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);
      localStorage.setItem("Apitoken", token);

      let response = await callApi(true, "agence", "get", null);
      let datas = response.data.data;
      setAgence(datas);
      datas.map((item: any) => {
        setMatricule_ag(item.matricule);
        console.log(item);
      });
      //	console.log(response)
    }
  };

  /***Create user */

  const handleCreate = async (e: any) => {
    
    e.preventDefault();
    let registerEmploye = {
      matricule_ag: matricule_ag,
      nom: nom,
      prenom: prenom,
      telephone: telephone,
      email: email,
      fonction: fonction,
      password: password,
      cpassword: cpassword,
      matricule_labo: matricule_laboSession,
      matricule_serv: matricule_serv,
    };
    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      let response = await callApi(
        true,
        "employe",
        "post",
        null,
        registerEmploye
      );
      console.log(response);

      if (response?.data?.success) {
        notification("success", response.data.message);
        onShowEmploye();
        setShow3(false);
      } else {
        
        notification("error",  formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data));
      }
    }

    console.log("user", registerEmploye);
  };
  const handleModify = async (e: any) => {
    let mat = "22-56907";
    e.preventDefault();

    let dataToUpodate = selectEmploye;

    dataToUpodate.matricule_labo = matricule_laboSession;
    delete dataToUpodate.password;
    delete dataToUpodate.email;
    delete dataToUpodate.telephone;
    delete dataToUpodate.fonction;

    // let modifyEmploye = {
    //   matricule_ag: matricule_ag,
    //   nom: nom,
    //   prenom: prenom,
    //   telephone: telephone,
    //   email: email,
    //   fonction: fonction,
    //   password: password,
    //   cpassword: cpassword,
    //   matricule_labo: matricule_laboSession,
    //   matricule_serv: matricule_serv,
    // };
    console.log("employe", dataToUpodate);
    let token = await getAppToken();
    if (token) {
      //console.log(token)

      localStorage.setItem("Apitoken", token);
      let user: any = JSON.parse(localStorage.getItem("user") || "");
      let response = await callApi(
        true,
        `employe/${selectEmploye.matricule}`,
        "put",
        null,
        dataToUpodate
      );
      // console.log(response)

      if (response?.data?.success) {
        onShowEmploye();

        setShow1(false);
        notification("success", response.data.message);
      } else {
        let message = formatData(response.data.data);
        notification("error", message);
      }
    }
  };
  /**recuperer les informations d'une agence */
  const onShowEmployeByMatricule = async (employe: any) => {
    setSelectEmploye(employe);
    setShow(true);
    console.log("tssss", selectEmploye);
    // employe.map((item:any)=>{
    //   setMatlabuser(item.matricule_labo)
    //   setEmail(item.email)
    //   setFonction(item.fonction)
    //   setPrenom(item.prenom)
    //   setNom(item.nom)
    //   setTelephone(item.telephone)

    //   console.log('first', matlabuser)

    // })
  };

  const handleShowService = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "service", "get", null);
      if (response.data.success) {
        console.log(response.data.data);
        let listes = response.data.data;
        setList(listes);
        setList(listes);
        listes.map((key: any) => {
          setMatricule_serv(key.matricule);
          setSericeAgenceMat(key.matricule_ag);
        });
        console.log("list", listes);
      } else {
        notification(
          "error",
          formatData(response.data.data) === ""
            ? response.data.message
            : formatData(response.data.data)
        );
      }
    }
  };

  const handleSearch = (e) => {
    console.log("key ", e.target.value);
    let key = e.target.value;
    setEmploye((state) => {
      return initialEmploye.filter(
        (employe) =>
          employe?.email?.includes(key) ||
          employe?.telephone?.includes(key) ||
          employe?.nom?.toLowerCase()?.includes(key) ||
          employe?.matricule?.includes(key)
      );
    });
  };

  const handleDelete = async () => {
    let response = await callApi(
      true,
      `employe/${selectEmploye.matricule}`,
      "delete",
      null
    );

    if (response.data.success) {
      onShowEmploye();
      setShow2(false);
      notification("success", "Opération réussi");
    } else notification("error", formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data));
  };
  useEffect(() => {
    onShowEmploye();
    handleShowService();
    onShowAgence();
    inituserLab();
  }, []);

  return (
    <Fragment>
      {/* /***  Créer un utilisateur*/}
      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Créer un utilisateur</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom</Form.Label>
                    <input
                      type="text"
                      id="nom"
                      value={nom}
                      name="nom"
                      className="form-control"
                      onChange={handleChangeNom}
                    />
                    {/* <ErrorMessage
                                        name="nom"
                                        component="small"
                                        className="text-danger"
                                    /> */}
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Prénom</Form.Label>
                    <input
                      type="text"
                      id="prenom"
                      value={prenom}
                      name="prenom"
                      className="form-control"
                      onChange={handleChangePrenom}
                    />
                    {/* <ErrorMessage
                                        name="prenom"
                                        component="small"
                                        className="text-danger"
                                    /> */}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      name="email"
                      className="form-control"
                      onChange={handleChangeEmail}
                    />
                    {/* <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="text-danger"
                                    /> */}
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Téléphone</Form.Label>
                    <input
                      type="number"
                      id="phone"
                      value={telephone}
                      name="phone"
                      className="form-control"
                      onChange={handleChangeTelephone}
                    /> 
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Fonction</Form.Label>
                    <input
                      type="text"
                      id="fonction"
                      value={fonction}
                      name="fonction"
                      className="form-control"
                      onChange={handleChangeFonction}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Agence</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e) => setMatricule_ag(e.target.value)}
                    >
                       <option value={matricule_ag}>Selectionner une agence</option>
                      {list.length > 0 && (
                        <>
                          {agence.map((items: any) => {
                            if(items.matricule_labo=== matricule_laboSession){
                              return (
                                <option
                                  value={items.matricule}
                                  key={items.matricule}
                                >
                                  {items.nom}
                                </option>
                              );
                            }
                            
                          })}
                        </>
                      )}
                    </select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Service</Form.Label>
                    <select
                      className="form-control"
                      value={selectEmploye.service}
                      onChange={handleChangeMatricule_serv}
                    >
                      <option value={matricule_serv}>Selectionner un service</option>
                      {list.length > 0 && (
                        <>
                          {list.map((item: any) => {
                             if(item.matricule_labo
                              === matricule_laboSession ){
                              return (
                                <option value={item.matricule} key={item.matricule}>{item.nom}</option>
                              );
                             }
                           
                          })}
                        </>
                      )}
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Mot de passe</Form.Label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      name="password"
                      className="form-control"
                      onChange={handleChangePassword}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={cpassword}
                      name="confirmPassword"
                      className="form-control"
                      onChange={handleChangeCpassword}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Row  style={{justifyContent: "space-between"}}>
            <Col>
              
              <Button variant="danger" onClick={handleClose3} >Annuler</Button>
            </Col>
            <Col>
             
            <Button
              variant="primary"
              type="submit"
              style={{marginLeft: "280px"}}
            >
              Créer
            </Button>
            </Col>
            </Row>
            
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* /***Views user information */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Informations sur un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            <div className="row">
              <div className="col-12 mt-5">Nom: {selectEmploye.nom}</div>
              <div className="col-12 mt-2">Prénom : {selectEmploye.prenom}</div>
              <div className="col-12 mt-2">
                Téléphone : {selectEmploye.telephone}
              </div>
              <div className="col-12 mt-2">Email : {selectEmploye.email}</div>
              <div className="col-12 mt-2">
                fonction : {selectEmploye.fonction}
              </div>
              {/* <div className="col-12 mt-2">
                Service : {selectEmploye.service}
              </div>
              <div className="col-12 mt-2">Agence : {selectEmploye.agence}</div> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{ marginLeft: "90%" }}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* /*** modifier user information */}
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Modifier les Informations d'un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleModify}>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectEmploye.nom}
                      onChange={(e) => handleChangeModify(e, "nom")}
                      placeholder="therese"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectEmploye.prenom}
                      placeholder="murielle"
                      onChange={(e) => handleChangeModify(e, "prenom")}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      disabled={true}
                      value={selectEmploye.email}
                      // onChange={(e) => handleChangeModify(e, "email")}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      type="number"
                      disabled={true}
                      value={selectEmploye.telephone}
                      // onChange={(e) => handleChangeModify(e, "telephone")}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Fonction</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={true}
                      value={selectEmploye.fonction}
                      // onChange={(e) => handleChangeModify(e, "fonction")}
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
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Service</Form.Label>

                    <select
                      className="form-control"
                      // value={selectEmploye.matricule_serv}
                      onChange={(e) => handleChangeModify(e, "matricule_serv")}
                    >
                       <option value={matricule_serv}></option>
                      {list.length > 0 && (
                        <>
                          {list.map((item: any) => {
                             if(item.matricule_labo=== matricule_laboSession){
                              return (
                                <option
                                  value={item.matricule}
                                  selected={
                                    item.matricule ===
                                    selectEmploye.matricule_serv
                                  }
                                >
                                  {item.nom}
                                </option>
                              );
                             }
                            
                          })}
                        </>
                      )}
                    </select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Agence</Form.Label>
                    <select
                      className="form-control"
                      // value={selectEmploye.matricule_ag}
                      onChange={(e) => handleChangeModify(e, "matricule_ag")}
                    >
                       <option value={matricule_ag}></option>
                      {list.length > 0 && (
                        <>
                          {agence.map((items: any) => {
                            if(items.matricule_labo=== matricule_laboSession){
                              return (
                                <option
                                  value={items.matricule}
                                  selected={
                                    items.matricule === selectEmploye.matricule_ag
                                  }
                                >
                                  {items.nom}
                                </option>
                              );
                            }
                            
                          })}
                        </>
                      )}
                    </select>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Row>
            <Col xs={6} md={4} >
              
              <Button variant="danger" onClick={handleClose1} >Annuler</Button>
            </Col>
            <Col xs={6} md={4} style={{justifyContent: "space-between"}}>
              <span></span>
            <Button
              variant="primary"
              type="submit"
              style={{marginLeft: "400px"}}
            >
              Enregistrer
            </Button>
            </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* /***Views user information */}
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectEmploye.etat === 1 ? (
              <p> Etes-vous sûr de vouloir desactiver ce Compte ?</p>
            ) : (
              <p> Etes-vous sûr de vouloir activer ce Compte ?</p>
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Oui
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Non
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar />
      <Sidebar />

      <div
        className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
        id="kt_wrapper"
      >
        <div
          className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
          id="kt_content"
        >
          <div
            className="kt-subheader  kt-header  kt-grid__item "
            id="kt_subheader"
          >
            <div className="kt-container  kt-container--fluid ">
              <div className="kt-subheader__main">
                <h3 className="kt-subheader__title">Liste des Utilisateurs</h3>

                <span className="kt-subheader__separator kt-subheader__separator--v"></span>

                <div className="kt-subheader__toolbar" id="kt_subheader_search">
                  {/* <span className="kt-subheader__desc" id="kt_subheader_total">
                                            {employe.length} Total </span> */}

                  <form
                    className="kt-subheader__search "
                    id="kt_subheader_search_form"
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher le nom d'un employé  ..."
                        id="generalSearch"
                        onChange={handleSearch}
                      />
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
                <a
                  onClick={handleShow3}
                  className="btn btn-brand btn-bold"
                  style={{ color: "white" }}
                >
                  Créer un utilisateur
                </a>
              </div>
            </div>
          </div>
          <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="row">
              {employe.map((employe: any) => {
                if (employe.matricule_labo === matricule_laboSession) {
                  return (
                    <div className="col-xl-4 col-lg-6">
                      <div className="kt-portlet kt-portlet--height-fluid">
                        <div className="kt-widget kt-widget--general-2">
                          <div className="kt-portlet__body kt-portlet__body--fit">
                            <div className="kt-widget__top">
                              <div className="kt-widget__wrapper">
                                <div className="kt-widget__label">
                                  <a href="#" className="kt-widget__title">
                                    Nom
                                  </a>

                                  <span className="kt-widget__desc">
                                    {employe.nom}
                                  </span>
                                </div>
                                <div className="kt-widget__label">
                                  <a href="#" className="kt-widget__title">
                                    Fonction
                                  </a>
                                  <span className="kt-widget__desc">
                                    {employe.fonction}
                                    {/* <br/>
                                    {employe.matricule_labo} */}
                                  </span>
                                </div>

                                <div className="kt-widget__toolbar">
                                  <a
                                    className="btn btn-icon btn-circle btn-label-facebook"
                                    onClick={() =>
                                      onShowEmployeByMatricule(employe)
                                    }
                                  >
                                    <i title="voir les informations de l'employé" className="far fa-eye "></i>
                                  </a>
                                  <a
                                    className="btn btn-icon btn-circle btn-label-twitter"
                                    onClick={() => handleShow1(employe)}
                                  >
                                    <i title="modifier les informations de l'employé" className="fas fa-pencil-alt "></i>
                                  </a>
                                  <a
                                    className="btn btn-icon btn-circle btn-label-linkedin"
                                    onClick={() => handleShow2(employe)}
                                  >
                                    {employe.etat === 1 ? (
                                      <i title="Desactiver un employé" className="fa fa-eye-slash over text-primary"></i>
                                    ) : (
                                      <i title="Activer un employé" className="fa fa-eye-slash over text-danger"></i>
                                    )}
                                  </a>
                                </div>
                              </div>
                            </div>
                            {/* <div className="kt-widget__bottom">
                            <div className="kt-widget__progrress">
                                <div className="kt-widget__stat">
                                    <span className="kt-widget__caption">Fonction</span>
                                    <span className="kt-widget__value">Receptionniste</span>
                                </div>
                                
                            </div>
                            
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            {loadingGetUsers && (
              <div className="row justify-content-center">
                <div className="col-6 mt-5">
                  <Spinner animation="border" />;
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GestionUser;
