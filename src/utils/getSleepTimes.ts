import { DateTime } from "luxon";

const getWakeUpTime = (time: string) => {
  let result = DateTime.fromISO(time).setLocale("pl-PL").setZone("Europe/Warsaw");
  const tempTimes = [];
  let cycles = 0;
  let sleepTime = 0;

  result = result.plus({ minutes: 15 });
  for (let i = 0; i < 6; i += 1) {
    result = result.plus({ minutes: 90 });
    sleepTime += 90;
    cycles += 1;
    tempTimes.push({
      time: result.toFormat("HH:mm"),
      cycles,
      sleepTime: sleepTime / 60,
    });
  }

  tempTimes.reverse();
  return tempTimes;
};

const getSleepTime = (time: string) => {
  let result = DateTime.fromISO(time).setLocale("pl-PL").setZone("Europe/Warsaw");
  const tempTimes = [];
  let cycles = 0;
  let sleepTime = 0;

  result = result.minus({ minutes: 15 });
  for (let i = 0; i < 6; i += 1) {
    result = result.minus({ minutes: 90 });
    sleepTime += 90;
    cycles += 1;
    tempTimes.push({
      time: result.toFormat("HH:mm"),
      cycles,
      sleepTime: sleepTime / 60,
    });
  }

  tempTimes.reverse();
  return tempTimes;
};

export { getWakeUpTime, getSleepTime };
