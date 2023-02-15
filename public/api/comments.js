const DATA_URL = 'http://localhost:4000';

export const getComments = async () => {
  const response = await fetch(`${DATA_URL}/comments`);
  return response.json();
};

export const getUser = async () => {
  const response = await fetch(`${DATA_URL}/currentUser`);
  return response.json();
};

export const addComments = async (content) => {
  const response = await fetch(`${DATA_URL}/comments/${id}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(content),
  });
  return response.json();
};

export const updateComments = async ({ id, content }) => {
  const response = await fetch(`${DATA_URL}/comments/${id}`, {
    method: 'put',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(content),
  });
  return response.json();
};

export const deleteComments = async ({ id }) => {
  const response = await fetch(`${DATA_URL}/comments/${id}`, {
    method: 'delete',
  });
  return response.json();
};
