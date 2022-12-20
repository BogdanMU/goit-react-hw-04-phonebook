import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ContactForm = ({ updateConntactsList }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    updateConntactsList(newContact);
    event.target.reset();

    setName('');
    setNumber('');
  };

  const onInput = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onInput}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onInput}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propType = {
  updateConntactsList: PropTypes.func.isRequired,
};
