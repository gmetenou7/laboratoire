import React, { Fragment } from "react";
import PageLayout from "./PageLayout.tsx";
import { useSelector } from "react-redux";
import { examsInProcessStatus } from '../features/examSlice.ts'
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { ExamsTable } from "../component/tables/Table.tsx"

export function ItService() {

  const exams_in_progress = useSelector((state) =>
    examsInProcessStatus(state)
  );
  const content = (
    <Fragment>
      <div className="grid-1 pb-20  mt-30">
        <div className="list-patients">
          {exams_in_progress?.length > 0 ?
            <>
              <div className="feature-title">
                <h4 className="title">
                  Liste des examens
                </h4>
                <div className="btn-group">
                  {exams_in_progress?.length > 0 &&
                    <Link
                      to="/exams/voucher"
                      className='btn-link-main'
                    >
                      Voir plus
                      <FaAngleRight />
                    </Link>
                  }
                </div>
              </div>
              <div className="patients">
                <ExamsTable
                  it={true}
                  data={exams_in_progress?.slice(0, 10)}
                />
              </div>
            </> :
            <div className='content-not-fount'>
              <h2 className='content-not-fount__text'>
                Aucun examen à traiter pour le moment
              </h2>
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
  return <PageLayout children={content} useSidebar={false} />;
};