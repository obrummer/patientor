import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (payload: Array<Patient>): Action => ({
  type: "SET_PATIENT_LIST",
  payload,
});
export const setPatient = (payload: Patient): Action => ({
  type: "SET_PATIENT",
  payload,
});
export const addPatient = (payload: Patient): Action => ({
  type: "ADD_PATIENT",
  payload,
});
export const setDiagnosisList = (payload: Array<Diagnosis>): Action => ({
  type: "SET_DIAGNOSIS_LIST",
  payload,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: {
          ...state.patient,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

// export const setPatientList = (
//   state: State["patients"],
//   action: Action
// ): State => {
//   return {
//     patients: {
//       ...action.payload.reduce(
//         (memo, patient) => ({ ...memo, [patient.id]: patient }),
//         {}
//       ),
//       ...state.patients,
//     },
//   };
// };
