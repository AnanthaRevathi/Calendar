import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useEventContext } from '../context/EventContext';
import EventModal from './EventModal';
import AddEventForm from './AddEventForm';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
  const { events, filter, setFilter } = useEventContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(event => event.category === filter);

  const eventsOnSelectedDate = filteredEvents.filter(
    (event) => new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <Container>
      <h1>Monthly Calendar</h1>
      <Filter>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </Filter>
      <CalendarWrapper>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date }) => {
            const hasEvent = filteredEvents.some(
              (event) => new Date(event.date).toDateString() === date.toDateString()
            );
            return hasEvent ? <Dot>•</Dot> : null;
          }}
        />
      </CalendarWrapper>
      <EventList>
        {eventsOnSelectedDate.length > 0 ? (
          eventsOnSelectedDate.map((event) => (
            <EventItem key={event.id} onClick={() => openModal(event)}>
              <strong>{event.title}</strong> - {event.category}
            </EventItem>
          ))
        ) : (
          <p>No events for this date.</p>
        )}
      </EventList>
      {isModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <AddEventForm />
    </Container>
  );
};

export default CalendarPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  margin: 20px;
`;

const EventList = styled.div`
  margin-top: 20px;
`;

const EventItem = styled.div`
  cursor: pointer;
  margin: 10px 0;
`;

const Dot = styled.span`
  color: red;
`;

const Filter = styled.div`
  margin: 10px;
  select {
    padding: 5px;
  }
`;