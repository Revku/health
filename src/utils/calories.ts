import { Gender } from "@/types/enums";

const calculateCalories = (gender: Gender, weight: number, height: number, age: number, activity: number): string => {
  let bmr;
  if (gender === Gender.MALE) {
    bmr =
      447.593 +
      9.247 * weight +
      3.098 * height -
      4.33 * age
  } else if (gender === Gender.FEMALE) {
    bmr =
      88.362 +
      13.397 * weight +
      4.799 * height -
      5.677 * age
  } else {
    throw new Error("There is an issue with calculating calories.");
  }
  const tdee = bmr * (activity);
  const calories = tdee.toFixed(2);

  return calories;
}

export default calculateCalories
