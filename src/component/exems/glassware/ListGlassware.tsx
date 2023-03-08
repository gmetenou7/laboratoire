import React, { useState, useEffect, Fragment } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GlasswareTable } from "../../tables/Table.tsx"
import CreateGlassware from "./CreateGlassware.tsx";
import { useSelector, useDispatch } from "react-redux";
import {
    openCreateGlasswareForm,
    listGlasswareThunk,
    singleGlasswareSelector,
    glasswareStatusSelector
} from "../../../features/glasswareSlice.ts";
import ReactPaginate from "react-paginate";
import { Puff } from "react-loader-spinner";

interface Glassware {
    nomverre: string,
    id: number,
    symbole: string,
    couleur: string,
    codelaboratoire: string
}

export const ListGlassware = () => {
    const glassware = useSelector(
        (state: any) => state.glassware
    );
    const glasswareStatus = useSelector(
        (state: any) => glasswareStatusSelector(state)
    );
    const user = JSON.parse(localStorage.getItem("user") || "")
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const [pageNumber, setPageNumber] = useState<number>(0);
    const [showAll, setShowAll] = useState<Boolean>(true);
    const [itemsPerPage, setItemsPerPage] = useState<number>(
        showAll ? glassware?.length : 10
    );
    const pagevisited = pageNumber * itemsPerPage;
    const itemsToPaginate = glassware?.data
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

    async function fetchGlassware() {
        try {
            dispatch(
                listGlasswareThunk(user?.matricule_labo)
            ).unwrap();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        let isMounted = true;
        isMounted && fetchGlassware()
        return () => {
            isMounted = false
        }
    }, []);

    function handleFilter(data: []) {
        const queryTolowerCase = query.toLowerCase();
        return data?.filter(
            (item: Glassware) =>
                item?.id?.toString().includes(queryTolowerCase) ||
                item?.nomverre
                    ?.toString()
                    .toLowerCase()
                    .includes(queryTolowerCase)
        );
    }

    function handleShowUpdateForm(glasswareId: number) {
        console.log(glasswareId);
    }

    return (
        <Fragment>
            {glasswareStatus === "loading" ?
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
                    {glasswareStatus === "error" ?
                        <div className='loading-fail'>
                            <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                            <Link
                                to='#'
                                onClick={fetchGlassware}
                                className="btn btn-main"
                            >
                                Essayer à Nouveau
                            </Link>
                        </div> :
                        <div className="list-patients">
                            <div className="feature-title">
                                {glassware.formState === "create" ?
                                    <h4 className="title">
                                        Ajouter un tube
                                    </h4> : glassware.formState === "update" ?
                                        <h4 className="title">
                                            Mettre a jour le tube
                                        </h4> :
                                        <>
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
                                        </>
                                }
                                <div className="btn-group">
                                    {glassware.formState === "idle" &&
                                        <Link
                                            to="#"
                                            onClick={
                                                () => dispatch(openCreateGlasswareForm())
                                            }
                                            className='btn-link-green'>
                                            <span>Ajouter un Tube</span> <FaPlus />
                                        </Link>
                                    }
                                </div>
                            </div>
                            {glassware?.formState === "create" &&
                                <CreateGlassware />
                            }

                            <div className="patients">
                                <GlasswareTable
                                    data={handleFilter(glassware?.data)}
                                    showUpdateForm={handleShowUpdateForm}
                                />
                            </div>
                        </div>
                    }
                </>
            }
        </Fragment>
    )
}