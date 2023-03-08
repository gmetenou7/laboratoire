import { async } from "q";
import React, { Fragment, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Puff } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    listBigFamilyExamThunk,
    bigFamilyExamSelector,
    bigFamilyExamStatusSelector
} from "../../../features/examBigFamilySlice.ts";
import { showModalReducer } from "../../../features/modalSlice.ts";
import { BigExamsFamilyTable } from "../../tables/Table.tsx";
import { CreateBigFamilyExam } from "./CreateBigFamilyExam.tsx";

export const ListBigFamilyExam = () => {

    const bigfamilyExam = useSelector(
        (state: any) => bigFamilyExamSelector(state)
    );
    const bigFamilyExamStatus = useSelector(
        (state: any) => bigFamilyExamStatusSelector(state)
    );
    const user = JSON.parse(localStorage.getItem("user") || "")
    const dispatch = useDispatch();

    const [query, setQuery]=useState("");
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [showAll, setShowAll] = useState<Boolean>(true);
    const [itemsPerPage, setItemsPerPage] = useState<number>(
      showAll? bigfamilyExam?.length : 10
    );

    const pagevisited = pageNumber * itemsPerPage;
    const itemsToPaginate = bigfamilyExam
    const pageCount = Math.ceil(itemsToPaginate?.length / itemsPerPage);
    function handlePagination({selected}) {
      setPageNumber(selected)
    }
  
  

  function handleFilter(data:[]) {
      const queryTolowerCase = query.toLowerCase()
      return data?.filter((item:BigExamsFamily) => 
        item?.nomfmaille?.toLowerCase().includes(queryTolowerCase)||
        item?.code?.toLocaleString().toLowerCase().includes(queryTolowerCase)||
        item?.creerle?.toLowerCase().includes(queryTolowerCase)
      )
    }

    async function fetchBigFamilyExam() {
        try {
            await dispatch(listBigFamilyExamThunk(user?.matricule_labo)
            ).unwrap()
        }
        catch (error) {
        }
    }

    function handleOpenModal() {
        dispatch(showModalReducer({
            active: true,
            header: "Ajouter une famille d'examen",
            body: <CreateBigFamilyExam />
        }))
    }

    function handleShowEditBigFamily(codeId: string) {
        dispatch(showModalReducer({
            active: true,
            header: `Modifier l'unité' N°: ${codeId}`,
            body: <CreateBigFamilyExam codeId={codeId} />
        }))
    }

     function itemsToDisplay(data:[]) {
        if(showAll) {
        return data
        } else {
        return data?.slice(
            pagevisited, pagevisited+itemsPerPage
        )
        }
    }

    useEffect(() => {
        (bigFamilyExamStatus.for === "idle" && bigFamilyExamStatus.state === "idle") && fetchBigFamilyExam()
    }, [bigFamilyExamStatus])

   
    return (
        <Fragment>
            {(bigFamilyExamStatus.for === "list" && bigFamilyExamStatus.state === "loading" ) ?
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
                <>
                    {bigFamilyExamStatus.for === "list" && bigFamilyExamStatus.state === "error" ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={fetchBigFamilyExam}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :

                        <div className="list-patients">
                            <div className="feature-title gap-10">
                                <h4 className="title">
                                    Liste des familles d'examens
                                </h4>
                                 {/* {itemsToPaginate?.length > 0 &&
                                    <div className="pagination-container">
                                        <label htmlFor="list-paginate" className="list-paginate">
                                        <span>Afficher</span>
                                        <select id="list-paginate"
                                            className="select-list-paginate"
                                            onChange={(event) => {
                                            if(event?.target?.value === "all") {
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
                                                previousLabel = "<<"
                                                nextLabel = ">>"
                                                pageRangeDisplayed={1}
                                                marginPagesDisplayed={1}
                                                pageCount={pageCount}
                                                onPageChange = {handlePagination}
                                                containerClassName="pagination-content"
                                                previousLinkClassName={"previous-btn"}
                                                nextLinkClassName={"next-btn"}
                                                disabledClassName={"pagination-disabled"}
                                                activeClassName={"pagination-active"}
                                                pageClassName = "pagination-item"
                                                breakLabel="..."
                                            />
                                    </div> 
                                    } */}
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
                                        <span>Ajouter Une Famille d'Examen </span> <FaPlus />
                                    </Link>
                                </div>

                            </div>
                            <div className="patients">
                                    <BigExamsFamilyTable data={handleFilter(bigfamilyExam)}
                                        showEditBigFamily= {handleShowEditBigFamily}
                                    />
                            </div>
                        </div>
                    }
                </>
            }
        </Fragment>
    )

}