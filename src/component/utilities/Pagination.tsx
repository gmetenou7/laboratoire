import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

export function Pagination(props: any) {
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [showAll, setShowAll] = useState<Boolean>(true);
    const [itemsPerPage, setItemsPerPage] = useState<number>(
        showAll ? props.data?.length : 10
    );
    const pagevisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(props.data?.length / itemsPerPage);

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

    // useEffect(() => {
    //   props.itemsToDisplay(itemsToDisplay)
    // }, [props])


    return (
        <div className="pagination-container">
            <label htmlFor="list-paginate" className="list-paginate">
                <span>Afficher</span>
                <select id="list-paginate"
                    className="select-list-paginate"
                    onChange={(event) => {
                        if (event?.target?.value === "all") {
                            setShowAll(true);
                            setItemsPerPage(props.data?.length)
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
    )
}
