// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001';  // Replace with your Beeceptor endpoint

export const getEvents = () => axios.get(`${API_URL}/events`);
export const addEvent = (event) => axios.post(`${API_URL}/events`, event);
export const editEvent = (event) => axios.put(`${API_URL}/events/${event.id}`, event);
export const deleteEvent = (eventId) => axios.delete(`${API_URL}/events/${eventId}`);
