import diagnosesData from '../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData;

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};
