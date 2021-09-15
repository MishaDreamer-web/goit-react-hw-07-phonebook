import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/contact-form/contact-form-actions';
import { contactsSelectors } from 'redux/contact-form';

const Filter = () => {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      name="filter"
      value={value}
      onChange={e => dispatch(changeFilter(e.target.value))}
      placeholder="Enter name for Search"
    />
  );
};

export default Filter;
