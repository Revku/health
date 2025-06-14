const calculateBmi = (weight: number, height: number): string =>
  (weight / (height / 100) ** 2).toFixed(2);

export default calculateBmi;
