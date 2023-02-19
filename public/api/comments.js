const DATA_URL = 'http://localhost:4000';

export const getComments = async () => {
  const response = await fetch(`${DATA_URL}/all-comments`);
  return response.json();
};

export const getUser = async () => {
  const response = await fetch(`${DATA_URL}/currentUser`);
  return response.json();
};

export const addComments = async (content) => {
  const response = await fetch(`${DATA_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(content),
  });
  return response.json();
};

export const addReplies = async (content) => {
  const response = await fetch(`${DATA_URL}/replies`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(content),
  });
  return response.json();
};

export const updateComments = async ({ id, content }) => {
  const response = await fetch(`${DATA_URL}/comments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(content),
  });
  return response.json();
};

export const updateReplies = async ({ id, content }) => {
  const response = await fetch(`${DATA_URL}/replies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(content),
  });
  return response.json();
};

export const deleteComments = async ({ id }) => {
  const response = await fetch(`${DATA_URL}/comments/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const deleteReplies = async ({ id }) => {
  const response = await fetch(`${DATA_URL}/replies/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
