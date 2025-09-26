export const CombineDateAndTime = (date: string, time: string): Date => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const utcDate = Date.UTC(year!, month! - 1, day, hours, minutes, 0, 0);
  return new Date(utcDate);
};
