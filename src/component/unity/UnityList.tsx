import React, { Fragment, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listUnityThunk } from "../../features/unitySlice.ts";
import { showModalReducer } from "../../features/modalSlice.ts";
import { UnityTable } from "../tables/Table.tsx";
import { CreateUnity } from "./CreateUnity.tsx";
import { Puff } from "react-loader-spinner";

interface Unity {
    id: number,
    unite: string,
    codelabo: string,
    created_at: string,

}

export const UnityList =()=>{

    const dispatch =useDispatch()
    const unity =useSelector((state)=> state.unity)
    const user = JSON.parse(localStorage.getItem("user") || "");

    const [pageNumber, setPageNumber] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState<Boolean>(true);
    const [query, setQuery]=useState("");

 
    const [itemsPerPage, setItemsPerPage] = useState<number>(
      showAll? unity?.data?.length : 10
    );
    const pagevisited = pageNumber * itemsPerPage;
    const itemsToPaginate = unity?.data
    const pageCount = Math.ceil(itemsToPaginate?.length / itemsPerPage);
  
    function handlePagination({selected}) {
      setPageNumber(selected)
    }

    async function fetchUnity() {
        setLoading(true)
        try {
            const response = dispatch(
                listUnityThunk(user?.matricule_labo)

            ).unwrap()
            setLoading(false)
           
            
        } catch (error) {
            setLoading(false)
            
        }
        
    } 

    function handleFilter(data:[]) {
      const queryTolowerCase = query.toLowerCase()
      return data?.filter((item:Unity) => 
        item?.unite?.toLowerCase().includes(queryTolowerCase)||
        item?.id?.toLocaleString().toLowerCase().includes(queryTolowerCase)||
        item?.created_at?.toLowerCase().includes(queryTolowerCase)
      )
    }

    
    function handleOpenModal() {
        dispatch(showModalReducer({
          active: true,
          header: "Ajouter une unité de mesure",
          body: <CreateUnity />
        }))
      }


      function handleShowEditUnity(unityId :string) {
        dispatch(showModalReducer({
          active: true,
          header : `Modifier l'unité' N°: ${unityId}`,
          body: <CreateUnity unityId = {unityId} />
        }))
        
        
      }  
    useEffect(()=>{
        fetchUnity()
    },[])
    function itemsToDisplay(data:[]) {
        if(showAll) {
          return data
        } else {
          return data?.slice(
            pagevisited, pagevisited+itemsPerPage
          )
        }
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
              <div className="feature-title">
                  {/* <h4 className="title">
                      Liste des Unités
                  </h4> */}
                  {itemsToPaginate?.length >0 && 
                      <div className="pagination-container">
                      <label htmlFor="list-paginate" className="list-paginate">
                      <span>Aficher</span>
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
                      
                      <Link 
                          to="#"
                          onClick={handleOpenModal}
                          className='btn-link-green'>
                              <span>Ajouter une unité</span> <FaPlus />
                      </Link>
                  </div>
                </div>
                <div className="patients">
                    
                      <UnityTable data={handleFilter(itemsToDisplay(unity?.data))}
                      showEditUnity = {handleShowEditUnity} 
                      />
                    
                </div>
          </div>}

      </Fragment>  
      )
}
