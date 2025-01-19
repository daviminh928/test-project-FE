import axios from 'axios';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for authentication cookies
});

// 🔹 User Authentication
export const login = async (name: string, email: string) => {
  await api.post('/auth/login', { name, email });
};

export const logout = async () => {
  await api.post('/auth/logout');
};

// 🔹 Fetch available dog breeds
export const fetchBreeds = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/dogs/breeds');
  return response.data;
};

// 🔹 Search for dogs
export const searchDogs = async (params: Record<string, string | number | string[]>): Promise<{ resultIds: string[]; total: number; next?: string }> => {
    const response = await api.get('/dogs/search', { params });
    return response.data;
};
  

// 🔹 Fetch dogs by IDs
export const fetchDogsByIds = async (ids: string[]) => {
  const response = await api.post('/dogs', ids);
  return response.data;
};

// 🔹 Match dog based on favorites
export const matchDogs = async (ids: string[]): Promise<string> => {
  const response = await api.post('/dogs/match', ids);
  return response.data.match;
};
