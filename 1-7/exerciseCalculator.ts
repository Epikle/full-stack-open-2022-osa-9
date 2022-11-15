interface ExValues {
  target: number;
  days: number[];
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsEx = (args: string[]): ExValues => {
  const values = args.slice(2);
  const [target, ...days] = values;
  const notNumbers = days.some((day) => isNaN(+day));

  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(+target)) throw new Error('Target is not number!');
  if (notNumbers) throw new Error('Some of the days are not numbers!');

  return {
    target: +target,
    days: days.map((str) => +str),
  };
};

export const calculateExercises = (days: number[], target: number): Result => {
  const average = days.reduce((a, b) => a + b, 0) / days.length;
  let rating: [number, string] = [2, 'not bad'];

  if (average < 1) rating = [1, 'bad'];
  if (average > 3) rating = [3, 'good'];

  const exercise = {
    periodLength: days.length,
    trainingDays: days.filter((day) => day !== 0).length,
    success: average >= target ? true : false,
    rating: rating[0],
    ratingDescription: rating[1],
    target: target,
    average: average,
  };

  return exercise;
};

try {
  const { target, days } = parseArgumentsEx(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
