import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchCourses = async ({
  searchQuery,
  page = 1,
  pageSize = 9,
  category,
  deliveryMethod,
  location,
  language,
  startDate,
}: {
  searchQuery: string;
  page: number;
  pageSize?: number;
  category?: string;
  deliveryMethod?: string;
  location?: string;
  language?: string;
  startDate?: Date;
}) => {
  try {
    const response = await axios.get(`${apiUrl}/courses`, {
      params: {
        search: searchQuery,
        page,
        pageSize,
        category,
        deliveryMethod,
        location,
        language,
        startDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const fetchCourseById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const fetchLocations = async () => {
  try {
    const response = await axios.get(`${apiUrl}/locations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchDeliveryMethods = async () => {
  try {
    const response = await axios.get(`${apiUrl}/deliveries`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    throw error;
  }
};

export const submitStudentInfo = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseId: string;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/students`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting student information:', error);
    throw error;
  }
};
