import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../layout/Navbar.tsx";
import Sidebar from "../layout/Sidebar.tsx";
import { getAppToken } from "../login/Utils.tsx";
import callApi from "../../Utils/Utils.tsx";
import { notification } from "../../Utils/Utils.tsx";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import PaginationBasic from "../Tools/PaginationBasic.tsx";
import { sum_object, determine_if_checked } from "../../Utils/Utils.tsx";

const options = ["1 Mois", "3 Mois", "6 Mois"];
const options1 = ["Feminin", "Masculin"];

const pays = [
  "République démocratique du Congo",
  "Cameroun",
  "France",
  "São Tomé-et-Principe",
  "Sénégal",
];

let status = ["tout", "encours", "terminer", "annuler"];
const DetailPatient = () => {
  const params = useParams();
  const [matricule_laboSession, setMatricule_laboSession] = useState("");
  const [mat_userSession, setMat_userSession] = useState("");
  const [mat_agSession, setMat_agSession] = useState("");
  const [matricule_employe_labo, setMatricule_employe_labo] = useState("");
  const [selected2, setSelected2] = useState(options[0]);
  const [isvisibility, setIsvisibility] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nationalite, setNationalite] = useState("");
  const [date, setDate] = useState("");
  const [lieuNaissance, setLieuNaissance] = useState("");
  const [residence, setResidence] = useState("");
  const [personneurgence, setPersonneurgence] = useState("");
  const [telpersonneurgence, setTelpersonneurgence] = useState("");
  const [idStatut, setIdStatut] = useState("");
  const [matricule_patient, setMatricule_patient] = useState("");
  const [patient, setPatient] = useState([]);
  const [show3, setShow3] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [typeExamen, setTypeExamen] = useState([]);
  const [allExamById, setAllExamById] = useState([]);
  const [mat, setMat] = useState();
  const [type, setType] = useState(0);
  const [checked1, setChecked1] = useState(false);
  const [selected, setSelected] = useState(options1[0]);
  const [selected1, setSelected1] = useState(pays[0]);
  const [examen, setExamen] = useState([]);
  const [matExam, setMatExam] = useState();
  const [prix, setPrix] = useState();
  const [codeExamen, setCodeExam] = useState();
  const [prixTotal, setPrixTotal] = useState(0);
  const [totalPrix, setTotalPrix] = useState(0);
  const [statusexamen, setStatusexamen] = useState("");
  const [detailtypeExam, setDetailtypeExam] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [initialExam, setInitialExam] = useState([]);
  const [initialExams, setInitialExams] = useState([]);
  const [statusExamen, setStatusExamen] = useState([]);
  const [matfam, setMatfam] = useState("");
  const [code, setCode] = useState([]);
  const [show2, setShow2] = useState(false);
  const [key, setKey] = useState("examen");
  const [total, setTotal] = useState(1);
  const [numberPerPage, setNumberPerPage] = useState(10);
  const [familyExams, setFamilyExams] = useState([]);
  const [typeExamens, setTypeExamens] = useState([]);
  const [description, setDesciption] = useState("");
  const [show4, setShow4] = useState(false);
  const [nomExam, setNomExam] = useState("");
  const [prixExam, setPrixExam] = useState("");
  const  [dates, setDates]=useState("")
  const [detailexamen, setDetailexamen] = useState([]);
  const [selectExam, setselectExam] = useState({});
  const [createOrUpdate, setCreateOrUpdate] = useState("create");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [listRdvs, setListRdvs] = useState([]);

  const handleClose2 = () => setShow3(false);

  const handleShow4 = (listExam: any) => {
    setselectExam(listExam);
    setShow4(true);
  };

  const handleClose4 = () => setShow4(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => {
    setCreateOrUpdate("create");
    setFamilyExams([]);
    setDesciption("");
    setIdStatut("");
    setDesciption("");
    setTypeExamens([]);
    setAllExamById([]);
    setPrixTotal(0);
    setShow3(true);
  };
  const handleClose = () => setShow(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);

  const inituserLab = () => {
    let users: any = localStorage.getItem("user");
    let user: any = JSON.parse(users);
    setMatricule_laboSession(user.matricule_labo);
    setMat_userSession(user.matricule);
    setMat_agSession(user.matricule_ag);
  };
  const onShowPatientById = async () => {
    let token = await getAppToken();
    let pathname = window.location.pathname;
    let id = pathname.split("/")[2];
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, `client/${id}`, "get", null);
      let patients = response.data.data;

      setNom(response.data.data.nom);
      setPrenom(response.data.data.prenom);
      setDates(response.data.data.ages);
      setDate(response.data.data.datenaissance);
      setPersonneurgence(response.data.data.personneurgence);
      setTelpersonneurgence(response.data.data.telpersonneurgence);
      setResidence(response.data.data.lieuvie);
      setTelephone(response.data.data.telephone);
      setLieuNaissance(response.data.data.lieunassance);
      setMatricule_patient(response.data.data.matricule);

      setPatient(patients);
    }
  };

  /******afficher les details d'un examen du patient */

  const onShowPatientExamenById = async () => {
    let token = await getAppToken();
    let pathname = window.location.pathname;
    let id = pathname.split("/")[2];
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, `examenscli/${id}`, "get", null);
      let examen = response.data.data;

      examen.map((item: any) => {
        setTotalPrix(item.prixtotal);
        setCodeExam(item.matricule);
        setStatusexamen(item.statusexamen);
      });

      setTotal(Math.ceil(examen.length / numberPerPage));
      setInitialExam(examen);
      setInitialExams(examen);

      setListExam(examen);
      start_filter(examen);
    }
  };

  const handleModify = async (e: any) => {
    let pathname = window.location.pathname;
    let id = pathname.split("/")[2];
    e.preventDefault();
    let modifyClient = {
      nom: nom,
      prenom: prenom,
      telephone: telephone,
      nationalite: selected1,
      sexe: selected,
      datenaissance: date,
      lieunassance: lieuNaissance,
      lieuvie: residence,
      personneurgence: personneurgence,
      telpersonneurgence: telpersonneurgence,
      matricule_labo: matricule_laboSession,
      matricule_emp: matricule_employe_labo,
    };
    let token = await getAppToken();
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(
        true,
        `client/${id}`,
        "put",
        null,
        modifyClient
      );
      //console.log(response)

      if (response?.data?.success) {
        setShow1(false);
        notification("success", response.data.message);
      } else {
        notification("error", "une erreur inatendu est survenue");
      }
    }

    //console.log('client', modifyClient)
  };
  const changeMenu = (type: String) => {
    if (type === "examen") {
      setVisibility(true);
      setVisibility1(false);
      setVisibility2(false);
      setType(1);
    } else if (type === "resultat") {
      setVisibility(false);
      setVisibility1(true);
      setVisibility2(false);
      setType(2);
    } else {
      setVisibility(false);
      setVisibility1(false);
      setVisibility2(true);
      setType(3);
    }
  };

  function start_filter(exams) {
    let filtre = exams.slice(0, numberPerPage);
    setListExam(filtre);
  }
  const handleShowexamen = async () => {
    let token = await getAppToken();
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "famille", "get", null);

      if (response?.data?.success) {
        let result = response.data.data;
        result.map((item: any) => {
          setMat(item.matricule);
        });

        setExamen(result);
      } else {
      }
    }
  };

  async function get_existing_type_exam(id_family) {
    let response = await callApi(true, "alltypeperfam", "post", null, {
      code: id_family,
    });

    if (response?.data?.success) {
      let result = response.data.data;
      console.log(" all type exam  ", result);
      setAllExamById(result);
    }
  }
  const onShowTypeExamById = async (e: any, data: any) => {
    // e.preventDefault()

    // setMatfam(ids);

    let token = await getAppToken();

    let checkExist = familyExams.find(
      (exam) => exam?.codefam === data.matricule
    );

    let tempo: any = familyExams;

    if (!checkExist) {
      console.log("pas encore  ");
      let obj = { codefam: data.matricule };
      tempo.push(obj);
      console.log("pas encore  ", tempo);
      setFamilyExams(tempo);

      // data_to_send = {code:  tempo.map((item)=> item.codefam) }
    } else {
      console.log("deja ");

      // let tempo: any = familyExams;
      tempo = tempo.filter((item) => item.codefam !== data.matricule);
      setFamilyExams(tempo);
    }

    let data_to_send = { code: tempo.map((item) => item.codefam) };

    // if (code.includes(ids)) {
    //   setCode((current) => [...current].filter((item: any) => item !== ids));

    //   id = {
    //     code: [...code].filter((item: any) => item !== ids),
    //   };

    //   let resultData: any = [];
    //   id.code.forEach((item) => {
    //     resultData.push({ codefam: item });
    //   });

    //   console.log("retiré ", resultData);

    //   setFamilyExams((state) => resultData);
    // } else {
    //   setCode((current) => [...current, ids]);
    //   // [{ codefam: matfam }],
    //   id = {
    //     code: [...code, ids],
    //   };

    //   let resultData: any = [];
    //   id.code.forEach((item) => {
    //     resultData.push({ codefam: item });
    //   });

    //   console.log("Ajouté   ", resultData);

    //   setFamilyExams((state) => resultData);
    // }

    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(
        true,
        "alltypeperfam",
        "post",
        null,
        data_to_send
      );
      if (response?.data?.success) {
        let result = response.data.data;
        result.map((item: any) => {
          setPrix(item.prix);
          setMat(item.matricule);

          // console.log(item.nom);
          // console.log(item.prix);
        });
        //console.log(result);
        // console.log(prix);
        setAllExamById(result);

        setVisibility(true);
      }
    }
  };

  const onShowTypeExam = async () => {
    let token = await getAppToken();

    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "typeexamen", "get", null);
      if (response?.data?.success) {
        let result = response.data.data;
        setTypeExamen(result);
        //console.log("type", result);
        result.map((id: any) => {});
      }
    }
  };

  const onShowStatusExam = async () => {
    let token = await getAppToken();

    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "statusexamen", "get", null);
      if (response?.data?.success) {
        let result = response.data.data;
        result.map((item: any) => {
          setIdStatut(item.id);
        });
        setStatusExamen(result);
        // console.log("status", result);
      }
    }
  };
  const handlePrice = async (e: any, data: any) => {
    // setMat(id);
    // console.log("enter ", data);

    // [{ codetype: mat, prixtotal: prix }],

    let checkExist = typeExamens.find(
      (exam) => exam?.codetype === data.matricule
    );

    console.log(" check -- ", checkExist, " --end");

    if (!checkExist) {
      console.log("pas encore  ");

      let tempo: any = typeExamens;
      let obj = { codetype: data.matricule, prixtotal: data.prix };
      tempo.push(obj);
      console.log("pas encore  ", tempo);

      setPrixTotal(sum_object(tempo, "prixtotal"));

      setTypeExamens(tempo);
    } else {
      console.log("deja ");

      let tempo: any = typeExamens;
      let newData = tempo.filter((item) => item.codetype !== data.matricule);
      setPrixTotal(sum_object(newData, "prixtotal"));
      setTypeExamens(newData);
    }

    // console.log("eta", mat);
    // if (mat == id) {
    //   setPrixTotal(prix);
    //   console.log("prix", prixTotal);
    //   //return prixTotal
    // } else {
    //   setPrixTotal(prixTotal + prix);
    //   console.log("nex", prixTotal);
    //   //return prixTotal
    // }
  };

  const handleDesactivePatient = async (e: any) => {
    e.preventDefault();
    let pathname = window.location.pathname;
    let id = pathname.split("/")[2];

    let token = await getAppToken();
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, `client/${id}`, "delete", null);

      if (response?.data?.success) {
        onShowPatientById();

        setShow1(false);
        notification("success", response.data.data);
      } else {
        //notification('error',  "une erreur inatendu est survenue" )
      }
    }
  };

  /***Créer l'examen pour patient */

  const handleCreateExam = async (e: any) => {
    let pathname = window.location.pathname;
    let id = pathname.split("/")[2];
    e.preventDefault();
    let examenCreated = {
      codeclient: id,
      codestatusexamen: idStatut,
      prixtotal: prixTotal,
      matricule_labo: matricule_laboSession,
      matricule_emp: mat_userSession,
      matricule_ag: mat_agSession,
      examen: typeExamens,
      fam: familyExams,
      description,
    };
    console.log(" --- ", examenCreated);

    let token = await getAppToken();
    if (token) {
      localStorage.setItem("Apitoken", token);
      let route =
        createOrUpdate === "update" ? `examens/${selectedExamId}` : `examens`;
      let method = createOrUpdate === "update" ? "put" : `post`;
      let response = await callApi(true, route, method, null, examenCreated);
      //console.log(response)

      if (response?.data?.success) {
        onShowPatientExamenById();
        setShow3(false);
        notification("success", response.data.message);
      } else {
        notification("error", "une erreur inatendu est survenue");
      }
    }

    //console.log("examen", examenCreated);
  };

  /********Modifier les information d'un examen */

  const handleModifyExam = async (e: any, ids: any) => {
    let pathname = window.location.pathname;
    let id = pathname.split("/")[2];
    e.preventDefault();
    let examenCreated = {
      codeclient: id,
      codestatusexamen: idStatut,
      prixtotal: prixTotal,
      matricule_labo: matricule_laboSession,
      matricule_emp: mat_userSession,
      matricule_ag: mat_agSession,
      examen: typeExamens,
      fam: familyExams,
      description,
    };
    // console.log(" --- ", examenCreated);

    let token = await getAppToken();
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(
        true,
        "examens",
        "pull",
        null,
        examenCreated
      );
      //console.log(response)

      if (response?.data?.success) {
        onShowPatientExamenById();
        setShow3(false);
        notification("success", response.data.message);
      } else {
        // notification("error", "une erreur inatendu est survenue");
      }
    }

    //console.log("examen", examenCreated);
  };
  const handleShowEditExam = async (id: any) => {
    setCreateOrUpdate("update");
    console.log("azzzzzzzzzzz");
    await get_old_exam_by_id(id);
    setShow3(true);
  };

  const get_old_exam_by_id = async (id: any) => {
    let token = await getAppToken();
    setSelectedExamId(id);
    // let pathname = window.location.pathname;
    // let id = pathname.split("/")[2];
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, `examens/${id}`, "get", null);
      let patients = response.data.dataetype;
      console.log("aaaaaaaaaaaaaaa", response.data);
      setDesciption(response.data.dataexam.description);
      setIdStatut(response.data.dataexam.idstatusexam);
      let family_exam = response.data.datafam.map((item) => {
        return { codefam: item.codefamille };
      });
      setFamilyExams(family_exam);

      //récupération de tous les type d'examens en fonction des familles
      console.log("code famille ", family_exam);
      await get_existing_type_exam(family_exam);

      //reformatage des types examens existant
      let tempo: any = [];
      tempo = response.data.dataetype.map((item) => {
        return { codetype: item.codetype, prixtotal: item.prixtotal };
      });
      console.log("all type exam formaté  ", tempo);

      setPrixTotal(sum_object(tempo, "prixtotal"));

      setTypeExamens(tempo);

      return;
      setDetailexamen(patients);
      setNom(response.data.dataexam.nom);
      setPrenom(response.data.dataexam.prenom);
      setCode(response.data.dataexam.matricule);
      setPrixTotal(response.data.dataexam.prixtotal);

      // patients.map((item:any)=>{
      //   setNomExam(item.nom)
      // setPrixExam(item.prixtotal)
      // setDescription(item.description)
      // })
      //console.log(prixExam);
    }
  };

  /***Supprimer un examen*/

  const onDeleteExamById = async (e: any) => {
    e.preventDefault();
    let token = await getAppToken();
    // let pathname = window.location.pathname;
    // let id = pathname.split("/")[2];
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(
        true,
        `examens/${selectExam.matricule}`,
        "delete",
        null
      );
      if (response?.data?.success) {
        onShowPatientExamenById();
        console.log("message", response.data.data);

        setShow4(false);
        notification("success", response.data.data);
      } else {
        //notification('error',  "une erreur inatendu est survenue" )
      }
    }
  };
  function changeData(page) {
    //console.log("pageReçue", page);
    let filtre = initialExam.slice(
      (page - 1) * numberPerPage,
      page * numberPerPage
    );
    setListExam(filtre);
  }

  function prenext(cas, page) {
    if (cas === "next") {
      let filtre = initialExam.slice(
        (page - 1) * numberPerPage,
        page * numberPerPage
      );
      setListExam(filtre);
    } else if (cas === "prev") {
      let filtre = initialExam.slice(
        (page - 1) * numberPerPage,
        page * numberPerPage
      );
      setListExam(filtre);
    }
  }

  function filterByStatus(e) {
    //console.log(e.target.value);
    let key = e.target.value;
    let tempo = initialExams;

    if (key === "tout") {
      setInitialExam(initialExams);
      start_filter(initialExams);
    } else {
      let newData = tempo.filter((item: any) => item.statusexamen === key);
      setInitialExam(newData);
      start_filter(newData);
    }
  }

  async function get_client_rendez_vous() {
    // let pathname = document.location;
    // let id = pathname.split("/")[2];
    let { id } = params;
    console.log("--------------------", id);
    let response = await callApi(true, `clientrendezvous/${id}`, "get", null);
    console.log("--------------------", response);

    if (response.data.success) {
      setListRdvs(response.data.data);
    }
  }
  useEffect(() => {
    get_client_rendez_vous();
    onShowPatientById();
    inituserLab();
    handleShowexamen();
    onShowTypeExam();
    onShowPatientExamenById();
    onShowStatusExam();
  }, []);

  return (
    <Fragment>
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
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
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
                      value={telephone}
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
                      value={date}
                      placeholder="20/10/2022"
                      onChange={(e) => setDate(e.target.value)}
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
                      value={lieuNaissance}
                      onChange={(e) => setLieuNaissance(e.target.value)}
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
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      {options1.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
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
                      type="text"
                      value={residence}
                      onChange={(e) => setResidence(e.target.value)}
                      placeholder="numero telephone"
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
                      placeholder="23445566"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  <Button variant="danger" onClick={handleClose1}>
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
                    style={{ marginLeft: "150px" }}
                  >
                    Enregistrer
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* /***  Créer un examen*/}
      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {createOrUpdate === "update"
              ? "Modifier un Examen"
              : "Créer un nouvel Examen"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleCreateExam}>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Famille des examens</Form.Label>
                    <div style={{ maxHeight: "100px", overflowY: "scroll" }}>
                      {examen.map((item: any, index: number) => {
                        return (
                          <>
                            <Form.Check
                              key={index}
                              checked={determine_if_checked(
                                familyExams,
                                item.matricule,
                                createOrUpdate,
                                "codefam"
                              )}
                              type="checkbox"
                              value={item.matricule}
                              label={item.nom}
                              className="mb-3"
                              style={{ marginLeft: "10px" }}
                              onChange={(e) => onShowTypeExamById(e, item)}
                            />
                          </>
                        );
                      })}
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Type d'examen</Form.Label>
                    <div style={{ maxHeight: "150px", overflowY: "scroll" }}>
                      {allExamById.map((items: any, index: number) => {
                        return (
                          <div>
                            <Form.Check
                              key={index}
                              checked={determine_if_checked(
                                typeExamens,
                                items.matricule,
                                createOrUpdate,
                                "codetype"
                              )}
                              type="checkbox"
                              value={items.matricule}
                              label={`${items.nom}  ${items.prix}`}
                              className="mb-3"
                              style={{ marginLeft: "10px" }}
                              onChange={(e) => handlePrice(e, items)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Prix Total</Form.Label>
                    <Form.Control
                      type="text"
                      id="phone"
                      value={prixTotal}
                      placeholder="hapi"
                      style={{ textDecoration: "none", borderColor: "white" }}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDesciption(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group>
                    <Form.Label>Status Examen</Form.Label>
                    <select
                      className="form-control"
                      value={idStatut}
                      onChange={(e) => setIdStatut(e.target.value)}
                    >
                      <option value="">choisir un status</option>
                      {statusExamen.map((items: any) => {
                        return (
                          <option value={items.id} key={items.id}>
                            {items.libelle}
                          </option>
                        );
                      })}
                    </select>
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
                    {createOrUpdate === "update" ? "Modifier" : "Créer"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* /***  Modifier un examen*/}
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Modifier un examen</Modal.Title>
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
                    <Form.Label>Famille des examens</Form.Label>
                    <div style={{ maxHeight: "100px", overflowY: "scroll" }}>
                      {examen.map((item: any) => {
                        return (
                          <>
                            <Form.Check
                              type="checkbox"
                              value={item.matricule}
                              label={item.nom}
                              className="mb-3"
                              style={{ marginLeft: "10px" }}
                              onChange={(e) =>
                                onShowTypeExamById(e, item.matricule)
                              }
                            />
                          </>
                        );
                      })}
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Type d'examen</Form.Label>
                    <div style={{ maxHeight: "150px", overflowY: "scroll" }}>
                      {detailexamen.map((items: any) => {
                        return (
                          <div>
                            <Form.Check
                              type="checkbox"
                              value={items.matricule}
                              label={`${items.nom}  ${items.prixtotal}`}
                              className="mb-3"
                              style={{ marginLeft: "10px" }}
                              onChange={(e) => handlePrice(e, items)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Prix Total</Form.Label>
                    <Form.Control
                      type="text"
                      id="phone"
                      value={prixTotal}
                      placeholder="hapi"
                      style={{ textDecoration: "none", borderColor: "white" }}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDesciption(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group>
                    <Form.Label>Status Examen</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e) => setIdStatut(e.target.value)}
                    >
                      {statusExamen.map((items: any) => {
                        return (
                          <option value={items.id} key={items.id}>
                            {items.libelle}
                          </option>
                        );
                      })}
                    </select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={6} md={4}>
                  <Button
                    variant="danger"
                    className="mb-3"
                    onClick={handleClose2}
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
                    Modifier
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/***suppression d'un examen */}

      <Modal
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Supprimer un examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez-vous supprimer Cette examen ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose4}>
            Annuler
          </Button>
          <Button variant="primary" onClick={onDeleteExamById}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      {/* /***  Créer un patient*/}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Reporter les resultats d'un Examen</Modal.Title>
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
                    <Form.Label>Date de l'examen</Form.Label>
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
                    <Form.Label>Nom de l'examen</Form.Label>
                    <Form.Control
                      type="text"
                      id="lieu"
                      value=""
                      placeholder="nom examen"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>type d'examen</Form.Label>
                    <Form.Control
                      type="text"
                      id="lieu"
                      value=""
                      placeholder="sanguin"
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
                    <Form.Label>Resultat</Form.Label>
                    <Form.Control
                      type="text"
                      id="lieu"
                      value=""
                      placeholder="resultat"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={8}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={6} md={4}>
                  <Button
                    variant="danger"
                    className="mb-3"
                    onClick={handleClose}
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
                    Créer
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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
        ></div>

        <div
          className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
          id="kt_content"
        >
          <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
              <button
                className="kt-app__aside-close"
                id="kt_profile_aside_close"
              >
                <i className="la la-close"></i>
              </button>

              <div
                className="kt-grid__item kt-app__toggle kt-app__aside kt-app__aside--sm kt-app__aside--fit"
                id="kt_profile_aside"
              >
                <div className="kt-portlet">
                  <div className="kt-portlet__body">
                    <div className="kt-widget kt-widget--general-1">
                      {/* <div className="kt-media kt-media--brand kt-media--md kt-media--circle">
                <img src="../../../../themes/keen/theme/demo1/dist/assets/media/users/100_3.jpg" alt="image"/>
            </div> */}
                      <div className="kt-widget__wrapper">
                        <div className="kt-widget__label">
                          {/* <a className="kt-widget__title"> */}
                          {nom} {prenom}
                          {/* </a> */}
                          <span className="kt-widget__desc">
                            {/* Conctact */}
                          </span>
                        </div>
                        <div className="kt-widget__toolbar kt-widget__toolbar--top-">
                          <div className="btn-group">
                            <div className="dropdown dropdown-inline">
                              <a
                                title="Desactiver le patient"
                                onClick={handleDesactivePatient}
                                className="btn btn-clean btn-sm btn-icon btn-icon-md"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {patient.state === 1 ? (
                                  <i className="fa fa-eye over text-success"></i>
                                ) : (
                                  <i className="fa fa-eye-slash over text-danger"></i>
                                )}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="kt-portlet__separator"></div>

                  <div className="kt-portlet__body">
                    <ul
                      className="kt-nav kt-nav--bolder kt-nav--fit-ver kt-nav--v4"
                      role="tablist"
                    >
                      <li className="kt-nav__item   ">
                        <span className="kt-nav__link " role="tab">
                          <span className="kt-nav__link-icon">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                          </span>
                          <span className="kt-nav__link-text">{telephone}</span>
                        </span>
                      </li>
                      <li className="kt-nav__item   ">
                        <span className="kt-nav__link " role="tab">
                          <span className="kt-nav__link-icon">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <span className="kt-nav__link-text">{residence}</span>
                        </span>
                      </li>
                      <li className="kt-nav__item   ">
                        <span className="kt-nav__link active" role="tab">
                          {/* <span className="kt-nav__link-icon"><i className="flaticon2-user"></i></span> */}
                          <span className="kt-nav__link-text">
                            {" "}
                            Age: {dates}
                          </span>
                        </span>
                      </li>
                      <li className="kt-nav__item  active ">
                        <span className="kt-nav__link " role="tab">
                          <span className="kt-nav__link-text active">
                            Personne à contacter:
                          </span>
                        </span>
                      </li>
                      <li className="kt-nav__item   ">
                        <span className="kt-nav__link " role="tab">
                          <span className="kt-nav__link-icon">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </span>
                          <span className="kt-nav__link-text">
                            {personneurgence}
                          </span>
                        </span>
                      </li>
                      <li className="kt-nav__item   ">
                        <span className="kt-nav__link " role="tab">
                          <span className="kt-nav__link-icon">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                          </span>
                          <span className="kt-nav__link-text">
                            {" "}
                            {telpersonneurgence}
                          </span>
                        </span>
                      </li>
                      {/* <li className="kt-nav__item  ">
                <Link to='/Resetpassword' className="kt-nav__link"  role="tab">
                    <span className="kt-nav__link-icon"><i className="flaticon2-settings"></i></span>
                    <span className="kt-nav__link-text">Changer votre mot de passe</span>
                </Link>
            </li> */}
                    </ul>
                  </div>

                  <div className="kt-portlet__separator"></div>

                  <div className="kt-portlet__body">
                    <ul
                      className="kt-nav kt-nav--bolder kt-nav--fit-ver kt-nav--v4"
                      role="tablist"
                    >
                      <li className="kt-nav__custom">
                        <button
                          className="btn btn-primary btn-sm btn-upper btn-bold"
                          onClick={handleShow1}
                        >
                          Modifier les informations
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
                <div className="kt-portlet">
                  {/* <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                      <div
                        className="form-group "
                        style={{ marginTop: "50px" }}
                      >
                        <div className="kt-radio-inline">
                          <input
                            type="radio"
                            id="radio"
                            name="radio-group"
                            value="examen"
                            onClick={() => changeMenu("examen")}
                          />
                          <label htmlFor="radio" className="kt-radio">
                            Examen
                          </label>

                          <input
                            type="radio"
                            id="radio"
                            name="radio-group"
                            value="resultat"
                            onClick={() => changeMenu("resultat")}
                          />
                          <label htmlFor="radio" className="kt-radio">
                            Result des examens
                          </label>

                          <input
                            type="radio"
                            id="radio"
                            name="radio-group"
                            value="rdv"
                            onClick={() => changeMenu("rdv")}
                          />
                          <label htmlFor="radio" className="kt-radio">
                            Rendez-vous
                          </label>
                        </div>
                      </div>
                    </div> 
                    <div className="kt-portlet__head-toolbar">
                      <div className="kt-portlet__head-wrapper"></div>
                    </div>
                  </div> */}

                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="examen" title="Examen">
                      <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                          <div className="kt-section__body">
                            <div className="kt-form__actions">
                              <div className="row">
                                <div className="col-lg-3 col-xl-3">
                                  <h3 className="kt-section__title kt-section__title-sm">
                                    Liste des examens
                                  </h3>
                                </div>

                                <div
                                  className="col-lg-9 col-xl-9"
                                  style={{
                                    marginLeft: "70%",
                                    marginBottom: "20px",
                                  }}
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={handleShow3}
                                  >
                                    Nouveau examen
                                  </button>
                                  &nbsp;
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3 my-4">
                                <select
                                  className="form-control"
                                  // value={selected1}
                                  onChange={filterByStatus}
                                >
                                  <option value={""}>
                                    Veuillez choisir un status{" "}
                                  </option>
                                  {status.map((value) => (
                                    <option value={value} key={value}>
                                      {value}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <table
                              className="table table-striped- table-bordered table-hover table-checkable"
                              id="kt_table_1"
                            >
                              <thead>
                                <tr>
                                  <th>Code</th>
                                  {/* <th>Nom</th>
                                     <th>Famille examen</th>
                                     <th>Description</th>
                                     <th>Details</th> 
                                     <th>Action</th>*/}
                                  <th>Status Examen</th>
                                  <th>Prix Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listExam.map((key: any) => {
                                  return (
                                    <tr>
                                      <td>{key.matricule}</td>
                                      <td>{key.statusexamen}</td>
                                      <td>{key.prixtotal}</td>

                                      <td>
                                        <Link
                                          title=" Voir les details de l'examen du patient"
                                          to={`/examenpatientDetail/${key.matricule}`}
                                          className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                        >
                                          <i className="far fa-eye text-primary"></i>
                                        </Link>
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
                                          <a
                                            title="Modifier  d'un examen"
                                            onClick={() =>
                                              handleShowEditExam(key.matricule)
                                            }
                                            className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                          >
                                            <i className="fas fa-pencil-alt text-success"></i>
                                          </a>
                                          <a
                                            title="Supprimer un examen"
                                            onClick={() => handleShow4(key)}
                                            className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                          >
                                            <i className="la la-trash over text-danger"></i>
                                          </a>
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            <PaginationBasic
                              total={total}
                              sendCurrentPage={changeData}
                              prenext={prenext}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="rdv" title="Rendez-vous">
                      <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                          <div className="kt-section__body">
                            <div className="kt-form__actions">
                              <div className="row">
                                <div className="col-lg-9 col-xl-9">
                                  <h3 className="kt-section__title kt-section__title-sm">
                                    Rendez-vous du patient
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <table
                              className="table table-striped- table-bordered table-hover table-checkable"
                              id="kt_table_1"
                            >
                              <thead>
                                <tr>
                                  <th>Nom du laborantin</th>
                                  <th>Date debut</th>
                                  <th>Date de fin</th>
                                  <th>Objet</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listRdvs.map((rdv: any) => {
                                  return (
                                    <tr>
                                      <td> {rdv.avec} </td>
                                      <td> {rdv.debut} </td>
                                      <td> {rdv.fin} </td>
                                      <td> {rdv.objet} </td>
                                      <td> {rdv.priorite} </td>
                                    </tr>
                                  );
                                })}

                                {listRdvs.length < 1 && (
                                  <div className="row justify-content-center">
                                    <div className="col-6 p-5">
                                      <h4>Aucun Rendez-vous pour ce patient</h4>
                                    </div>
                                  </div>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>

                  {/* {visibility1 && (
                    <div className="kt-portlet__body">
                      <div className="kt-section kt-section--first">
                        <div className="kt-section__body">
                          <div className="kt-form__actions">
                            <div className="row">
                              <div className="col-lg-9 col-xl-9">
                                <h3 className="kt-section__title kt-section__title-sm">
                                  Resultats des examens
                                </h3>
                              </div>

                              <div
                                className="col-lg-9 col-xl-9"
                                style={{
                                  marginLeft: "59%",
                                  marginBottom: "20px",
                                }}
                              >
                                <button
                                  className="btn btn-primary"
                                  onClick={handleShow}
                                >
                                  Reporter le resultat d'un examen
                                </button>
                                &nbsp;
                              </div>
                            </div>
                          </div>
                          <table
                            className="table table-striped- table-bordered table-hover table-checkable"
                            id="kt_table_1"
                          >
                            <thead>
                              <tr>
                                <th>Resultat par periode</th>
                                <th>Code resultat</th>
                                <th>Nom</th>
                                <th>Resultat test</th>
                                <th>Description</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <select
                                    className="form-control"
                                    value={selected2}
                                    onChange={(e) =>
                                      setSelected2(e.target.value)
                                    }
                                  >
                                    {options.map((value) => (
                                      <option value={value} key={value}>
                                        {value}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>123-12</td>
                                <td>Diabethe</td>
                                <td>positif</td>
                                <td>Taux de sucre à 1.7 dans le sang</td>
                                <td>12/10/20212</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
            <Link to='/listepatient' className="btn btn-primary">Retour </Link>
          </div>
        </div>
      </div>
      
    </Fragment>
  );
};

export default DetailPatient;
