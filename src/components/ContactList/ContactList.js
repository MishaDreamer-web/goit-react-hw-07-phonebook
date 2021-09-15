import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contact-form';

import PropTypes from 'prop-types';

const ContactListItem = ({ name, number, onRemove }) => {
  return (
    <li>
      {name}: {number} <button onClick={onRemove}>delete</button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const ContactsList = () => {
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);
  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  const onRemove = id => dispatch(contactsOperations.deleteContact(id));

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {contacts.length === 0 && <p>There are no contacts in the list</p>}
      <ul>
        {contacts.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            name={name}
            number={number}
            onRemove={() => onRemove(id)}
          />
        ))}
      </ul>
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactsList;
