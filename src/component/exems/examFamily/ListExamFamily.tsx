import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ExamsFamilyTable } from "../../tables/Table.tsx";
import { showModalReducer } from "../../../features/modalSlice.ts";
import { FaPlus } from "react-icons/fa";
import { listExamFamilyThunk } from "../../../features/examFamilySlice.ts";

import { CreateExamFamily } from "./createExamFamily.tsx";
import ReactPaginate from "react-paginate";
import { Puff } from "react-loader-spinner";

interface ExamsFamily {
  matricule: string;
  nom: string;
  etat: number;
  created_at: string;
}

export const ListExamTFamily = () => {
  const examFamily = useSelector((state: any) => state.examFamily);
  const user = JSON.parse(localStorage.getItem("user") || "")
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [showAll, setShowAll] = useState<Boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    showAll ? examFamily?.length : 10
  );
  const pagevisited = pageNumber * itemsPerPage;
  const itemsToPaginate = examFamily?.data
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
      active: true,
      header: "Ajouter un type d'examen",
      body: <CreateExamFamily />
    }))
  }

  function handleShowEditExamFamily(examFamilyId: string) {
    dispatch(showModalReducer({
      active: true,
      header: `Modifier le type N°: ${examFamilyId}`,
      body: <CreateExamFamily examFamilyId={examFamilyId} />
    }))
  }

  async function fetchExamFamily() {
    setLoading(true)
    try {
      dispatch(
        listExamFamilyThunk(user?.matricule_labo)
      ).unwrap();
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    isMounted && fetchExamFamily()
    return () => {
      isMounted = false
    }
  }, [])

  function handleFilter(data: []) {
    const queryTolowerCase = query.toLowerCase()
    return data?.filter((item: ExamsFamily) =>
      item?.nom?.toLowerCase().includes(queryTolowerCase) ||
      item?.matricule?.toLocaleString().toLowerCase().includes(queryTolowerCase) ||
      item?.created_at?.toLowerCase().includes(queryTolowerCase)
    )
  }

  return (
    <Fragment>

      {loading ?
        <div className='loading-container flex-col-center-center'>
          <Puff
            height="100"
            width="100"
            radius={1}
            color="#528F01"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div> :
        <div className="list-patients">
          <div className="feature-title  gap-10">
            {/* <h4 className="title">
                Liste des familles d'examens
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
                id="search-exam-family"
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
                <span>Ajouter un type </span> <FaPlus />
              </Link>

            </div>
          </div>
          {examFamily?.data?.length > 0 &&
            <div className="patients">
              <ExamsFamilyTable
                data={itemsToDisplay(handleFilter(examFamily?.data))}
                showEditExamFamily={handleShowEditExamFamily}
              />
            </div>
          }
        </div>
      }
    </Fragment>
  )
}