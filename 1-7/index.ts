import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

type ErrorType = {
  error: string;
};

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(+height) || isNaN(+weight)) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const calculatedBmi = calculateBmi(+height, +weight);

  return res.json({
    weight: +weight,
    height: +height,
    bmi: calculatedBmi,
  });
});

app.post<
  Record<string, never>,
  Result | ErrorType,
  { daily_exercises: number[]; target: number }
>('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((day) => isNaN(+day)) ||
    isNaN(+target)
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const exerciseResult = calculateExercises(daily_exercises, +target);

  return res.json(exerciseResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
