import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import styled from 'styled-components';

const EventModal = ({ event, closeModal }) => {
  const { handleEditEvent, handleDeleteEvent } = useEventContext();
  const [formData, setFormData] = useState(event);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    handleEditEvent(formData);
    closeModal();
  };

  const handleDelete = () => {
    handleDeleteEvent(event.id);
    closeModal();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Edit Event</h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <Buttons>
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </Buttons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;