import React, { Fragment } from 'react';
import PageLayout from '../../PageLayout.tsx';
// import { useSelector } from 'react-redux';
// import {examsReceiveStatus} from '../../../features/examSlice.ts'
import { ListBills } from '../../../component/exems/bills/ListBills.tsx';
import { useSelector } from 'react-redux';
import { Puff } from 'react-loader-spinner';

export function ListExamBill({ allowed }) {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const bills = useSelector(state => state.bills.listBills)

  const content =
    <Fragment>
      <div className="patient-page-wrapper">
        {bills?.length > 0 ?
          <ListBills /> :
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
