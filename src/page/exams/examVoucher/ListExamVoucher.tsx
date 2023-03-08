import React, { Fragment } from 'react';
import PageLayout from "../../PageLayout.tsx";
import { ListExems } from "../../../component/exems/ListExems.tsx";
import { useSelector } from 'react-redux';
import { Puff } from 'react-loader-spinner';

export function ListExamVoucher({ allowed }) {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const exams = useSelector((state: any) => state.exams.listExamens);
  const examsStatus = useSelector((state: any) => state.exams.status);
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
          </div> :
          <>
            {exams?.length > 0 ?
              <>
                {user?.nomservice === "laboratoire" ?
                  <>
                    {exams?.filter((item: any) => item?.mesbons !== "yes").length > 0 ?
                      <ListExems
                        caisse={user.nomservice === "caisse" ? true : false}
                        it={user.nomservice === "it" ? true : false}
                        laboratory={user.nomservice === "laboratoire" ? true : false}
                      /> :
                      <div className='content-not-fount'>
                        <h2 className='content-not-fount__text'>Il n'y a aucun bon d'examen à suivre pour le moment</h2>
                      </div>
                    }
                  </> :
                  <ListExems
                    caisse={user.nomservice === "caisse" ? true : false}
                    it={user.nomservice === "it" ? true : false}
                    laboratory={user.nomservice === "laboratoire" ? true : false}
                  />
                }
              </> :
              <div className='content-not-fount'>
                <h2 className='content-not-fount__text'>Il n'y a aucun bon d'examen à traiter pour le moment</h2>
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
