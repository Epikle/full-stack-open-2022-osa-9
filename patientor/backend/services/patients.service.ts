import { v4 as uuid } from 'uuid';

import patientData from '../data/patients';
import { NewPatientEntry, Patient, PatientPublic } from '../types';

const patients: Patient[] = patientData;

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatientsPublic = (): PatientPublic[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();

  const newPatientEntry = {
    id,
    ...entry,
  };

  patientData.push(newPatientEntry);

  return newPatientEntry;
};

export const getPatienById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
