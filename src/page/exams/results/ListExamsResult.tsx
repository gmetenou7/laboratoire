import React, { Fragment } from 'react';
import PageLayout from "../../PageLayout.tsx";
import { ListExems } from '../../../component/exems/ListExems.tsx';
import { useSelector } from 'react-redux';
import { Puff } from 'react-loader-spinner';

export function ListExamsResult() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const exams = useSelector(state => state.exams.listExamens);
    
  const content = 
  <Fragment>
    <div className="patient-page-wrapper">
      {exams?.length > 0 ?
        <ListExems 
          it = {user.nomservice === "it" ? true : false}
          completed = {true}
        />: 
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
        children = {content}
        useSidebar = {user?.fonction === "admin"? true:false}
    />
  )
}