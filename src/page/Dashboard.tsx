import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FeatureCard } from "../component/cards/FeatureCard.tsx";
import { StatistiqueCard } from "../component/cards/StatistiqueCard.tsx";
import PageLayout from "./PageLayout.tsx";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import { PatientTable, ExamsTable } from "../component/tables/Table.tsx";
import { UsersTable } from "../component/tables/Table.tsx";
import { formatNumber } from "../component/utilities/numberFormater.ts"
import { examsReceiveStatus } from "../features/examSlice.ts"
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import CalculateTwoToneIcon from "@mui/icons-material/CalculateTwoTone";
import DifferenceTwoToneIcon from "@mui/icons-material/DifferenceTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import SettingsInputCompositeTwoToneIcon from "@mui/icons-material/SettingsInputCompositeTwoTone";
import ControlPointDuplicateTwoToneIcon from "@mui/icons-material/ControlPointDuplicateTwoTone";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useSelector } from "react-redux";
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { Carousel } from "../component/carousel/Carousel.tsx";

const patientFeatuers = [
  {
    title: "Patients",
    icon: <GroupAddTwoToneIcon className="card-icon" />,
    className: "feature-main-blue",
    link: "/patients"
  },
  {
    title: "Annex",
    icon: <DifferenceTwoToneIcon className="card-icon" />,
    className: null,
    link: "/annex"
  },
  {
    title: "Comptabilité",
    icon: <CalculateTwoToneIcon className="card-icon" />,
    className: "feature-main-blue",
    link: "/accounting"
  },
  {
    title: "Agenda",
    icon: <CalendarMonthTwoToneIcon className="card-icon" />,
    className: "feature-main-green",
    link: "/aganda"
  },
];

const systemeFeature = [
  {
    title: "Config labo",
    icon: <SettingsTwoToneIcon className="card-icon" />,
    className: "feature-main-blue",
    link: "/settings"
  },
  {
    title: "Compte",
    icon: <PeopleAltTwoToneIcon className="card-icon" />,
    className: null,
    link: "/employees"
  },
  {
    title: "Config/examen",
    icon: <SettingsInputCompositeTwoToneIcon className="card-icon" />,
    className: "feature-main-blue",
    link: "/configuration"
  },
  {
    title: "Démander",
    icon: <ControlPointDuplicateTwoToneIcon className="card-icon" />,
    className: "feature-main-green",
    link: "/ask"
  },
];

export function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const navigate = useNavigate();
  const patient = useSelector((state: any) => state.patient);
  const exams = useSelector((state: any) => state.exams);
  const employees = useSelector((state: any) => state.employees);
  const examUnPaid = useSelector((state) => examsReceiveStatus(state))
  const bills = useSelector(
    (state: any) => state.bills.listBills
  );

  //console.log("recuuuuuuuu", examUnPaid);

  let montant = 0;
  for (let i = 0; i < bills.length; i++) {
    montant += bills[i]?.prixtotalfac
  }

  useEffect(() => {
    if (user.matricule_labo === null) {
      navigate('/last-step', { replace: true })
    }

  }, [user, navigate]);

  const content = (
    <>
      <div className="d-flex mt-20">
        <Carousel>
          <StatistiqueCard
            className="statistique-card main-blue"
            icon={<CurrencyExchangeTwoToneIcon
              className="card-icon"
            />}
            stateHead={bills?.length > 0 ? formatNumber(montant) : formatNumber(0)}
            headline="Revenu du labo"
            stateCaption="$"
          />

          <StatistiqueCard
            className="statistique-card main-blue"
            icon={<AssignmentIcon
              className="card-icon"
            />}
            stateHead={exams?.listExamens?.length > 0 ? exams?.listExamens?.length : 0}
            headline="enregistré(s)"
            stateCaption="Examen(s)"
          />

          <StatistiqueCard
            className="statistique-card main-blue"
            icon={<AssignmentTurnedInIcon
              className="card-icon"
            />}
            stateHead={bills?.length > 0 ? bills?.length : 0}
            headline="Payé(s)"
            stateCaption="Examen(s)"
          />
          <StatistiqueCard
            className="statistique-card main-blue"
            icon={<AssignmentLateIcon
              className="card-icon"
            />}
            stateHead={examUnPaid?.length > 0 ? examUnPaid?.length : 0}
            headline=" Non Payé(s)"
            stateCaption="Examen(s)"
          />
          <StatistiqueCard
            className="statistique-card main-blue"
            icon={<GroupAddTwoToneIcon
              className="card-icon "
            />}
            stateHead={patient?.data?.length > 0 ? patient?.data?.length : 0}
            headline="Patients "
            stateCaption="patients"
          />

          <StatistiqueCard
            className="statistique-card main-blue"
            icon={<PeopleAltTwoToneIcon
              className="card-icon "
            />}
            stateHead={employees?.data.length > 0 ? employees?.data.length : 0}
            headline="Employés "
            stateCaption="employés"
          />
        </Carousel>
      </div>
      <div className="grid-2 py-40">
        <div className="list-features">
          <div className="feature-title">
            <h4 className="title">Dossier patient</h4>
          </div>
          <div className="features">
            {patientFeatuers.map((item, index) => (
              <FeatureCard
                key={index}
                className={`feature-card ${item.className}`}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        <div className="list-features">
          <div className="feature-title">
            <h4 className="title">Configuration Systeme</h4>
          </div>
          <div className="features">
            {systemeFeature.map((item, index) => (
              <FeatureCard
                key={index}
                className={`feature-card ${item.className}`}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid-2 pb-20 mt-30">
        <div className="list-patients">
          <div className="feature-title">
            {patient?.data?.length > 0 ? <h4 className="title">Liste patients</h4> : <h4 className="title">Aucun patient trouvé</h4>}
            <div className="btn-group">
              {/* <Link to="/patients/add" className="btn-link-green">
                <span>Ajouter patient</span> <FaPlus />
              </Link> */}
              {patient?.data?.length > 5 && <Link to="/patients" className="btn-link-main">
                Voir plus <FaAngleRight />
              </Link>}
            </div>
          </div>
          {patient?.data?.length > 0 && <div className="patients">
            <PatientTable
              data={patient?.data?.slice(0, 5)}
              simple={true}
            />
          </div>}
        </div>
        <div className="list-patients">
          <div className="feature-title">
            {exams?.listExamens?.length > 0 ? <h4 className="title">Liste des examens</h4> : <h4 className="title">Aucun examen trouvé</h4>}
            <div className="btn-group">
              {/* <Link to="#" className="btn-link-green">
                <span>Ajouter examens</span> <FaPlus />
              </Link> */}
              {exams?.listExamens?.length > 5 && <Link to="/exams" className="btn-link-main">
                Voir plus <FaAngleRight />
              </Link>}
            </div>
          </div>
          {exams?.listExamens?.length > 0 &&
            <div className="patients">
              <ExamsTable
                data={exams?.listExamens?.slice(0, 5)}
                simple={true}
              />
            </div>
          }
        </div>
      </div>
      <div className="grid-1 py-40 mt-30">
        <div className="list-patients">
          <div className="feature-title">
            {employees?.data?.length > 0 ? <h4 className="title">Liste des utilisateurs</h4> : <h4 className="title">Aucun utilisateur trouvé</h4>}
            <div className="btn-group">
              <Link to="/employees/add" className="btn-link-green">
                <span>Ajouter utilisateur</span> <FaPlus />
              </Link>
              {employees?.data?.length > 5 && <Link to="/employees" className="btn-link-main">
                Voir plus <FaAngleRight />
              </Link>}

            </div>
          </div>
          {employees?.data.length > 0 &&
            <div className="patients">
              <UsersTable data={employees?.data?.slice(0, 5)} />
            </div>
          }

        </div>
      </div>
    </>
  );

  return <PageLayout children={content} />;
}
