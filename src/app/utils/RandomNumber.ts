export const generateRandomNumber = (quantity: number) => {
  let result = '';

  for (let index = 0; index < quantity; index++) {
    result += Math.floor(
      Math.random() * Math.pow(10, Math.random()),
    ).toString();
  }

  return result;
};
