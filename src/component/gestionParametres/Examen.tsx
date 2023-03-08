import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar.tsx";
import Sidebar from "../layout/Sidebar.tsx";
import { getAppToken } from "../login/Utils.tsx";
import callApi from "../../Utils/Utils.tsx";
import { notification } from "../../Utils/Utils.tsx";
import ReactPaginate from "react-paginate";
import "../GestionUtilisateur/pagination.css";
import PaginationBasic from "../Tools/PaginationBasic.tsx";

const Examen = (props) => {
  const { status_to_display, onreloadData } = props;
  const [numberPerPage, setNumberPerPage] = useState(10);
  const [total, setTotal] = useState(1);
  const [listExam, setListExam]=useState([])
  const [exam, setExam] = useState([]);
  const [initialExam, setInitialExam] = useState([]);
  const [initialExams, setInitialExams] = useState([]);
  const [filterExams, setFilterExams] = useState([]);



  const onShowPatientExamen = async () => {
    let token = await getAppToken();

    if (token) {
      localStorage.setItem("Apitoken", token);
      let response = await callApi(true, "examens", "get", null);
      let examen = response.data.data;

      setTotal(Math.ceil(examen.length / numberPerPage));
            setInitialExam(examen);
            setExam(examen);
            start_filter(examen);
            setInitialExams(examen);
            setListExam( examen);
            setFilterExams(examen)
    }
  };

  const handleSearch = (e) => {
    let key = e.target.value;
    if(key==""){
     
      setFilterExams(initialExam)
      start_filter(initialExam)


    }else {

      let newData = initialExam.filter(
        (ListExam) =>
        ListExam.nom?.toLowerCase().includes(key)
      );

      setFilterExams(newData);
      start_filter(newData)

      
    }
  };

  function start_filter(examen) {
    let filtre = examen.slice(0, 10);
    setListExam(filtre);
  }
  const [matricule_laboSession,setMatricule_laboSession]=useState("")
  let sessionMatlabo: any;
  const inituserLab = () => {
      let users: any = localStorage.getItem("user");
      let user: any = JSON.parse(users);
      setMatricule_laboSession(user.matricule_labo);
      sessionMatlabo = user.matricule_labo;
      console.log("mat", sessionMatlabo);
      
    };
   //------- pagination debut------//
   function changeData(page) {
    //console.log("pageReçue", page);
    let filtre = filterExams.slice( (page - 1) * numberPerPage, page * numberPerPage);
    setListExam(filtre);
  }

  function prenext(cas, page) {

    if (cas === "next") {
      let filtre = filterExams.slice((page - 1) * numberPerPage,page * numberPerPage);
      setListExam(filtre);

    } else if (cas === "prev") {

      let filtre = filterExams.slice((page - 1) * numberPerPage,page * numberPerPage);
      setListExam(filtre);
    }
  }
  function firstlas(cas, page) {
    if (cas === "last") {
      let filtre = filterExams.slice((page - 1) * numberPerPage,page * numberPerPage);
      setListExam(filtre);
    } else if (cas === "first") {
      let filtre = filterExams.slice((page - 1) * numberPerPage,page * numberPerPage);
      setListExam(filtre);
    }
  }
  //------------pagination end------//

 
  
  useEffect(() =>{

    setTotal(Math.ceil(filterExams.length / 10));

  }, [filterExams])


  useEffect(() => {
    onShowPatientExamen();
    inituserLab()
  }, [onreloadData]);

  return (
    <Fragment>
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
            className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
            id="kt_content"
          ></div>
          <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="kt-portlet kt-portlet--mobile">
              <div className="kt-portlet__head kt-portlet__head--lg">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">
                    Liste des Examens
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
                        {/* <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                <button className='btn btn-primary' style={{marginLeft: "100px"}} >Créer une famille d'Examen</button>
              </div> */}
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
                        <th className="kt-datatable__cell kt-datatable__toggle-detail">
                          <span></span>
                        </th>
                        <th
                          data-field="id"
                          className="kt-datatable__cell--center kt-datatable__cell kt-datatable__cell--check"
                        >
                          <span style={{ width: "20px" }}>
                            <label className="kt-checkbox kt-checkbox--single kt-checkbox--all kt-checkbox--solid">
                              <input type="checkbox" />
                              &nbsp;<span></span>
                            </label>
                          </span>
                        </th>
                        {/* <th data-field="employee_id" className="kt-datatable__cell kt-datatable__cell--sort">
                    <span style={{width: "110px"}}>Code</span>
                  </th> */}
                        <th
                          data-field="name"
                          className="kt-datatable__cell kt-datatable__cell--sort"
                        >
                          <span style={{ width: "110px" }}>Code Examen</span>
                        </th>
                        <th
                          data-field="name"
                          className="kt-datatable__cell kt-datatable__cell--sort"
                        >
                          <span style={{ width: "110px" }}>Nom patient</span>
                        </th>
                        <th
                          data-field="name"
                          className="kt-datatable__cell kt-datatable__cell--sort"
                        >
                          <span style={{ width: "110px" }}>Statut Examen</span>
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

                    <tbody className="kt-datatable__body" style={{}}>
                      {listExam.length > 0 &&
                        listExam.map((key: any) => {
                          if (key.matricule_labo === matricule_laboSession) {
                            return (
                            ((status_to_display &&
                              status_to_display === key.statusexamen) ||
                              !status_to_display) && (
                              <tr
                                data-row="0"
                                className="kt-datatable__row"
                                style={{ left: "0px" }}
                              >
                                <td className="kt-datatable__cell kt-datatable__toggle-detail">
                                  <a
                                    className="kt-datatable__toggle-detail"
                                    href=""
                                  >
                                    <i className="fa fa-caret-right"></i>
                                  </a>
                                </td>
                                <td
                                  className="kt-datatable__cell--center kt-datatable__cell kt-datatable__cell--check"
                                  data-field="id"
                                >
                                  <span style={{ width: "20px" }}>
                                    <label className="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                      <input type="checkbox" value="1" />
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
                                  data-field="employee_id"
                                  className="kt-datatable__cell"
                                >
                                  <span style={{ width: "110px" }}>
                                    {key.nom}
                                  </span>
                                </td>
                                <td
                                  data-field="name"
                                  className="kt-datatable__cell"
                                >
                                  <span
                                    style={{
                                      width: "110px",
                                      cursor: "pointer",
                                    }}
                                    title="cliquer pour voir liste des types d'examen"
                                  >
                                    {key.statusexamen}
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
                                    <div
                                      className="dropdown "
                                      data-placement="top"
                                    >
                                      {status_to_display ? (
                                        <div
                                          title="Imprimer cet Examen"
                                          className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                          onClick={() => props.print(key, true)}
                                        >
                                          <i
                                            className="fa fa-print"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                      ) : (
                                        // <i className="far fa-print text-primary"></i>
                                        <Link
                                          title=" Voir les types d'examen"
                                          to={`/examenpatientDetail/${key.matricule}`}
                                          className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                        >
                                          <i className="far fa-eye text-primary"></i>
                                        </Link>
                                      )}
                                    </div>

                                    {status_to_display ? (
                                      ""
                                    ) : (
                                      <a
                                        title="Reporter  le resultat d'un examen"
                                        className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                        onClick={() => props.editResult(key)}
                                      >
                                        <i className="fas fa-pencil-alt text-success"></i>
                                      </a>
                                    )}

                                    {/* <a title="Supprimer un examen" className="btn btn-sm btn-clean btn-icon btn-icon-md" >
                                      <i className="la la-trash over text-danger"></i>
                                    </a> */}
                                  </span>
                                </td>
                              </tr>
                            )
                          );
                          }
                          
                        })}
                    </tbody>

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
                  firstlas={firstlas}/>
              {/*appel du fichier ou on a fait la pagination fin */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Examen;
