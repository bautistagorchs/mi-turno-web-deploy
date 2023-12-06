export function dateComparator(frontDate, backDate) {
  const newFrontDate = dateConversor(frontDate);
  const newBackDate = dateConversor(backDate);
  return dateConversor(frontDate) === dateConversor(backDate);
}

export function dateConversor(date) {
  const materialUidate = new Date(date);
  const materialUiTime = materialUidate.getTime();
  return materialUiTime;
}
export function hourGetter() {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, "0");
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  return `${currentHour}:${currentMinutes}`;
}
export function todayGetter() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  return `${currentYear}-${currentMonth}-${currentDay}`;
}
export function calculateTimeSlots(openingTime, closingTime, capacity) {
  let startTime;
  openingTime[0] === "0"
    ? (startTime = openingTime.slice(1, 2))
    : (startTime = openingTime.slice(0, 2));
  const endTime = closingTime.slice(0, 2);
  const availableSlotsForCapacityOfOne = Math.abs(
    parseInt(openingTime) - parseInt(closingTime)
  );

  const totalSlots = Math.floor(60 / 15) * availableSlotsForCapacityOfOne;
  const timeSlots = [];

  for (let i = 0; i < totalSlots; i++) {
    const hour = Math.floor((i * 15) / 60) + parseInt(startTime);
    const minute = (i * 15) % 60;

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    timeSlots.push(`${formattedHour}:${formattedMinute}`);
  }

  return timeSlots;
}

export function OcurrencyChecker(array, object) {
  return array.forEach((x) => {
    object[x] = (object[x] || 0) + 1;
  });
}
