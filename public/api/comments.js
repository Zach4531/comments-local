const DATA_URL = 'http://localhost:3000/api/comments';

export const getComments = async () => {
  const response = await fetch(`${DATA_URL}`);
  return response.json();
};
