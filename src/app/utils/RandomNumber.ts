export const generateRandomNumber = () =>
  Math.floor(Math.random() * Math.pow(10, Math.random() * 8))
    .toString()
    .padStart(8, '0');
