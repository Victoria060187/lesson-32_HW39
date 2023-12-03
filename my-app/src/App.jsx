import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddContacts from './components/AddContacts/AddContacts';
import ContactsList from './components/ContactsList/ContactsList';

import './App.scss';

function App ()  {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const limitedData = data.slice(0, 7);
        setContacts(limitedData);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  const handleCancel = () => {
     
  };

  return (
    <Router>
    <div>
      <div className='header'>
        <Link to='/' className='header-button'>Contacts</Link>
        <Link to='/add' className='header-button'>Add Contact</Link>
      </div>
      <Routes>
        <Route exact path='/' element={<ContactsList contacts={contacts} onDeleteContact={handleDeleteContact} />} />
        <Route path='/add' element={<AddContacts onSaveContact={handleAddContact} onCancel={handleCancel} />} />
      </Routes>
    </div>
    </Router>
  );
};

export default App;
