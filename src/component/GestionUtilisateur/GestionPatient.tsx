import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { getAppToken } from "../login/Utils.tsx";
import callApi from "../../Utils/Utils.tsx";
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
import ReactPaginate from "react-paginate";
import Sidebar from "../layout/Sidebar.tsx";
import Navbars from "../layout/Navbar.tsx";
import Footer from "../layout/Footer.tsx";
import "./pagination.css";
import { Link } from "react-router-dom";

import PaginationBasic from "../Tools/PaginationBasic.tsx";

//import Assets from '../layout/Assets';

const options = ["Feminin", "Masculin"];

const pays = [
  "République démocratique du Congo",
  "Cameroun",
  "France",
  "São Tomé-et-Principe",
  "Sénégal",
];

const GestionPatient = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [patient, setPatient] = useState([]);
  const [initialPatient, setInitialPatient] = useState([]);
  const [matricule_laboSession, setMatricule_laboSession] = useState("");
  const [matricule_employe_labo, setMatricule_employe_labo] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nationalite, setNationalite] = useState("");
  const [date, setDate] = useState("");
  const [lieuNaissance, setLieuNaissance] = useState("");
  const [residence, setResidence] = useState("");
  const [personneurgence, setPersonneurgence] = useState("");
  const [telpersonneurgence, setTelpersonneurgence] = useState("");
  const [matricule_patient, setMatricule_patient] = useState("");
  const [matricule, setMatricule] = useState("");
  const [selectPatient, setSelectPatient] = useState({});
  const [selected2, setSelected2] = useState(options[0]);
  const [selected1, setSelected1] = useState(pays[0]);
  const [pageNumber, setPageNumber] = useState(0);
  const [clientPerPage, setClientPerPage] = useState(3);
  const [pageCourente, setPageCourente] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [etat, setEtat] = useState(0);

  /**variable pour la pagination debut */
  const [total, setTotal] = useState(1);
  const [filtrePatient, setFiltrePatient] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingGetPatients, setLoadingGetPatients] = useState(false);
  /**variable pour la pagination fin*/

  /**const [reload, setReload]=useState(false)*/

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);

  function handleSearch(e) {
    let key = e.target.value;
    console.log(key);

    let data_filter = initialPatient.filter(
      (patient) =>
        patient.nom?.toLowerCase().includes(key) ||
        patient.matricule?.toLowerCase().includes(key) ||
        patient.telephone?.toLowerCase().includes(key)
    );
    setPatient(data_filter);
    start_filter(data_filter);

    console.log(data_filter);
  }
  /***pagination */
  const changePage = (event: any) => {
    setPageNumber(event.selected);
    //alert('bonjour')
    console.log("pages");
  };

  /***Afficher la liste des patients en registrer */

  const onShowPatient = async () => {
    //setReload(false)
    //setReload(true)
    setLoadingGetPatients(true);
    let token = await getAppToken();
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "client", "get", null);
      setLoadingGetPatients(false);
      if (response.data.success) {
        //setReload(false)
        let patients = response.data.data;
        setPageNumber(
          typeof pageNumber === "object"
            ? (pageNumber as any).selected
            : pageNumber
        );
        setPageCount(Math.ceil(patients.length / clientPerPage));

        /** division pour afficher le nombre d'elements par page debut */
        setTotal(Math.ceil(patients.length / 5));
        /** division pour afficher le nombre d'elements par page debut */

        patients.map((item) => {
          setMatricule(item.matricule);
          setEtat(item.state);

          // console.log("azzzzzzzzzzz",matricule);
        });
        setPatient(patients);
        setInitialPatient(patients);

        /** calcul de l'affichage par page debut */

        start_filter(patients);

        /** calcul de l'affichage par page fin */

        //console.log(response)
      }
    }
  };

  function start_filter(patients) {
    let filtre = patients.slice(0, 5);
    setFiltrePatient(filtre);
  }
  /********************************************** */

  /**fonction pour la pagination debut */
  function changeData(page) {
    console.log("pageReçue", page);
    let filtre = patient.slice((page - 1) * 5, page * 5);
    setFiltrePatient(filtre);
  }

  function prenext(cas, page) {
    if (cas === "next") {
      let filtre = patient.slice((page - 1) * 5, page * 5);
      setFiltrePatient(filtre);
    } else if (cas === "prev") {
      let filtre = patient.slice((page - 1) * 5, page * 5);
      setFiltrePatient(filtre);
    }
  }

  function firstlas(cas, page) {
    if (cas === "last") {
      let filtre = patient.slice((page - 1) * 5, page * 5);
      setFiltrePatient(filtre);
    } else if (cas === "first") {
      let filtre = patient.slice((page - 1) * 5, page * 5);
      setFiltrePatient(filtre);
    }
  }
  /**fonction pour la pagination end */

  /***Recuperer le matricule du labo et de l'employé afin de créer un patient */

  const inituserMat = () => {
    let users: any = localStorage.getItem("user");
    let user: any = JSON.parse(users);
    setMatricule_laboSession(user.matricule_labo);
    setMatricule_employe_labo(user.matricule);
  };
  /************************************************************************** */

  /****************************Creation d'un employé *****************************/

  const handleCreate = async (e: any) => {
    //setReload(false)
    // setReload(true)
    e.preventDefault();
    let registerClient = {
      nom: nom,
      prenom: prenom,
      telephone: telephone,
      nationalite: selected1,
      sexe: selected2,
      datenaissance: date,
      lieunassance: lieuNaissance,
      lieuvie: residence,
      personneurgence: personneurgence,
      telpersonneurgence: telpersonneurgence,
      matricule_labo: matricule_laboSession,
      matricule_emp: matricule_employe_labo,
    };
    setLoadingCreate(true);

    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      let response = await callApi(
        true,
        "client",
        "post",
        null,
        registerClient
      );
      console.log(response);

      setLoadingCreate(false);

      if (response?.data?.success) {
        //setReload(false)

        //setReload(true)

        notification("success", response.data.message);
        onShowPatient();
        setShow3(false);
        // window.location.reload();
      } else {
        notification("error", formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data));
        //setReload(false)
      }
    }

    console.log("client", registerClient);
  };
  /************************************ *****************************************/

  useEffect(() => {
    onShowPatient();
    inituserMat();
  }, []);
  return (
    <Fragment>
      {/* /***  Créer un patient*/}
      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Créer un patient</Modal.Title>
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
                    <Form.Control
                      type="text"
                      id="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
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
                      id="prenom"
                      value={prenom}
                      placeholder="murielle"
                      onChange={(e) => setPrenom(e.target.value)}
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
                      id="phone"
                      value={telephone}
                      placeholder="phone"
                      onChange={(e) => setTelephone(e.target.value)}
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
                    <Form.Label>Date de naissance</Form.Label>
                    <Form.Control
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="20/10/2022"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Lieu de naissance</Form.Label>
                    <Form.Control
                      type="text"
                      id="lieu"
                      value={lieuNaissance}
                      onChange={(e) => setLieuNaissance(e.target.value)}
                      placeholder="Douala"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Pays</Form.Label>
                    <select
                      className="form-control"
                      value={selected1}
                      onChange={(e) => setSelected1(e.target.value)}
                    >
                      <option value={""}>Veuillez choisir votre pays </option>
                      {pays.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
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
                    <Form.Label>Sexe</Form.Label>
                    <select
                      className="form-control"
                      value={selected2}
                      onChange={(e) => setSelected2(e.target.value)}
                    >
                      <option value={""}>Veuillez choisir votre sexe </option>
                      {options.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
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
                    <Form.Label>Lieu de residence</Form.Label>
                    <Form.Control
                      type="text"
                      id="residence"
                      value={residence}
                      onChange={(e) => setResidence(e.target.value)}
                      placeholder="residence"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom Personne à contacter </Form.Label>
                    <Form.Control
                      type="text"
                      id="contactPerson"
                      value={personneurgence}
                      onChange={(e) => setPersonneurgence(e.target.value)}
                      placeholder="anne"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tel Personne à contacter en urgence</Form.Label>
                    <Form.Control
                      type="text"
                      value={telpersonneurgence}
                      onChange={(e) => setTelpersonneurgence(e.target.value)}
                      id="phonePerson"
                      placeholder="phone"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={6} md={4}>
                  <Button
                    variant="danger"
                    className="mb-3"
                    onClick={handleClose3}
                  >
                    Annuler
                  </Button>
                </Col>

                <Col xs={6} md={4}>
                  <span></span>
                </Col>
                <Col xs={6} md={4} style={{ justifyContent: "space-between" }}>
                  <span></span>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mb-3"
                    style={{ marginLeft: "150px" }}
                  >
                    {loadingCreate && <Spinner animation="border" size="sm" />}
                    Créer
                  </Button>
                </Col>
              </Row>
            </Container>
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
          <Modal.Title>Informations du patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            <div className="row">
              <div className="col-12 mt-5">Nom: {selectPatient.nom}</div>
              <div className="col-12 mt-2">Prénom : {selectPatient.prenom}</div>
              <div className="col-12 mt-2">
                Téléphone : {selectPatient.telephone}
              </div>
              <div className="col-12 mt-2">
                date de naissance : {selectPatient.datenaissance}
              </div>
              <div className="col-12 mt-2">
                Lieu de naissance : {selectPatient.lieunassance}
              </div>
              <div className="col-12 mt-2">
                Nationalité : {selectPatient.nationalite}
              </div>
              <div className="col-12 mt-2">
                Lieu de residence : {selectPatient.lieuvie}
              </div>
              <div className="col-12 mt-2"> sexe : Feminin</div>
              <div className="col-12 mt-2">
                {" "}
                Personne à contacter : {selectPatient.personneurgence}
              </div>
              <div className="col-12 mt-2">
                {" "}
                Tel Personne à contacter : {selectPatient.telpersonneurgence}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
          <Modal.Title> Modifier les Informations du patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" placeholder="therese" autoFocus />
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
                      placeholder="murielle"
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
                      placeholder="12345567"
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
                    <Form.Label>Date de naissance</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="20/10/2022"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Lieu de naissance</Form.Label>
                    <Form.Control type="text" placeholder="Douala" autoFocus />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nationalité</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cameroun"
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
                    <Form.Label>Lieu de residence</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="residence"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom Personne à contacter </Form.Label>
                    <Form.Control type="text" placeholder="anne" autoFocus />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tel Personne à contacter en urgence</Form.Label>
                    <Form.Control type="text" placeholder="phone" autoFocus />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" style={{ marginLeft: "90%" }}>
            Enregistrer
          </Button>
        </Modal.Footer>
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
            Etes-vous sûr de vouloir desactiver ce Compte ?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="danger">Oui</Button>
          <Button variant="primary" onClick={handleClose2}>
            Non
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbars />
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
            className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
            id="kt_content"
          >
            
          </div>
          <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="kt-portlet kt-portlet--mobile">
              <div className="kt-portlet__head kt-portlet__head--lg">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">
                    Liste des patients
                    <small></small>
                  </h3>
                </div>
              </div>

              <div className="kt-portlet__body">
                <div className="kt-form kt-fork--label-right kt-margin-t-20 kt-margin-b-10">
                  <div className="row align-items-center">
                    <div className="col-xl-12  order-xl-1">
                      <div className="row align-items-center">
                        <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                          <div className="kt-input-icon kt-input-icon--left">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Rechercher  le code ou le nom..."
                              id="generalSearch"
                              onChange={handleSearch}
                            />
                            <span className="kt-input-icon__icon kt-input-icon__icon--left">
                              <span>
                                <i className="la la-search"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4 kt-margin-b-20-tablet-and-mobile"></div>
                        <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                          <button
                            className="btn btn-primary"
                            style={{ marginLeft: "100px" }}
                            onClick={handleShow3}
                          >
                            Nouveau Patient
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 order-1 order-xl-2 kt-align-right">
                      <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg d-xl-none"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kt-portlet__body kt-portlet__body--fit">
                <div
                  className="kt_datatable kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded"
                  id="local_data"
                >
                  <table
                    className="kt-datatable__table"
                    style={{ display: "block" }}
                  >
                    <thead className="kt-datatable__head">
                      <tr className="kt-datatable__row" style={{ left: "0px" }}>
                        {/* <th className="kt-datatable__cell kt-datatable__toggle-detail">
                          <span></span>
                        </th> */}
                        <th
                          data-field="id"
                          className="kt-datatable__cell--center kt-datatable__cell kt-datatable__cell--check"
                        >
                          <span style={{ width: "20px" }}>
                            <label>
                              / &nbsp;<span></span>
                            </label>
                          </span>
                        </th>
                        <th
                          data-field="employee_id"
                          className="kt-datatable__cell kt-datatable__cell--sort"
                        >
                          <span style={{ width: "110px" }}>Code</span>
                        </th>
                        <th
                          data-field="name"
                          className="kt-datatable__cell kt-datatable__cell--sort"
                        >
                          <span style={{ width: "110px" }}>Nom</span>
                        </th>
                        <th
                          data-field="hire_date"
                          className="kt-datatable__cell kt-datatable__cell--sort"
                        >
                          <span style={{ width: "110px" }}>Conctact</span>
                        </th>

                        <th
                          data-field="Actions"
                          data-autohide-disabled="false"
                          className="kt-datatable__cell kt-datatable__cell--sort"
                        >
                          <span style={{ width: "110px" }}>Actions</span>
                        </th>
                      </tr>
                    </thead>

                    {loadingGetPatients ? (
                      <div className="text-center my-4">
                        <Spinner
                          as="span"
                          animation="border"
                          size="lg"
                          role="status"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <tbody className="kt-datatable__body" style={{}}>
                        {patient.map((key: any, index: number) => {
                          if (key.matricule_labo === matricule_laboSession) {
                            return (
                            
                              <tr
                                data-row="0"
                                className={
                                  key.state === 1
                                    ? "kt-datatable__row"
                                    : "kt-datatable__row block_user"
                                }
                                style={{ left: "0px" }}
                              >
                                {/* <td className="kt-datatable__cell kt-datatable__toggle-detail">
                                <a
                                  className="kt-datatable__toggle-detail"
                                  href=""
                                >
                                  <i className="fa fa-caret-right"></i>
                                </a>
                              </td> */}
                                <td
                                  className="kt-datatable__cell--center kt-datatable__cell kt-datatable__cell--check"
                                  data-field="id"
                                >
                                  <span style={{ width: "20px" }}>
                                    <label>
                                      {index}
                                      &nbsp;
                                      <span></span>
                                    </label>
                                  </span>
                                </td>
  
                                <td
                                  data-field="employee_id"
                                  className="kt-datatable__cell"
                                >
                                  <span style={{ width: "110px" }}>
                                    {key.matricule} 
                                  </span>
                                </td>
                                <td
                                  data-field="name"
                                  className="kt-datatable__cell"
                                >
                                  <span style={{ width: "110px" }}>
                                    {key.nom}
                                  </span>
                                </td>
                                <td
                                  data-field="hire_date"
                                  className="kt-datatable__cell"
                                >
                                  <span style={{ width: "110px" }}>
                                    {key.telephone}
                                  </span>
                                </td>
  
                                <td
                                  data-field="Actions"
                                  data-autohide-disabled="false"
                                  className="kt-datatable__cell"
                                >
                                  <span
                                    style={{
                                      overflow: "visible",
                                      position: "relative",
                                      width: "110px",
                                    }}
                                  >
                                    <div className="dropdown">
                                      {/* {key.state === 1 && ( */}
                                      <Link
                                        title="Visualiser "
                                        className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                        to={`/listepatient/${key.matricule}`}
                                      >
                                        <i className="far fa-eye "></i>
                                      </Link>
                                      {/* )} */}
                                    </div>
                                    {/* <a title="Editer les details" className="btn btn-sm btn-clean btn-icon btn-icon-md" onClick={handleShow1}>
                                  <i className="la la-edit"></i>
                                </a> */}
                                    {/* {key.state == 0 && (
                                    <a
                                      title="Patient Desactivé"
                                      className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                    >
                                      <i className="fa fa-eye-slash over text-danger"></i>
                                    </a>
                                  )} */}
                                  </span>
                                </td>
                              </tr>
                            );
                          }

                          
                        })}
                      </tbody>
                    )}

                    {/* {reload && 
                              <div className="row justify-content-center">
                              <div className="col-6">
                                <Spinner animation="border" />
                              </div>
                        </div>
                             } */}
                  </table>
                </div>
              </div>

              {/*appel du fichier ou on a fait la pagination debut */}
              <PaginationBasic
                total={total}
                sendCurrentPage={changeData}
                prenext={prenext}
                firstlas={firstlas}
              />
              {/*appel du fichier ou on a fait la pagination fin */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GestionPatient;
