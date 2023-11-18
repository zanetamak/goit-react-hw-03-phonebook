import PropTypes from 'prop-types'
import React from 'react';
import css from './ContactList.module.css'

const ContactList = ({ contacts, children, deleteContact }) => (
  <div className={css.contacts}>
    <h2>Contacts</h2>
    <p>Find contact by name</p>
    {children}
        <ul className={css.contactsList}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.contactsItem} key={id}>
          <p className={css.contactsName}>{name}</p>
          <p className={css.contactsNumber}>{number}</p>
          <button
            onClick={() => {
              deleteContact(id);
            }}
            className={css.contactsBtn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func,
};

export default ContactList

     // uzycie id, name, number przez desktrukturyzacje