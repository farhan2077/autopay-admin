const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

export const getTransactions = async () => {
  return fetch(`${baseUrl}/transactions`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
