import React from 'react';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactList';
import Filter from './components/Filter';

const App = () => {
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />

      <ContactsList />
    </>
  );
};

export default App;
