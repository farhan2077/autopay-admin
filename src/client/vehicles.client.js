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

export const getVehicle = async (vehicleId) => {
  return fetch(`${baseUrl}/vehicles/${vehicleId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addVechicle = async (vehicleData) => {
  return fetch(`${baseUrl}/vehicles`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicleData),
  });
};

export const editVehicle = async (vehicleData, vehicleId) => {
  return fetch(`${baseUrl}/vehicles/${vehicleId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicleData),
  });
};

export const deleteVehicle = async (vehicleId) => {
  return fetch(`${baseUrl}/vehicles/${vehicleId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
