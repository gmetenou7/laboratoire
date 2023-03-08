import React, { useEffect, useState } from "react";
import Header from "../component/header/Header.tsx";
import { Sidebar } from "../component/sidebar/Sidebar.tsx";
import { useDispatch } from "react-redux";
import { listExamFamilyThunk } from "../features/examFamilySlice.ts";
import { listExamTypeThunk } from "../features/examTypeSlice.ts";
import { listPatientThunk } from "../features/patientSlice.ts";
import {
  listExamsThunk,
  listLaborantinExamThunk,
  examStatusSelector
} from "../features/examSlice.ts";
import { listGlasswareThunk } from "../features/glasswareSlice.ts";
import { listEmployeesThunk } from "../features/EmployeesSlice.ts";
import { listBillsThunk } from "../features/billSlice.ts";
import { Puff } from "react-loader-spinner";
import { listUnityThunk } from "../features/unitySlice.ts";
import SiteFooter from "../component/footer/SiteFooter.tsx";
import { useSelector } from "react-redux";

export default function PageLayout({ children, useSidebar = true }) {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "");
  const examsStatus = useSelector(
    (state: any) => examStatusSelector(state)
  )

  async function setInitialState() {
    try {
      if (user?.nomservice === "laboratoire") {
        await dispatch(
          listLaborantinExamThunk({
            codelabo: user?.matricule_labo,
            codeagence: user?.matricule_ag,
            codelaborentin: user?.matricule
          })
        )
      } else {
        await dispatch(
          listExamFamilyThunk(
            user?.matricule_labo
          )
        ).unwrap();

        await dispatch(
          listExamTypeThunk(
            user?.matricule_labo
          )
        ).unwrap();
        await dispatch(
          listPatientThunk(
            user?.matricule_labo
          )
        ).unwrap();


        await dispatch(
          listExamsThunk({
            matricule_labo: user?.matricule_labo,
            matricule_ag: user?.matricule_ag,
          })
        ).unwrap();
        await dispatch(
          listGlasswareThunk(
            user?.matricule_labo
          )
        ).unwrap();
        await dispatch(
          listBillsThunk(
            {
              matricule_labo: user?.matricule_labo,
              matricule_ag: user?.matricule_ag
            }
          )
        ).unwrap();
        await dispatch(
          listUnityThunk(
            user?.matricule_labo
          )
        ).unwrap();
        await dispatch(
          listEmployeesThunk(
            user?.matricule_labo
          )
        ).unwrap()
      }

    } catch (error) {
    }
  }


  useEffect(() => {
    isMounted && setInitialState();
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);
  return (
    <div className="page-wrapper">
      <div className="sidebar-container">{useSidebar && <Sidebar />}</div>
      {!isMounted && (
        <div className="page-container">
          <div className="">
            <Header />
            <div className="content-wrapper">{children}</div>
          </div>
          <SiteFooter />
        </div>
      )}
      {isMounted && (
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
      )}
    </div>
  );
}
