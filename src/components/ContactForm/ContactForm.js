import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsSelectors, contactsOperations } from 'redux/contact-form';

import shortid from 'shortid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const dispatch = useDispatch();

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleChangeForm = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (contacts.find(contact => contact.name === e.target.name.value)) {
      alert(`${e.target.name.value} is already in contacts`);
      return;
    }

    if (contacts.find(contact => contact.number === e.target.number.value)) {
      alert(`Number ${e.target.number.value} is already in contacts`);
      return;
    }

    if ((!name || name.trim() === '') && (!number || number.trim() === '')) {
      alert('Fill in the fields "Name" and "Number"');
      return;
    }

    if (!name || name.trim() === '') {
      alert('Field "Name" is empty');
      return;
    }

    if (!number || number.trim() === '') {
      alert('Field "Number" is empty');
      return;
    }

    dispatch(contactsOperations.addContact(name, number));

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        id={nameInputId}
        type="text"
        name="name"
        placeholder="Enter name"
        value={name}
        onChange={handleChangeForm}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
      />
      <input
        id={numberInputId}
        type="tel"
        name="number"
        placeholder="Enter phone number"
        value={number}
        onChange={handleChangeForm}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
