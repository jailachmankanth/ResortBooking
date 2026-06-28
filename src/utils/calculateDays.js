export const calculateDays = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const diff = end - start;

  return diff / (1000 * 60 * 60 * 24);
};