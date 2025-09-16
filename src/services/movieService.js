import AxiosConfig from "../axiosConfig";

const RESOURCE = "/api/movies";

export async function getAllMovies() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}

export async function getOneMovie(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createMovie(movie) {
  const response = await AxiosConfig.post(RESOURCE, movie);
  return response.data;
}

export async function updateMovie(movie) {
  const response = await AxiosConfig.put(`${RESOURCE}/${movie.id}`, movie);
  return response.data;
}

export async function deleteMovie(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}
