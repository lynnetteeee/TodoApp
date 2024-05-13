let lastId = 0;

export const generateNewId = (): number => {
  lastId += 1;
  return lastId;
};
