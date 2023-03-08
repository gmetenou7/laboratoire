import React, { Fragment, useState, useEffect } from 'react';
import { listBillsThunk } from '../../../features/billSlice.ts';
import { useSelector, useDispatch } from 'react-redux';
import { BillsTable } from '../../tables/Table.tsx';
import { showModalReducer } from '../../../features/modalSlice.ts';
import BillPrintable from './BillPrintable.tsx';
import ReactPaginate from 'react-paginate';
import { billStatus } from '../../../features/billSlice.ts';

interface Bills {
  prixtotalfac: number,
  creerlefac: string,
  modifierlelefac: string,
  nomcli: string,
  prenomcli: string,
  prescripteur: string,
  codeexamen: string
}

export function ListBills() {
  const [isMounted, setIsMounted] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [showAll, setShowAll] = useState<Boolean>(true);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "");

  const bills = useSelector(
    state => state.bills.listBills
  );
  const bills_status = useSelector(billStatus)

  const [itemsPerPage, setItemsPerPage] = useState<number>(
    showAll ? bills?.length : 10
  );
  const pagevisited = pageNumber * itemsPerPage;
  const itemsToPaginate = bills
  const pageCount = Math.ceil(itemsToPaginate?.length / itemsPerPage);

  function handlePagination({ selected }) {
    setPageNumber(selected)
  }
  const [query, setQuery] = useState("");

  async function fetchBills() {
    try {
      dispatch(
        listBillsThunk({
          matricule_labo: user?.matricule_labo,
          matricule_ag: user?.matricule_ag
        })
      ).unwrap()

    } catch (error) {


    }
  }

  useEffect(() => {
    isMounted && fetchBills()
    return () => {
      setIsMounted(false)
    }
  }, [isMounted]);

  function handleFilter(data: []) {
    const queryTolowerCase = query.toLowerCase();
    return data?.filter(
      (item: Bills) =>
        item?.codeexamen?.toLowerCase().includes(queryTolowerCase) ||
        item?.prescripteur?.toLowerCase().includes(queryTolowerCase) ||
        item?.nomcli
          ?.toLocaleString()
          .toLowerCase()
          .includes(queryTolowerCase) ||
        item?.prenomcli
          ?.toLocaleString()
          .toLowerCase()
          .includes(queryTolowerCase) ||
        item?.creerlefac?.toLowerCase().includes(queryTolowerCase)
    );
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

  function handleShowPrintableExam(id_exam: String) {
    dispatch(
      showModalReducer({
        header: `Facture pour le bon N°: ${id_exam}`,
        active: true,
        body: <BillPrintable idExam={id_exam} />
      })
    );
  }

  return (
    <Fragment>
      <div className="list-patients">
        <div className="feature-title">
          {/* <h4 className="title"> Liste des factures</h4> */}
          {itemsToPaginate?.length > 0 &&
            <div className="pagination-container">
              <label
                htmlFor="list-paginate"
                className="list-paginate">
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
          <div></div>
        </div>
        <div className="patients">
          <BillsTable
            data={itemsToDisplay(handleFilter(bills))}
            showPrintable={handleShowPrintableExam}
          />
        </div>
      </div>
    </Fragment>
  )
}
