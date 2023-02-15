const DATA_URL = 'http://localhost:4000';

export const getComments = async () => {
  const response = await fetch(`${DATA_URL}/comments`);
  return response.json();
};

export const getUser = async () => {
  const response = await fetch(`${DATA_URL}/currentUser`);
  return response.json();
};

export const addComments = async ({ content, username }) => {
  const response = await fetch(`${DATA_URL}/comments`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: Math.floor(Math.random() * 1000) + 5,
      content: content,
      createdAt: new Date().toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      score: 0,
      username: username,
      replies: [],
    }),
  });
  return response.json();
};

export const deleteComments = async ({ id }) => {
  const response = await fetch(`${DATA_URL}/comments/${id}`, {
    method: 'delete',
  });
  return response.json();
};
