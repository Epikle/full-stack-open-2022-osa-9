import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: { id: string; newEntry: Entry };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
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
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES':
      return { ...state, diagnoses: [...action.payload] };

    case 'ADD_ENTRY':
      const { id, newEntry } = action.payload;
      const patient = {
        ...state.patients[id],
        entries: state.patients[id].entries.concat(newEntry),
      };

      return {
        ...state,
        patients: {
          ...state.patients,
          [id]: patient,
        },
      };

    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload,
  };
};

export const updatePatient = (payload: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload,
  };
};

export const setDiagnoses = (payload: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload,
  };
};

export const addEntry = (payload: { id: string; newEntry: Entry }): Action => {
  return {
    type: 'ADD_ENTRY',
    payload,
  };
};
