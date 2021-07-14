import { apiKey } from "./apiKey";
import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

export const fetchPhotos = async (query, page) => {
  const params = `?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
  const { data } = await axios.get(params);
  return data.hits;
};
