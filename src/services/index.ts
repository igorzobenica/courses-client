import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchCourses = async (searchQuery: string) => {
  try {
    const response = await axios.get(`${apiUrl}/courses`, {
      params: { search: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};