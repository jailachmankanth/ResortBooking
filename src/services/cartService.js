import axios from "axios";

const BASE_URL = "http://localhost:3000/data";

export const getUserCart = async (userId) => {
  const response = await axios.get(`${BASE_URL}/carts/${userId}`);
  return response.data;
};

export const getResorts = async () => {
  const response = await axios.get(`${BASE_URL}/resorts`);
  return response.data;
};

export const getActivities = async () => {
  const response = await axios.get(`${BASE_URL}/activities`);
  return response.data;
};