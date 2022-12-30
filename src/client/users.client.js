const baseUrl = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  return fetch(`${baseUrl}/users`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUser = async (userId) => {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addUser = async (userData) => {
  return fetch(`${baseUrl}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const editUser = async (userData, userId) => {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const deleteUser = async (userId) => {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
