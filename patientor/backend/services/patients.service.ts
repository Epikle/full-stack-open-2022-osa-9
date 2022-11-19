import { v4 as uuid } from 'uuid';

import patientData from '../data/patients';
import {
  BaseEntry,
  Entry,
  EntryWithoutId,
  HealthCheckEntry,
  HospitalEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
  Patient,
  PatientPublic,
} from '../types';
import { assertNever } from '../utils';

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

export const getPatientById = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) throw new Error('not found');

  return patient;
};

export const addPatientEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) throw new Error('not found');

  if (!entry.date || !entry.description || !entry.specialist) {
    throw new Error('Inputs missing...');
  }

  const baseEntry: BaseEntry = {
    ...entry,
    id: uuid(),
    date: entry.date,
    description: entry.description,
    specialist: entry.specialist,
  };

  switch (entry.type) {
    case 'Hospital':
      if (!entry.discharge.date || !entry.discharge.criteria) {
        throw new Error('Inputs missing...');
      }
      const hospital: HospitalEntry = {
        ...baseEntry,
        ...entry,
        discharge: {
          date: entry.discharge.date,
          criteria: entry.discharge.criteria,
        },
      };

      patient.entries.push(hospital);

      return hospital;

    case 'HealthCheck':
      if (!Number.isInteger(entry.healthCheckRating)) {
        throw new Error('Inputs missing...');
      }
      const healthCheck: HealthCheckEntry = {
        ...baseEntry,
        ...entry,
        healthCheckRating: entry.healthCheckRating,
      };

      patient.entries.push(healthCheck);

      return healthCheck;

    case 'OccupationalHealthcare':
      if (!entry.employerName) {
        throw new Error('Inputs missing...');
      }
      const occupationalHealthCare: OccupationalHealthcareEntry = {
        ...baseEntry,
        ...entry,
        employerName: entry.employerName,
      };

      patient.entries.push(occupationalHealthCare);

      return occupationalHealthCare;

    default:
      return assertNever(entry);
  }
};
