// src/pages/UpdateEventPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventContext";

const UpdateEventPage = () => {
  const { id } = useParams();
  const { events, editEvent } = useEventContext();
  const [event, setEvent] = useState({ title: "", date: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const existingEvent = events.find((e) => e.id === parseInt(id));
    if (existingEvent) setEvent(existingEvent);
  }, [id, events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editEvent({ ...event, id: parseInt(id) });
    navigate("/");
  };

  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={event.title}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Event</button>
    </form>
  );
};

export default UpdateEventPage;
