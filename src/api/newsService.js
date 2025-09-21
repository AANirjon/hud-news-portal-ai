import axios from "axios";

const BASE_URL = "http://localhost:5000"; // replace with your backend URL

export const getNews = async (token, email) => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
};
