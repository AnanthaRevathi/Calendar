// src/components/EventList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import "./EventList.css";

const EventList = () => {
  const { events, deleteEvent } = useEventContext();

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id} className="event-item">
          <Link to={`/event/${event.id}`}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
          </Link>
          <button onClick={() => deleteEvent(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
