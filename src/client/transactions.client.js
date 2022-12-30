const baseUrl =
  process.env.NOVE_ENV === ("production" || "Production")
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export const getTransactions = async () => {
  return fetch(`${baseUrl}/transactions`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
