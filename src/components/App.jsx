import { Component } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactForm } from './ContactsForm/ContactForm';
import { Wrap } from './App.styled';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [...initialContacts],
    filter: '',
  };

  onFormInput = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  updateConntactsList = newContact => {
    if (
      this.state.contacts.filter(contact => {
        return contact.name
          .toLowerCase()
          .includes(newContact.name.toLowerCase());
      }).length !== 0
    ) {
      alert(`${newContact.name} is already in contact list`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => {
          return contact.id !== id;
        }),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <Wrap>
        <h1>Phonebook</h1>
        <ContactForm
          updateConntactsList={this.updateConntactsList}
        ></ContactForm>
        <h2>Contacts</h2>
        <ContactsFilter inputHandler={this.onFormInput}></ContactsFilter>
        <ContactsList
          contacts={contacts}
          filter={filter}
          deleteFn={this.deleteContact}
        ></ContactsList>
      </Wrap>
    );
  }
}
