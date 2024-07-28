import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import {
  fetchContacts,
  addContact,
  deleteContact,
  setFilter,
  selectVisibleContacts,
} from '../slices/contactSlice';
import '../styles/main.css';

const Contacts = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    const newContact = {
      name,
      number,
    };
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="divForm">
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default Contacts;
