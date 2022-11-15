interface BmiValues {
  height: number;
  weight: number;
}

const parseArgumentsBmi = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (isNaN(+args[2]) || isNaN(+args[3])) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    height: +args[2],
    weight: +args[3],
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = +(weight / (height / 100) ** 2).toFixed(1);

  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 17) return 'Underweight (Moderate thinness)	';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Overweight (Pre-obese)';
  if (bmi < 35) return 'Obese (Class I)';
  if (bmi < 40) return 'Obese (Class II)';
  if (bmi >= 40) return 'Obese (Class III)';

  return "shouldn't be here";
};

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
