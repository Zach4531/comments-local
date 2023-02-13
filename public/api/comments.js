const DATA_URL = 'http://localhost:3000/api/data.json';

export const getComments = async () => {
  return await fetch(`${DATA_URL}`).then((res) => res.json());
};
