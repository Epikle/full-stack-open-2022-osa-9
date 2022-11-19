import express from 'express';

import * as patientService from '../services/patients.service';
import { EntryWithoutId } from '../types';
import { Fields, toNewPatientEntry } from '../utils';

const router = express.Router();

//api/patients
router.get('/', (_req, res) => {
  const data = patientService.getPatientsPublic();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const data = patientService.getPatientById(id);

    res.json(data);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).json({ message: errorMessage });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body as Fields);
    const addedEntry = patientService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).json({ message: errorMessage });
  }
});

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  const data = req.body as EntryWithoutId;

  try {
    const addedEntry = patientService.addPatientEntry(id, data);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).json({ message: errorMessage });
  }
});

export default router;
