import express from 'express';

import * as patientService from '../services/patients.service';
import { NewPatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

//api/patients
router.get('/', (_req, res) => {
  const data = patientService.getPatientsPublic();
  res.json(data);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body as NewPatientEntry);
    const addedEntry = patientService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const data = patientService.getPatienById(id);

  if (!data) res.status(404).json({ message: 'not found' });

  res.json(data);
});

export default router;
