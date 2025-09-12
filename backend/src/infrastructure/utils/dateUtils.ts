export const combineDateAndTime = (date: string, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const combinedDate = new Date(date);
  combinedDate.setHours(hours!, minutes, 0, 0);
  return combinedDate;
};
