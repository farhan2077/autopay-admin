const baseUrl =
  process.env.NOVE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const getVehicles = async () => {
  return fetch(`${baseUrl}/vehicles`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createVehicle = async (vehicleData) => {
  return fetch(`${baseUrl}/vehicles`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicleData),
  });
};
