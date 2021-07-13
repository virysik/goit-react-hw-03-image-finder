import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

export const fetchPhotos = async (query, page) => {
  const apiKey = "21690892-48d55623c78353d4b35edb4ee";
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
