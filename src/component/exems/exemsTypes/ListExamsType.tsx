import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ExamsTypeTable } from "../../tables/Table.tsx";
import { showModalReducer } from "../../../features/modalSlice.ts";
import { CreateExamType } from "./CreateExamType.tsx";
import { listExamTypeThunk } from "../../../features/examTypeSlice.ts";
import ReactPaginate from "react-paginate";
import { UpdateExamType } from "./UpdateExamType.tsx";


interface ExamsType {
  matricule: number;
  nom: string;
  prix: string;
  duree: number;
  valeurn: string;
}

export const ListExamsType = () => {
  const examType = useSelector(state => state.examType);
  const user = JSON.parse(localStorage.getItem("user") || "")
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [showAll, setShowAll] = useState<Boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    showAll ? examType?.length : 10
  );
  const pagevisited = pageNumber * itemsPerPage;
  const itemsToPaginate = examType?.data
  const pageCount = Math.ceil(itemsToPaginate?.length / itemsPerPage);

  function handlePagination({ selected }) {
    setPageNumber(selected)
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

  function handleOpenModal() {
    dispatch(showModalReducer({
      header: "Ajouter un type d'examen",
      body: <CreateExamType />
    }))
  }

  async function fetchExamType() {
    try {
      await dispatch(
        listExamTypeThunk(user?.matricule_labo)
      ).unwrap();

    } catch (error) {

    }
  }

  function handleShowUpdateExamType(id_exam_type: String) {
    dispatch(
      showModalReducer({
        header: "Modifier type examen",
        active: true,
        body: <UpdateExamType
          id_exam_type={id_exam_type}
        />,
      })
    );
  }

  useEffect(() => {
    let isMounted = true
    isMounted && fetchExamType()
    return () => {
      isMounted = false
    }
  }, [])

  function handleFilter(data: []) {
    const queryTolowerCase = query.toLowerCase()
    return data?.filter((item: ExamsType) =>
      item?.nom?.toLowerCase().includes(queryTolowerCase) ||
      item?.matricule?.toLocaleString().toLowerCase().includes(queryTolowerCase)
    )
  }

  return (
    <div className="list-patients">
      <div className="feature-title gap-10">
        {/* <h4 className="title">
                Liste des types d'examens
              </h4> */}
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
          <Link
            to="#"
            onClick={handleOpenModal}
            className='btn-link-green'>
            <span>Ajouter examen </span> <FaPlus />
          </Link>
        </div>
      </div>

      <div className="patients">
        <ExamsTypeTable
          data={itemsToDisplay(handleFilter(examType?.data))}
          showUpdateExamType={handleShowUpdateExamType}
        />
      </div>
    </div>
  )
}