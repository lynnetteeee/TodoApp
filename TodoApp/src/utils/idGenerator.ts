let lastId = 1000;

export const generateNewId = (): number => {
  lastId += 1;
  return lastId;
};
