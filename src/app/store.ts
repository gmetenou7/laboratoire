import { configureStore } from "@reduxjs/toolkit";
import agencySlice from "../features/agencySlice.ts";
import billSlice from "../features/billSlice.ts";
import countrySlice from "../features/countrySlice.ts";
import EmployeesSlice from "../features/EmployeesSlice.ts";
import examFamilySlice from "../features/examFamilySlice.ts";
import examSlice from "../features/examSlice.ts";
import examTypeSlice from "../features/examTypeSlice.ts";
import financialStateSlice from "../features/financialStateSlice.ts";
import glasswareSlice from "../features/glasswareSlice.ts";
import modalSlice from "../features/modalSlice.ts";
import normalValueSlice from "../features/normalValueSlice.ts";
import patientSlice from "../features/patientSlice.ts";
import servicesSlice from "../features/servicesSlice.ts";
import statistiqueSlice from "../features/statistiqueSlice.ts";
import unitySlice from "../features/unitySlice.ts";
import bigFamilyExamSlice from "../features/examBigFamilySlice.ts";
import institutionSlice from "../features/institutionSlice.ts";
import contratInstitutionSlice from "../features/contratInstitutionSlice.ts"
import assuranceCompanySlice from "../features/assuranceCompanySlice.ts"
import assuranceContratSlice from "../features/assuranceContratSlice.ts";


export const store = configureStore({
  reducer: {
    modal: modalSlice,
    glassware: glasswareSlice,
    examType: examTypeSlice,
    examFamily: examFamilySlice,
    patient: patientSlice,
    exams: examSlice,
    bills: billSlice,
    employees: EmployeesSlice,
    country: countrySlice,
    unity: unitySlice,
    normalValue: normalValueSlice,
    services: servicesSlice,
    agencies: agencySlice,
    statistiques: statistiqueSlice,
    financial: financialStateSlice,
    bigFamilyExam: bigFamilyExamSlice,
    institution: institutionSlice,
    contrat: contratInstitutionSlice,
    assuranceCompany: assuranceCompanySlice,
    assuranceContrat: assuranceContratSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'modal/showModalReducer',
        ],
      },
    }),
});
