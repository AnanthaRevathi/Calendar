import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarPage from './components/CalendarPage';
import EventContextProvider from './context/EventContext';

function App() {
  return (
    <EventContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
        </Routes>
      </Router>
    </EventContextProvider>
  );
}

export default App;
