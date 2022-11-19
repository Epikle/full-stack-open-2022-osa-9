import express from 'express';

import * as diagnosesService from '../services/diagnoses.service';

const router = express.Router();

//api/diagnoses
router.get('/', (_req, res) => {
  const data = diagnosesService.getDiagnoses();
  res.json(data);
});

export default router;
