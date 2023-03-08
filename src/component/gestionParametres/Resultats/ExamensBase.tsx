import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { notification } from "../../../Utils/Utils.tsx";
import callApi from "../../../Utils/Utils.tsx";

import Examen from "../Examen.tsx";

export default function ExamensBase(props) {
  const [showFicheResult, setShowFicheResult] = useState(false);
  const [loadingGetInfosFiche, setLoadingGetInfosFiche] = useState(false);
  const [status, setStatus] = useState([]);
  const [statusExamen, setStatusExamen] = useState([]);
  const [listExamens, setListExamens] = useState([]);
  const [selectedExamen, setSelectedExamen] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [loadingTerminateExam, setLoadingTerminateExam] = useState(false);
  const [loadingSaveModifications, setLoadingSaveModifications] =
    useState(false);
  const [dataExamens, setDataExamens] = useState([]);
  const [generalStatus, setGeneralStatus] = useState("");
  const [onreloadData, setOnreloadData] = useState("");

  async function editResult(data) {
    console.log(data);
    setSelectedExamen(data);
    setShowFicheResult(true);
    setLoadingGetInfosFiche(true);
    let id = data.matricule;
    let response = await callApi(true, `examens/${id}`, "get", null);
    setLoadingGetInfosFiche(false);

    if (response.data.success) {
      setListExamens(response.data.dataetype);
      setDataExamens(response.data.dataexam);
      setGeneralStatus(response.data.dataexam.idstatusresult);
    }
    console.log(response.data);
  }

  function handleChange(value, index, key) {
    setListExamens((state: any) => {
      return state.map((item: any) => {
        if (item.codetype === index) {
          return { ...item, [key]: value };
        } else return item;
      });
    });

    console.log(" data ", listExamens);
  }

  async function getStatusResul() {
    let response = await callApi(true, `statusresultat`, "get", null);

    if (response.data.success) {
      console.log(response.data);
      let status = response.data.data;

      setStatus(status);
    }
  }
  async function getStatusExamen() {
    let response = await callApi(true, `statusexamen`, "get", null);

    if (response.data.success) {
      console.log(response.data);
      let status = response.data.data;

      setStatusExamen(status);
    }
  }

  async function change_general_status(e) {
    let value = e.target.value;
    setGeneralStatus(value);
    console.log(value);

    let response = await callApi(
      true,
      `statusexamenresultat/${selectedExamen.matricule}/${value}`,
      "get",
      null
    );

    if (response.data.success) {
      notification("success", "Status d'examen modifié avec success");
    } else
      notification(
        "error",
        "Désolé nous n'avons pas pu mettre a jour le resultat de l'examen"
      );
  }

  async function terminate_exam() {
    setLoadingTerminateExam(true);

    let status = statusExamen.find((item) => item.libelle === "terminer");

    let response = await callApi(
      true,
      `statusexamen/${selectedExamen.matricule}/${status?.id}`,
      "get",
      null
    );
    setLoadingTerminateExam(false);

    if (response.data.success) {
      setShowAlert(false);
      notification("success", "Examen marqué comme terminé avec success");
    } else notification("error", "Une erreur est survenu veuillez réessayer");
  }

  async function save_exam_modifiaction() {
    let data_to_send = listExamens.map((item: any) => {
      return {
        codetype: item.codetype,
        statutresultat: item.idcodestatut,
        description: item.descriptionresultat,
        codeexamen: selectedExamen.matricule,
      };
    });

    setLoadingSaveModifications(true);
    let response = await callApi(true, `postexamenresultattype`, "post", null, {
      datas: data_to_send,
    });
    console.log(" data to send  ", data_to_send);
    setLoadingSaveModifications(false);

    if (response.data.success) {
      setOnreloadData(String(Math.random()));
      setShowFicheResult(false);
      notification("success", "informations modifiés avec succes");
    } else notification("error", "Une erreur est survenu veuillez réessayer");
  }
  useEffect(() => {
    getStatusResul();
    getStatusExamen();
  }, []);
  return (
    <>
      <Examen editResult={editResult} onreloadData={onreloadData} />

      <Modal
        show={showFicheResult}
        onHide={() => setShowFicheResult(false)}
        backdrop="static"
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Reporter les résultats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-end">
            <div className="col">
              <div className="btn btn-danger fw-bold rounded ">
                <Button
                  disabled={dataExamens.statusexamen === "terminer"}
                  variant="danger"
                  title="Cette opération est iréversible"
                  onClick={() => setShowAlert(true)}
                >
                  <strong>Marquer comme terminé</strong>
                </Button>
              </div>
            </div>
            <div className="col-4">
              Status Général
              <select
                className="form-control"
                disabled={dataExamens.statusexamen === "terminer"}
                value={generalStatus}
                onChange={(e) => change_general_status(e)}
              >
                <option value={""}> choisissez le résultat </option>
                {status.map((item: any) => (
                  <option value={item.id} key={item.id}>
                    {item.libelle}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <hr />
          {loadingGetInfosFiche ? (
            <div className="row justify-content-center">
              <div className="col-6 text-center">
                <Spinner animation="border" />
              </div>
            </div>
          ) : (
            <>
              <div className="text-primary">
                {listExamens.map((examen: any, index: number) => {
                  return (
                    <div className="row my-5 p-4">
                      <div className="col">
                        examen: <strong>{examen.nom}</strong>
                        {/* <hr /> */}
                        <Form.Control
                          disabled={dataExamens.statusexamen === "terminer"}
                          as="textarea"
                          rows={3}
                          value={listExamens[index].descriptionresultat}
                          onChange={(e) =>
                            handleChange(
                              e.target.value,
                              examen.codetype,
                              "descriptionresultat"
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div className="col-4">
                        status
                        {/* <hr /> */}
                        <select
                          className="form-control"
                          disabled={dataExamens.statusexamen === "terminer"}
                          value={listExamens[index].idcodestatut}
                          onChange={(e) =>
                            handleChange(
                              e.target.value,
                              examen.codetype,
                              "idcodestatut"
                            )
                          }
                        >
                          <option value={""}> choisissez le résultat </option>
                          {status.map((item: any) => (
                            <option value={item.id} key={item.id}>
                              {item.libelle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row">
                <div className="col-sm-10 col-6 ">
                  <Button
                    className="mx-5"
                    variant="danger"
                    onClick={save_exam_modifiaction}
                  >
                    Annuler
                  </Button>
                </div>
                <div className="col text-end ">
                  <Button
                    className="text-end ml-5"
                    variant="primary"
                    onClick={save_exam_modifiaction}
                  >
                    {loadingSaveModifications ? (
                      <span>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Chargement...
                      </span>
                    ) : (
                      "Enregistrer"
                    )}
                  </Button>
                </div>
              </div>

              <Modal
                size="sm"
                show={showAlert}
                onHide={() => setShowAlert(false)}
                className="my_danger_bg"
              >
                <Modal.Header closeButton>
                  <Modal.Title> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5 className="">
                    Voulez vous vraiment marquer comme terminé cet examen cette
                    action est iréversible et vous ne pourrez plus modifier les
                    informations de cet examen
                  </h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowAlert(false)}
                  >
                    Annuler
                  </Button>
                  <Button variant="danger" onClick={terminate_exam}>
                    {loadingTerminateExam ? (
                      <span>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Chargement...
                      </span>
                    ) : (
                      "Valider"
                    )}
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
