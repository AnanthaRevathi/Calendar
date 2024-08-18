import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import styled from 'styled-components';

const AddEventForm = () => {
  const { handleAddEvent } = useEventContext();
  const [formData, setFormData] = useState({ title: '', date: '', category: 'Work' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEvent({ ...formData, id: Date.now() });
    setFormData({ title: '', date: '', category: 'Work' });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit">Add Event</button>
    </FormContainer>
  );
};

export default AddEventForm;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;