import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        if (window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post("/auth/login", data),
  register: (data: { name: string; email: string; password: string; phone?: string }) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
};

// Rooms
export const roomsAPI = {
  getAll: (params?: Record<string, string | number | boolean>) => api.get("/rooms", { params }),
  getOne: (id: string) => api.get(`/rooms/${id}`),
  create: (data: Record<string, unknown>) => api.post("/rooms", data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/rooms/${id}`, data),
  delete: (id: string) => api.delete(`/rooms/${id}`),
};

// Bookings
export const bookingsAPI = {
  getAll: (params?: Record<string, string | number>) => api.get("/bookings", { params }),
  getOne: (id: string) => api.get(`/bookings/${id}`),
  create: (data: Record<string, unknown>) => api.post("/bookings", data),
  updateStatus: (id: string, data: { status: string; notes?: string }) => api.put(`/bookings/${id}/status`, data),
  delete: (id: string) => api.delete(`/bookings/${id}`),
  checkAvailability: (params: { roomId: string; checkIn: string; checkOut: string }) =>
    api.get("/bookings/check-availability", { params }),
  getStats: () => api.get("/bookings/stats"),
};

// Gallery
export const galleryAPI = {
  getAll: (params?: Record<string, string | boolean>) => api.get("/gallery", { params }),
  add: (data: Record<string, unknown>) => api.post("/gallery", data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/gallery/${id}`, data),
  delete: (id: string) => api.delete(`/gallery/${id}`),
};

// Amenities
export const amenitiesAPI = {
  getAll: (params?: Record<string, string | boolean>) => api.get("/amenities", { params }),
  getAllAdmin: () => api.get("/amenities/all"),
  create: (data: Record<string, unknown>) => api.post("/amenities", data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/amenities/${id}`, data),
  delete: (id: string) => api.delete(`/amenities/${id}`),
};

// Inquiries
export const inquiriesAPI = {
  getAll: (params?: Record<string, string>) => api.get("/inquiries", { params }),
  create: (data: Record<string, unknown>) => api.post("/inquiries", data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/inquiries/${id}`, data),
  delete: (id: string) => api.delete(`/inquiries/${id}`),
};

// Upload — multipart/form-data, returns { success, url, filename }
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteFile: (filename: string) => api.delete(`/upload/${filename}`),
};

export default api;
