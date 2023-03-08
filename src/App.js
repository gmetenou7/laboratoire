import React from "react";
import "./component/assets/css/fullcalendar.bundle.css";
import "./component/login/logincss/login.css";
import "./component/assets/css/datatables.bundle.css";
import "./component/assets/css/plugins.bundle.css";
import "./component/assets/css/style.bundle.css";
import "./component/assets/css/header.light.css";
import "./component/assets/css/menu.light.css";
import "./component/assets/css/brand.navy.css";
import "./component/assets/css/aside.navy.css";
import "./component/assets/css/wizard-v1.css";
import "./component/assets/css/wizard-v3.css";
import "./component/assets/css/invoice-v2.css";
import "./component/assets/css/post.css";
//import './component/login/logincss/login.css'
//import '../src/component/layout/sidenav.css'
import Resetpassword from "./component/login/Resetpassword.tsx";
import { Route, Routes } from "react-router-dom";
//import GestionLaboratin from './component/GestionUtilisateur/GestionLaboratin';
import GestionUser from "./component/GestionUtilisateur/GestionUser.tsx";
import CreateUserHome from "./component/GestionUtilisateur/CreateUserHome.tsx";
import GestionPatient from "./component/GestionUtilisateur/GestionPatient.tsx";
//import Dashboard from './component/layout/Dashboard.tsx';
import Statistique from "./component/GestionStatistique/Statistique.tsx";
import Agenda from "./component/gestionAgenda/Agenda.tsx";
import "./component/gestionAgenda/agenda.css";
import OtpCodeSend from "./component/login/OtpCodeSend.tsx";
import CreateNewPwd from "./component/login/CreateNewPwd.tsx";
import Agences from "./component/gestionParametres/Agences.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import InfoLabo from './component/login/creationlabo/InfoAgence.tsx';
// import InfoResponsable from './component/login/creationlabo/InfoLabo.tsx';
// import InfoAgence from './component/login/creationlabo/InfoResponsable.tsx';
import InfoUser from "./component/GestionUtilisateur/InfoUser.tsx";

import UserProfile from "./component/login/UserProfile.tsx";
import DetailAgence from "./component/gestionParametres/DetailAgence.tsx";
import DetailPatient from "./component/GestionUtilisateur/DetailPatient.tsx";
import FamilleExamens from "./component/gestionParametres/FamilleExamens.tsx";
import DetailExamen from "./component/gestionParametres/DetailExamen.tsx";

import CodeBar from "./component/gestionParametres/Resultats/CodeBar.tsx";
import FicheExamen from "./component/gestionParametres/Resultats/FicheExamen.tsx";

import ResultExamens from "./component/gestionParametres/ResultExamens.tsx";
import ExamensBase from "./component/gestionParametres/Resultats/ExamensBase.tsx";

import { Login } from "./component/auth/Login.tsx";
import { Register } from "./component/auth/Register.tsx";
import { VerifyAccount } from "./component/auth/VerifyAccount.tsx";
import { FindAccount } from "./component/auth/FindAccount.tsx";
import { Dashboard } from "./page/Dashboard.tsx";
import { CompleteProfile } from "./page/CompleteProfile.tsx";
import { NewPassword } from "./component/auth/NewPassword.tsx";
import { HomeServicePage } from "./page/HomeServicePage.tsx";
import {
  RequiredAuthentication,
  AdminOnly,
  IsAuthenticated,
} from "./contexts/RoutingContext.tsx";
import { CreatePatient } from "./page/CreatePatient.tsx";
import { SinglePatient } from "./page/SinglePatient.tsx";
import { Patients } from "./page/Patients.tsx";
import { Exams } from "./page/Exams.tsx";
import { Modal } from "./component/utilities/Modal.tsx";

import { useSelector } from "react-redux";
import { Glassware } from "./page/Glassware.tsx";
import { ExamType } from "./page/ExamType.tsx";
import { ExamFamily } from "./page/ExamFamily.tsx";
import { Employees } from "./page/employees/Employees.tsx";
import { HomeBoxService } from "./page/HomeBoxService.tsx";
import { ItService } from "./page/ItService.tsx";
import { LaboratoryService } from "./page/LaboratoryService.tsx";
import { CreateEmployees } from "./page/employees/CreateEmployees.tsx";
import { SingleExam } from "./page/exams/SingleExam.tsx";
import { ListExamVoucher } from "./page/exams/examVoucher/ListExamVoucher.tsx";
import { ListExamBill } from "./page/exams/examBill/ListExamBill.tsx";
import {ListExamsResult} from "./page/exams/results/ListExamsResult.tsx";
import { ListLoborantinExams } from "./page/exams/laborantin/ListLoborantinExams.tsx";
import { UpdatePatient } from "./page/patients/UpdatePatient.tsx";
import { Unity } from "./page/Unity.tsx";
import SingleEmployee from "./page/employees/SingleEmployee.tsx";
import { AgenciesPage } from "./page/agencies/AgenciesPage.tsx";
import SingleAgencyPage from "./page/agencies/SingleAgencyPage.tsx";
import { SamplerView } from "./page/views/SamplerView.tsx";
import ListAllServicesPage from "./page/services/ListAllServicesPage.tsx";
import Settings from "./page/laboratory/Settings.tsx";
import { UpdateLaboratory } from "./component/laboratory/UpdateLaboratory.tsx";
import { Statistiques } from "./page/statistiques/Statistiques.tsx";
import { FinancialPage } from "./page/financial/FinancialPage.tsx";
import {BigFamilyExam} from "./page/BigFamilyExam.tsx"
import { AssuranceCompagnyPage } from "./page/companyAssurance/AssuranceCompagnyPage.tsx";
import { SingleAssurancePage } from "./page/companyAssurance/SingleAssurancePage.tsx";
import { SingleInsuredCompanyPage } from "./page/companyAssurance/InsuredCompany/SingleInsuredCompanyPage.tsx";
import { CreateInsuredContractPage } from "./page/companyAssurance/CreateInsuredContractPage.tsx";
import { ListInsuredContractPage } from "./page/companyAssurance/ListInsuredContractPage.tsx";
import { SingleSingleInsuredContractPage } from "./page/companyAssurance/SingleSingleInsuredContractPage.tsx";
import { CreateUserCompanyPage } from "./page/companyAssurance/InsuredCompany/CreateUserCompanyPage.tsx";
import { ClientListPage } from "./page/companyAssurance/clients/ClientListPage.tsx";
import { SingleUserCompanyPage } from "./page/companyAssurance/InsuredCompany/SingleUserCompanyPage.tsx";
import { InstitutionCompagnyPage } from "./page/companyInstitution/InstitutionCompagnyPage.tsx";
import { SingleInstitutionPage } from "./page/companyInstitution/SingleInstitutionPage.tsx";

import { InsuredInstitutionListPages } from "./page/companyInstitution/InsuredInstitutionListPages.tsx";
import { AgentsInstitutionPage } from "./page/companyInstitution/AgentsInstitutionPage.tsx";
import { SingleAgentPage } from "./page/companyInstitution/SingleAgentPage.tsx";
import { SingleClientInstitutionPage } from "./page/companyInstitution/SingleClientInstitutionPage.tsx";
import { ClientsInstitutionPage } from "./page/companyInstitution/ClientsInstitutionPage.tsx";
import { InsuredSingleConvention } from "./component/institution/insuredInstitution/InsuredSingleConvention.tsx"
import { StatInsuredCompanyPage } from "./page/companyAssurance/InsuredCompany/StatInsuredCompanyPage.tsx";
import { StatAssuranceCompanyPage } from "./page/companyAssurance/StatAssuranceCompanyPage.tsx";
import InsuredInstitutionList from "./component/institution/insuredInstitution/InsuredInstitutionList.tsx";
import { CreateContratInstitutionPage } from "./page/companyInstitution/CreateContratInstitutionPage.tsx";

function App() {
  const modal = useSelector((state) => state.modal);
  return (
    <div className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent kt-aside--enabled kt-aside--fixed kt-page--loading">
      {/* To handle modal in the entire app */}
      {modal?.active === true && <Modal />}
      {/* <Toast notifications = {message} /> */}
      <ToastContainer />
      <Routes>
        {/* <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>*/}
        <Route path="/Resetpassword" element={<Resetpassword />}></Route>
        {/* <Route path="*" element={<Login />}></Route>  */}
        {/* <Route path='/dashboard' element = {<Dashboard />} ></Route>  */}
        <Route path="/utilisateurs" element={<GestionUser />}></Route>
        <Route path="/personelaccueil" element={<CreateUserHome />}></Route>
        <Route path="/listepatient" element={<GestionPatient />}></Route>
        <Route path="/agenda" element={<Agenda />}></Route>
        <Route path="/code" element={<OtpCodeSend />}></Route>
        <Route path="/newpassword" element={<CreateNewPwd />}></Route>
        <Route path="/accueil" element={<Statistique />}></Route>
        <Route path="/agences" element={<Agences />}></Route>
        {/* <Route path="/services" element={<Services />}></Route> */}
        <Route path="/infopatient" element={<InfoUser />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/familleExamen" element={<FamilleExamens />}></Route>
        <Route path="/familleExamen/:id" element={<DetailExamen />}></Route>
        <Route path="/examens" element={<ExamensBase />} />
        <Route path="/result_examens" element={<ResultExamens />} />
        <Route path="/agences/:id" element={<DetailAgence />}></Route>
        <Route path="/listepatient/:id" element={<DetailPatient />}></Route>
         <Route
            path="examenpatientDetail/:id"
            element={<CodeBar />}
          ></Route>  
        <Route path="examenpatientDetail/:id" element={<FicheExamen />}></Route>
        #New routing context
        <Route element={<IsAuthenticated />}>
          <Route path="/new-loging" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/new-register" element={<Register />} />
          <Route path="/new-verify" element={<VerifyAccount />} />
          <Route path="/new-account-lookup" element={<FindAccount />} />
          <Route path="/new-create-new-password" element={<NewPassword />} />
        </Route>
        <Route element={<RequiredAuthentication />}>
          <Route element={<AdminOnly />}>
            <Route path="/new-dashboard" element={<Dashboard />} />
            <Route path="/glassware" element={<Glassware />} />
            <Route path="/exams-type" element={<ExamType />} />
            <Route path="/exams-family" element={<ExamFamily />} />
            <Route path="/family-exams" element={<BigFamilyExam />} />

            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/add" element={<CreateEmployees />} />
            <Route path="/employees/employee-id=:matricule" element={<SingleEmployee />} />
            <Route 
              path="/agencies"
              element = {<AgenciesPage />}
            />
            <Route 
              path="/agencies/agency-id=:matricule"
              element = {<SingleAgencyPage />}
            />
            <Route 
              path="/assurances"
              element = {<AssuranceCompagnyPage />}
            />
            <Route 
              path="/assurances/:code"
              element = {<SingleAssurancePage />}
            />

            <Route
              path="/institutions"
              element={<InstitutionCompagnyPage />}
            />
            <Route
              path="/institutions/:code"
              element={<SingleInstitutionPage />}
            />
            <Route
              path="/agents/:code"
              element={<SingleAgentPage />}
            />
            <Route
              path="/list-agent-institution/:code"
              element={<AgentsInstitutionPage />}
            />
            <Route
              path="/clients/:code"
              element={<SingleClientInstitutionPage />}
            />
            <Route
              path="/list-client-Institution/:code"
              element={<ClientsInstitutionPage />}
            />
            <Route
              path="/list-contrat-institution/:code"
              element={<InsuredInstitutionListPages />}
            />

            <Route
              path="/create-institution-contrat/:code"
              element={<CreateContratInstitutionPage />}
            />

            <Route
              path="/detail-contrat-institution/:code"
              element={<InsuredSingleConvention />}
            />
           
            <Route 
              path="/create-contrat/:code"
              element = {<CreateInsuredContractPage />}
            />
            <Route 
              path="/list-contract/:code"
              element = {<ListInsuredContractPage />}
            />
            
            <Route 
              path="/details-client/:matricule"
              element = {<SingleUserCompanyPage />}
            />
            <Route 
              path="/count-society/:code"
              element = {<StatInsuredCompanyPage />}
            />
            <Route 
              path="/list-client/:code"
              element = {<ClientListPage />}
            />
            <Route 
              path="/contract/:code"
              element = {<SingleSingleInsuredContractPage />}
            />
            <Route 
              path="/insuredcompany/:code"
              element = {<SingleInsuredCompanyPage />}
            />
            <Route 
              path="/statistique-assurance/:code"
              element = {<StatAssuranceCompanyPage />}
            />
            <Route 
              path="/create-client-compagny/:code"
              element = {<CreateUserCompanyPage />}
            />
            <Route 
              path="/services"
              element = {<ListAllServicesPage />}
            />
            <Route 
              path="/settings"
              element = {<Settings />}
            />
            <Route 
              path="/statistique"
              element = {<Statistiques />}
            />
            <Route 
              path="/accounting"
              element = {<FinancialPage />}
            />
          </Route>

          <Route path="/last-step" element={<CompleteProfile />} />

          {/* Route related to the patient */}

          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/add" element={<CreatePatient />} />
          <Route path="/patients/:matricule" element={<SinglePatient />} />
          <Route path="/patients/matricule=:matricule/update" element={<UpdatePatient />} />

          <Route path="/exams" element={<Exams />} />
          {/* <Route path="/exams/add" element={<CreatePatient />} /> */}
          <Route path="/exams/exams_code=:code" element={<SingleExam />} />
          <Route
            path="/exams/voucher"
            element={<ListExamVoucher />}
          />
          <Route
            path="/exams/my-voucher"
            element={<ListLoborantinExams />}
          />
          <Route
            path="/bills"
            element={<ListExamBill />}
          />
          <Route
            path="/exams/results"
            element={<ListExamsResult />}
          />
          <Route
            path="/unites"
            element={<Unity />}
          />
          <Route
            path="/updatelaboratory: id"
            element={<UpdateLaboratory />}
          />

          <Route
            path="/:matricul_lobo/:matricul_agence/:matricul_service/accueil"
            element={<HomeServicePage />}
          />
          <Route
            path="/:matricul_lobo/:matricul_agence/:matricul_service/caisse"
            element={<HomeBoxService />}
          />
          <Route
            path="/:matricul_lobo/:matricul_agence/:matricul_service/it"
            element={<ItService />}
          />
          <Route
            path="/:matricul_lobo/:matricul_agence/:matricul_service/laboratoire"
            element={<LaboratoryService />}
          />

          <Route
            path="/:matricul_lobo/:matricul_agence/:matricul_service/prelevement"
            element={<SamplerView />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
