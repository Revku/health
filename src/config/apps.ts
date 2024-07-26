import bmi from "@/assets/icons/bmi.svg";
import calories from "@/assets/icons/calories.svg";
import water from "@/assets/icons/water.svg";
import whr from "@/assets/icons/whr.svg";
import sleep from "@/assets/icons/sleep.svg";

const apps = [
  {
    name: "Kalkulator BMI",
    slug: "bmi",
    description: "Oblicz swoje BMI, aby dowiedzieć się, czy Twoja waga jest prawidłowa.",
    icon: bmi,
  },
  {
    name: "Kalkulator cykli snu",
    slug: "sleep",
    description: "Oblicz optymalny czas, aby obudzić się wypoczętym i pełnym energii.",
    icon: sleep,
  },
  {
    name: "Kalkulator Kalorii",
    slug: "calories",
    description: "Oblicz swoje zapotrzebowanie kaloryczne, aby utrzymać wagę.",
    icon: calories,
  },
  {
    name: "Zapotrzebowanie wody",
    slug: "water",
    description: "Oblicz ile wody powinieneś wypijać każdego dnia.",
    icon: water,
  },
  {
    name: "Kalkulator WHR",
    slug: "whr",
    description:
      "Oblicz swój współczynnik talia-biodra, aby dowiedzieć się, czy masz prawidłową wagę.",
    icon: whr,
  },
];

export default apps;
