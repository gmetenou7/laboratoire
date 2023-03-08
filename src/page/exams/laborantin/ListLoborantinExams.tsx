import React, { Fragment } from 'react';
import PageLayout from "../../PageLayout.tsx";
import { ListExems } from '../../../component/exems/ListExems.tsx';
import { useSelector } from 'react-redux';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export function ListLoborantinExams() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const exams = useSelector((state: any) => state.exams.listExamens);
  const examsStatus = useSelector((state: any) => state.exams.status)

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        {examsStatus === "loading" ?
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
          </div>
          :
          <>
            {exams?.length > 0 ?
              <ListExems
                laboratory={true}
                listLaborantin={true}
                headerText="Mes bon d'examens"
              /> :
              <div className='content-not-fount'>
                <h2 className='content-not-fount__text'>Vous n'avez pas encore d'exam à suivre</h2>
                <Link
                  to='/exams/voucher'
                  className="btn btn-main"
                >
                  Bon d'examens disponibles
                </Link>
              </div>
            }
          </>
        }
      </div>
    </Fragment>
  return (
    <PageLayout
      children={content}
      useSidebar={user?.fonction === "admin" ? true : false}
    />
  )
}

