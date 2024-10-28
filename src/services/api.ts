import axios from "axios";
import { FetchImagesResponse } from "../types";

const BASE_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "q8PFD5V9m0_A-J8nvO2S__QNvIayKyTqVwSMCqKasPU";

export const fetchImages = async (
  page: number,
  query: string
): Promise<FetchImagesResponse> => {
  const response = await axios.get<FetchImagesResponse>(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  return response.data;
};
