import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PatientTable } from "../tables/Table.tsx";
import { useDispatch, useSelector } from "react-redux";
import { listPatientThunk } from "../../features/patientSlice.ts";
import ReactPaginate from "react-paginate";
import { patientStatus } from "../../features/patientSlice.ts";

interface PatientInterface {
  matricule: string,
  nom: string,
  prenom: string,
  telephone: string,
  created_at: string,
}

export function ListPatients({ accueil }) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient);
  const user = JSON.parse(localStorage.getItem("user") || "");
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [showAll, setShowAll] = useState<Boolean>(true);


  const [itemsPerPage, setItemsPerPage] = useState<number>(
    showAll ? patient?.data?.length : 10
  );
  const pagevisited = pageNumber * itemsPerPage;
  const itemsToPaginate = patient?.data
  const pageCount = Math.ceil(itemsToPaginate?.length / itemsPerPage);

  function handlePagination({ selected }) {
    setPageNumber(selected)
  }

  async function fetchPatient() {
    try {
      const response = await dispatch(
        listPatientThunk(
          user?.matricule_labo
        )
      ).unwrap();

    } catch (error) {

    }
  }

  function returnPatient(data: []) {
    if (accueil) {
      return patient?.data.filter(item => item.state === 1)
    } else {
      return patient?.data
    }
  }

  function itemsToDisplay(data: []) {
    if (showAll) {
      return data
    } else {
      return data?.slice(
        pagevisited, pagevisited + itemsPerPage
      )
    }
  }

  function handleFilter(data: []) {
    const queryTolowerCase = query.toLowerCase();
    return data?.filter(
      (item: PatientInterface) =>
        item?.matricule?.toLowerCase().includes(queryTolowerCase) ||
        item?.nom
          ?.toLocaleString()
          .toLowerCase()
          .includes(queryTolowerCase) ||
        item?.prenom?.toLowerCase().includes(queryTolowerCase)
    );
  }

  return (
    <div className="list-patients">
      <div className="feature-title">
        {/* <h4 className="title">Liste des patients</h4> */}
        {itemsToPaginate?.length > 0 &&
          <div className="pagination-container">
            <label htmlFor="list-paginate" className="list-paginate">
              <span>Afficher</span>
              <select id="list-paginate"
                className="select-list-paginate"
                onChange={(event) => {
                  if (event?.target?.value === "all") {
                    setShowAll(true);
                    setItemsPerPage(itemsToPaginate?.length)
                  } else {
                    setShowAll(false)
                    setItemsPerPage(parseInt(event.target.value))
                  }
                }}
              >
                <option defaultValue="all" value="all">Tout</option>
                <option value="10">10</option>
              </select>
            </label>
            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              onPageChange={handlePagination}
              containerClassName="pagination-content"
              previousLinkClassName={"previous-btn"}
              nextLinkClassName={"next-btn"}
              disabledClassName={"pagination-disabled"}
              activeClassName={"pagination-active"}
              pageClassName="pagination-item"
              breakLabel="..."
            />
          </div>
        }
        <div className="search-box">
          <input
            type="text"
            id="search-exam-type"
            className="search-field"
            placeholder="Recherche rapide"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="btn-group">
          {(user?.nomservice === "accueil" || user?.nomservice === "it") &&
            <Link to="/patients/add" className="btn-link-green">
              <span>Ajouter un patient</span> <FaPlus />
            </Link>
          }
        </div>
      </div>
      <div className="patients">
        <PatientTable data={itemsToDisplay(handleFilter(returnPatient(patient?.data)))} />
      </div>
    </div>
  );
}
