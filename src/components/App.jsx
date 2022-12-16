import { Component } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactForm } from './ContactsForm/ContactForm';
import { Wrap } from './App.styled';

export class App extends Component {
  state = {
    contacts: null,
    filter: '',
  };

  LS = 'Stored Contacts';

  componentDidMount() {
    const restoredLocalData = JSON.parse(localStorage.getItem(this.LS));
    this.setState({ contacts: restoredLocalData });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const contactsToStore = JSON.stringify(this.state.contacts);
      localStorage.setItem(this.LS, contactsToStore);
    }
  }

  onFormInput = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  updateConntactsList = newContact => {
    if (this.state.contacts === null) {
      return this.setState({ contacts: [newContact] });
    }
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
        <ContactForm updateConntactsList={this.updateConntactsList} />
        <h2>Contacts</h2>
        <ContactsFilter inputHandler={this.onFormInput} />
        {this.state.contacts !== null ? (
          <ContactsList
            contacts={contacts}
            filter={filter}
            deleteFn={this.deleteContact}
          />
        ) : (
          <p>Add some friends!</p>
        )}
      </Wrap>
    );
  }
}
