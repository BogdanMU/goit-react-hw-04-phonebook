import { useState, useEffect } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactForm } from './ContactsForm/ContactForm';
import { Wrap } from './App.styled';

export const App = () => {
  const LS = 'Stored Contacts';

  const [contacts, setContacts] = useState(() => {
    const restoredContacts = localStorage.getItem(LS);
    return restoredContacts !== null ? JSON.parse(restoredContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsToStore = JSON.stringify(contacts);
    localStorage.setItem(LS, contactsToStore);
  }, [contacts]);

  const onFilterInput = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const updateConntactsList = newContact => {
    if (
      contacts.filter(contact => {
        return contact.name
          .toLowerCase()
          .includes(newContact.name.toLowerCase());
      }).length !== 0
    ) {
      alert(`${newContact.name} is already in contact list`);
      return;
    }
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = id => {
    setContacts(
      contacts.filter(contact => {
        return contact.id !== id;
      })
    );
  };

  return (
    <Wrap>
      <h1>Phonebook</h1>
      <ContactForm updateConntactsList={updateConntactsList} />
      <h2>Contacts</h2>
      <ContactsFilter inputHandler={onFilterInput} />
      {contacts !== null ? (
        <ContactsList
          contacts={contacts}
          filter={filter}
          deleteFn={deleteContact}
        />
      ) : (
        <p>Add some friends!</p>
      )}
    </Wrap>
  );
};
