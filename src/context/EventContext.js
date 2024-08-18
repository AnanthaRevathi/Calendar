// src/context/EventContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getEvents, addEvent, editEvent, deleteEvent } from '../services/api';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

const EventContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (event) => {
    try {
      const response = await addEvent(event);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      const response = await editEvent(updatedEvent);
      setEvents(events.map((event) => (event.id === updatedEvent.id ? response.data : event)));
    } catch (error) {
      console.error('Failed to edit event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, handleAddEvent, handleEditEvent, handleDeleteEvent, filter, setFilter }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
