import axios from "axios";

// Create an axios instance with a base URL.
// This is helpful so you don't have to type the full URL for every request.

const api = axios.create({
    baseURL: "http://localhost:8080/api", // Adjust if your server runs on a different port
});

// --- Lot Functions ---
export const getLots = () => api.get("/lots");
export const createLot = (lotData) => api.post("/lots", lotData);

// --- User Functions ---
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);

// --- Reservation Functions ---
export const createReservation = (reservationData) => api.post("/reservations", reservationData);
export const getMyReservations = (userId) => api.get(`/reservations?userId=${userId}`);

// --- Vehicle Functions ---
export const getVehiclesByUserId = (userId) => api.get(`/vehicles/user/${userId}`);


const apiClient = {
    getLots,
    createLot,
    getUsers,
    getUserById,
    createReservation,
    getMyReservations,
    getVehiclesByUserId,
};

export default apiClient;