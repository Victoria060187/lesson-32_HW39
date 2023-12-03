import { useState } from 'react';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import './ContactsList.scss';

const ContactsList = ({ contacts, onDeleteContact }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (contactId) => {
    setSelectedContact(contactId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteContact(selectedContact);
    setSelectedContact(null);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setSelectedContact(null);
    setShowModal(false);
  };

  return (
    <div>
      <h1>Contacts List</h1>
      <table>
      <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.username}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleDeleteClick(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ContactsList;