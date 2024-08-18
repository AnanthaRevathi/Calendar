// src/components/EventDetailsPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useEventContext } from "../context/EventContext";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { events } = useEventContext();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.date}</p>
    </div>
  );
};

export default EventDetailsPage;
