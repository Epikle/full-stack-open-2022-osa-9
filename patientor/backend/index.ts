import express from 'express';
import cors from 'cors';

import diagnosesRoutes from './routes/diagnoses.routes';
import patientsRoutes from './routes/patients.routes';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3003;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/patients', patientsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
