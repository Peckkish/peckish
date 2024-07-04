import { createClient, PhotosWithTotalResults } from "pexels";

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

export async function getImage(searchQuery: string) {
  try {
    const query = searchQuery;
    const response = (await client.photos.search({
      query,
      per_page: 1,
    })) as PhotosWithTotalResults;
    console.log(response);
    return response.photos[0].src.medium;
  } catch (error) {
    throw new Error("Failed to get image.");
  }
}
