import React, { Fragment } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils.tsx";
import Navbar from "../layout/Navbar.tsx";
import Sidebar from "../layout/Sidebar.tsx";
import callApi from "../../Utils/Utils.tsx";
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
import { getAppToken } from "../login/Utils.tsx";
//import events from './events.tsx'
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { object } from "yup";
import { readv } from "fs";

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  show: boolean;
  show2: boolean;
  show3: boolean;
  Rdv: [];
  id: number;
  type: string;
  employe: [];
  patient: [];
  titre: string;
  datedebut: string;
  datefin: string;
  heurdebut: string;
  heurfin: string;
  description: string;
  classid: number;
  employecode: string;
  clientcode: string;
  matriculelabor: string;
  event: [];
  selectInfo: any;
  allEnvents: any;
  showCalendar: boolean;
  employeLaboratoire: any;
  showDetailAgenda: boolean;
  selectRdv: any;
  mat: string;
  matagence:string
}

export default class Agenda extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    show: false,
    show2: false,
    show3: false,
    Rdv: [],
    id: 0,
    type: "",
    employe: [],
    patient: [],
    titre: "",
    datedebut: "",
    datefin: "",
    heurdebut: "",
    heurfin: "",
    description: "",
    classid: 0,
    employecode: "",
    clientcode: "",
    matriculelabor: "",
    matagence:"",
    event: [],
    selectInfo: {},
    allEnvents: [
      {
        id1: createEventId(),
        title: "All-day event",
        date: new Date().toISOString().replace(/T.*$/, ""),
        name: "jjjdjd",
      },
      {
        id1: createEventId(),
        title: "Timed event",
        date: new Date().toISOString().replace(/T.*$/, "") + "T20:00:00",
        name: "test",
      },
    ],
    showCalendar: true,
    employeLaboratoire: [],
    showDetailAgenda: false,
    selectRdv: {},
    mat: "",
  };

  handleClose = () => this.setState({ show: false });

  handleClose2 = () => {
    this.setState({ show2: false });
  };
  //pour modification debut
  handleClose3 = () => {
    this.setState({ show3: false });
  };

  //pour modification debut

  handleCloseShowDetail = () => this.setState({ showDetailAgenda: false });

  //pour modification debut
  handleShow3 = async () => {
    let { selectRdv } = this.state;
    console.log(" --- ", selectRdv);

    let response = await callApi(true, `agenda/${selectRdv.code}`, "get", null);

    let rdv_infos = response.data.data;

    this.setState({
      titre: rdv_infos.titre,
      description: rdv_infos.description2,
      employecode: rdv_infos.codeemploye,
      clientcode: rdv_infos.codeclient,
      classid: rdv_infos.class,
      datedebut: rdv_infos.datedebut?.split(" ")[0],
      datefin: rdv_infos.datefin?.split(" ")[0],
      heurdebut: rdv_infos.datedebut?.split(" ")[1],
      heurfin: rdv_infos.datefin?.split(" ")[1],
    });

    console.log(" response get ag by code ---- ", rdv_infos);

    this.setState({ showDetailAgenda: false });
    this.setState({ show3: true });
  };

  //pour modif fin

  handleShow2 = () => {
    this.setState({ showDetailAgenda: false });
    this.setState({ show2: true });
  };

  handleShow = (selectInfo: any) => {
    this.setState({ show: true, selectInfo: selectInfo });
  };

  onShowTypeCalendar = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);
      localStorage.setItem("Apitoken", token);

      let response = await callApi(true, "typeagenda", "get", null);
      if (response.data.success) {
        let datas = response.data.data;
        this.setState({ Rdv: datas });
        console.log("agenda", this.state.Rdv);
      }

      this.state.Rdv.map((item: any) => {
        this.setState({ classid: item.id, type: item.libelle });
        //  console.log('type',  item.libelle)
        //  console.log('id',  item.id)
      });
    }
  };

  handleShowRdv = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "agenda", "get", null);
      if (response.data.success) {
        this.setState({});
        //localStorage.getItem( response.data.data.email)
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

  handleShowEmploye = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "employe", "get", null);

      if (response.data.success) {
        //notification('success', response.data.message)
        console.log(response.data.data);
        let Employes = response.data.data;
        this.setState({ employe: Employes });
        Employes.map((item: any) => {
          this.setState({ employecode: item.matricule });
        });
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

  handleListEmployeAgenda = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, `empservagenda/${this.state.matriculelabor}/${this.state.matagence}`, "get", null);

      if (response.data.success) {
        this.setState({ employeLaboratoire: response.data.data });
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

  handleChangeListEmploye = async (e: any) => {
    let token = await getAppToken();
    if (token) {
      console.log(token);
      let code = e.target.value;
      localStorage.setItem("Apitoken", token);
      if (code === "all") {
        this.getAllEvents();
      } else {
        let data = {
          employecode: code,
        };
        let response = await callApi(true, "agendaemp", "post", null, data);

        console.log("agendalist", response.data.data);

        if (response.data.success) {
          let agendas = response.data.data;

          let tampo: any = [];
          agendas.forEach((element, index) => {
            let obj = { ...element, id: index, allDay: true };
            tampo.push(obj);
          });

          this.setState({ allEnvents: tampo, showCalendar: false });
          setTimeout(() => {
            this.setState({ showCalendar: true });
          }, 10);
        } else {
          notification(
            "error",
            formatData(response.data.data) === ""
              ? response.data.message
              : formatData(response.data.data)
          );
        }
      }
    }
  };

  handleShowPatient = async () => {
    let token = await getAppToken();
    if (token) {
      // console.log(token)

      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "client", "get", null);
      if (response.data.success) {
        //notification('success', response.data.message)
        console.log(response.data.data);
        let Patients = response.data.data;
        this.setState({ patient: Patients });
        Patients.map((item: any) => {
          //this.setState({ clientcode: item.matricule });
        });
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

  inituserMat = () => {
    let users: any = localStorage.getItem("matriculeLabo");
    let matagence: any = localStorage.getItem("matriculeAgence");
    this.setState({ matriculelabor: users });
    this.setState({ matagence: matagence })
    
  };

  handleCreateRdv = async (e: any) => {
    // setReload(true)
    //let selectInfo: DateSelectArg =[]
    //let calendarApi = selectInfo.view.calendar
    
    const {
      titre,
      datedebut,
      heurdebut,
      datefin,
      heurfin,
      description,
      classid,
      employecode,
      clientcode,
      matriculelabor,
    } = this.state;

    
    
    e.preventDefault();
    let registerRdv = {
      titre: titre,
      datedebut: datedebut + " " + heurdebut,
      datefin: datefin + " " + heurfin,
      description: description,
      classid: classid,
      employecode: employecode,
      clientcode: clientcode,
      matriculelabor: matriculelabor,
    };
    // let {selectInfo}=this.state
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title:titre,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    //   console.log('tttt', registerRdv)
    //return
    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "agenda", "post", null, registerRdv);
      console.log(response);

      if (response?.data?.success) {
        let tampo = this.state.allEnvents;
        tampo.push({
          id: response.data.id,
          title: titre,
          start: datedebut,
          end: datefin,
          allDay: true,
        });
        this.setState({ allEnvents: tampo, showCalendar: false });
        console.log(this.state.allEnvents);
        setTimeout(() => {
          this.setState({ showCalendar: true });
        }, 10);
        // setReload(false)
        this.setState({ show: false });
        this.getAllEvents();
        notification("success", response.data.message);

        // window.location.reload();
        // calendarApi.addEvent({
        //   id: createEventId(),

        //   start: datedebut,
        //   end: datefin,
        //   allDay: selectInfo.allDay
        // })
      } else {
        notification("error", "une erreur inatendu est survenue");
        //setReload(false)
      }
    }

    console.log("client", registerRdv);
  };

  getAllEvents = async () => {
    let token = await getAppToken();
    if (token) {
      console.log(token);

      localStorage.setItem("Apitoken", token);
      this.setState({ showCalendar: false });
      let response = await callApi(true, `agendas/${this.state.matriculelabor}`, "get", null, null);
      if (response?.data?.success) {
        let dataReceive = response.data.data;
        let tampo: any = [];
        dataReceive.forEach((element, index) => {
          let obj = { ...element, id: index, allDay: true };
          tampo.push(obj);
        });
        this.setState({ allEnvents: tampo });
        this.setState({ showCalendar: true });
      }
    }
  };

  handleSupprimerRdv = async (e: any) => {
    e.preventDefault();
    let pathname = window.location.pathname;
    let id = pathname.split("/")[2];
    const { mat } = this.state;
    let token = await getAppToken();
    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, `agenda/${mat}`, "delete", null);

      if (response?.data?.success) {
        this.getAllEvents();
        this.setState({show2: false})
        notification("success", response.data.message);

      } else {
        notification("error", formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data));
      }
    }
  };

  handleModify = async (e: any) => {
    let user: any = JSON.parse(localStorage.getItem("user") || "");

    let {
      mat,
      titre,
      description,
      employecode,
      clientcode,
      classid,
      datedebut,
      datefin,
      heurdebut,
      heurfin,
    } = this.state;
    e.preventDefault();
    let modifyRdv = {
      titre: titre,
      description: description,
      employecode: employecode,
      clientcode: clientcode,
      classid: classid,
      datedebut: datedebut + " " + heurdebut,
      // heurdebut: heurdebut + " "+heurfin ,
      datefin: datefin + " " + heurfin,
      matriculelabor: user.matricule_labo,
      // heurfin: heurfin,
    };

    console.log(" data to modif -- ", modifyRdv);

    let token = await getAppToken();

    if (token) {
      //console.log(token)

      localStorage.setItem("Apitoken", token);
      let response = await callApi(
        true,
        `agenda/${mat}`,
        "put",
        null,
        modifyRdv
      );
      console.log(response);

      if (response?.data?.success) {
        notification("success", response.data.message);
        this.getAllEvents();
        
        this.setState({ show3: false });
      } else {
        notification("error", formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data));
      }
    }
  };

  componentDidMount(): void {
    this.getAllEvents();
    this.handleShowRdv();
    this.onShowTypeCalendar();
    this.handleShowEmploye();
    this.handleShowPatient();
    this.inituserMat();
    
    this.handleListEmployeAgenda();
  }

  render() {
    const { show } = this.state;
    const {
      titre,
      datedebut,
      heurdebut,
      datefin,
      heurfin,
      description,
      classid,
      employecode,
      clientcode,
      matriculelabor,
      showDetailAgenda,
      selectRdv,
      show2,
      show3,
    } = this.state;
    return (
      <Fragment>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Créer un nouveau rendez-vous</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleCreateRdv}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  value={titre}
                  onChange={(e) => this.setState({ titre: e.target.value })}
                  placeholder="examen"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Form.Group>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom laborantin</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e: any) =>
                        this.setState({ employecode: e.target.value })
                      }
                    >
                      <option value={this.state.employecode} >
                          Selectionner un laborantin
                        </option>
                      {this.state.employeLaboratoire.map((value: any) => (
                        <option value={value.code} key={value.code}>
                          {value.nom}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom patient</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e: any) =>
                        this.setState({ clientcode: e.target.value })
                      }
                    >
                      <option value={this.state.clientcode} >
                          Selectionner un patient
                        </option>
                      {this.state.patient.map((value:any)=>{
                         if(this.state.matriculelabor===value.matricule_labo){
                          return(
                            <option value={value.matricule} key={value.matricule}>
                          {value.nom}
                        </option>
                          )
                         }
                      })}
                      
                    </select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>type rendez-vous</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e: any) =>
                        this.setState({ classid: e.target.value })
                      }
                    >
                      {this.state.Rdv.map((value: any) => {
                        return (
                          <option value={value.id} key={value.classid}>
                            {value.libelle}
                          </option>
                        );
                      })}
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date de debut</Form.Label>

                    <Form.Control
                      type="date"
                      placeholder="date debut"
                      value={datedebut}
                      onChange={(e: any) =>
                        this.setState({ datedebut: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date de fin</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="date fin"
                      value={datefin}
                      onChange={(e: any) =>
                        this.setState({ datefin: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>heure de debut</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="heurdebut"
                      value={this.state.heurdebut}
                      onChange={(e: any) =>
                        this.setState({ heurdebut: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>

                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>heure de fin</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="heurfin"
                      value={this.state.heurfin}
                      onChange={(e: any) =>
                        this.setState({ heurfin: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <span></span>
                </Col>
                <Col xs={6} md={6}>
                  <span></span>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginLeft: "60%" }}
                  >
                    Enregistrer
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="danger" onClick={this.handleClose}>
            Annuler
          </Button> */}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showDetailAgenda}
          onHide={this.handleCloseShowDetail}
          backdrop="static"
          size="lg"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Informations d'un rendez-vous</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col">
              <div className="row">
                <div className="col-12 mt-5">Titre:{selectRdv.title}</div>
                <div className="col-12 mt-2">
                  Description :{selectRdv.description}{" "}
                </div>
                <div className="col-12 mt-2">Debut : {selectRdv.start}</div>
                <div className="col-12 mt-2">Fin : {selectRdv.end}</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col xs={6} md={4}>
                <Button
                  variant="danger"
                  className="mb-3"
                  onClick={this.handleShow2}
                >
                  Supprimer
                </Button>
              </Col>

              <Col xs={6} md={4}>
                <Button
                  variant="primary"
                  className="mb-3"
                  onClick={this.handleShow3}
                >
                  Modifier
                </Button>
              </Col>

              <Col xs={6} md={4} style={{ justifyContent: "space-between" }}>
                <Button
                  variant="danger"
                  className="mb-3"
                  onClick={this.handleCloseShowDetail}
                >
                  Fermer
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show2}
          onHide={this.handleClose2}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Etes-vous sûr de vouloir supprimer ce rendez-vous ?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleSupprimerRdv}>
              Oui
            </Button>
            <Button variant="primary" onClick={this.handleClose2}>
              Non
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show3}
          onHide={this.handleClose3}
          backdrop="static"
          size="lg"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              Modifier les Informations d'un utilisateur
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleModify}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  value={titre}
                  onChange={(e) => this.setState({ titre: e.target.value })}
                  placeholder="examen"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Form.Group>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom laborantin</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e: any) =>
                        this.setState({ employecode: e.target.value })
                      }
                    >
                      {this.state.employeLaboratoire.map((value: any) => (
                        <option value={value.code} key={value.code}>
                          {value.nom}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nom patient</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e: any) =>
                        this.setState({ clientcode: e.target.value })
                      }
                    >
                      <option value={this.state.clientcode} >
                          Selectionner un patient
                        </option>
                      {this.state.patient.map((value:any)=>{
                        if(this.state.matriculelabor===value.matricule_labo){
                          return(
                            <option value={value.matricule} key={value.matricule}>
                            {value.nom}
                          </option>
                          )
                        }
                      })}
                      
                    </select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>type rendez-vous</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e: any) =>
                        this.setState({ classid: e.target.value })
                      }
                    >
                      {this.state.Rdv.map((value: any) => {
                        return (
                          <option value={value.id} key={value.classid}>
                            {value.libelle}
                          </option>
                        );
                      })}
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date de debut</Form.Label>

                    <Form.Control
                      type="date"
                      placeholder="date debut"
                      value={datedebut}
                      onChange={(e: any) =>
                        this.setState({ datedebut: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date de fin</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="date fin"
                      value={datefin}
                      onChange={(e: any) =>
                        this.setState({ datefin: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>heure de debut</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="heurdebut"
                      value={this.state.heurdebut}
                      onChange={(e: any) =>
                        this.setState({ heurdebut: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>

                <Col xs={6} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>heure de fin</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="heurfin"
                      value={this.state.heurfin}
                      onChange={(e: any) =>
                        this.setState({ heurfin: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Enregistrer
                </Button>
                <Button variant="danger" onClick={this.handleClose3}>
                  Annuler
                </Button>
              </Modal.Footer>
              {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        <Navbar />
        <Sidebar />
        <div
          className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
          id="kt_content"
        >
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
            id="kt_content"
          >
            <div className="kt-subheader   kt-grid__item" id="kt_subheader">
              <div className="kt-container  kt-container--fluid ">
                <div className="kt-subheader__main">
                  <h3 className="kt-subheader__title">
                    Calendrier Laboratoire
                  </h3>

                  <span className="kt-subheader__separator kt-hidden"></span>
                  <div className="kt-subheader__breadcrumbs">
                    <a className="kt-subheader__breadcrumbs-home">
                      <i className="flaticon2-shelter"></i>
                    </a>
                    <span className="kt-subheader__breadcrumbs-separator"></span>
                    <a className="kt-subheader__breadcrumbs-link">Etendu </a>
                    <span className="kt-subheader__breadcrumbs-separator"></span>
                    <a className="kt-subheader__breadcrumbs-link">
                      Calendrier{" "}
                    </a>
                    <span className="kt-subheader__breadcrumbs-separator"></span>
                    <a className="kt-subheader__breadcrumbs-link">
                      Laboratoire{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="kt-portlet" id="kt_portlet">
                    <div className="kt-portlet__head kt-portlet__head--lg">
                      <div className="kt-portlet__head-label">
                        <span className="kt-portlet__head-icon">
                          <i className="flaticon-map-location"></i>
                        </span>
                        <h3 className="kt-portlet__head-title">
                          Calendrier Basique
                        </h3>
                      </div>
                      <div className="kt-portlet__head-toolbar">
                        <div className="kt-portlet__head-group mx-2">
                          <select
                            name=""
                            id=""
                            className="form-control"
                            onChange={this.handleChangeListEmploye}
                          >
                            <option value={"all"}>Tous les rendez-vous</option>

                            {this.state.employeLaboratoire.map((item) => {
                              return (
                                <option value={item.code}>{item.nom}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="kt-portlet__head-group">
                          <button
                            type="button"
                            className="btn btn-brand"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={this.handleShow}
                          >
                            <i className="la la-plus"></i> Ajouter un Evenement
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="demo-app">
                      <div className="demo-app-main">
                        {this.state.showCalendar ? (
                          <FullCalendar
                            plugins={[
                              dayGridPlugin,
                              timeGridPlugin,
                              interactionPlugin,
                            ]}
                            headerToolbar={{
                              left: "prev,next today",
                              center: "title",
                              right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={this.state.weekendsVisible}
                            //initialEvents={INITIAL_EVENTS}
                            // alternatively, use the `events` setting to fetch from a feed
                            select={this.handleDateSelect}
                            // eventContent={renderEventContent} // custom render function
                            eventClick={this.handleEventClick}
                            eventsSet={this.handleEvents}
                            events={this.state.allEnvents}
                            // called after events are initialized/added/changed/removed
                            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  renderSidebar() {}

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log("selectinf", selectInfo);
    this.handleShow(selectInfo);
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    /* if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }*/
  };

  handleEventClick = ({ event }) => {
    // openAppointment is a function I wrote to open a form to edit that appointment
    console.log(" handleEventClick ", event);
    //initialisation pour la suppression en fonction du code du rdv debut
    const { mat } = this.state;
    //initialisation pour la suppression en fonction du code du rdv fin
    let rdv = this.state.allEnvents[event.id];
    //pour la suppression en fonction du code du rdv debut
    this.setState({ mat: rdv.code });
    //pour la suppression en fonction du code du rdv fin
    this.setState({ selectRdv: rdv });
    this.setState({ showDetailAgenda: true });
    this.setState({ show2: false });
    this.setState({ show1: false });
    //this.props.openAppointment(event.extendedProps)
  };

  handleEventDrop = (info) => {
    if (window.confirm("Are you sure you want to change the event date?")) {
      console.log("change confirmed");

      // updateAppointment is another custom method
      this.props.updateAppointment({
        ...info.event.extendedProps,
        start: info.event.start,
        end: info.event.end,
      });
    } else {
      console.log("change aborted");
    }
  };

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventContent: any) {
  return (
    <>
      <b>{eventContent.date}</b>
      <i>{eventContent.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i className="fc-event-success">{event.title}</i>
    </li>
  );
}
