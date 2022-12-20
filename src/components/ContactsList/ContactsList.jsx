import { DeleteBtn, List } from './ContactsList.styled';
import PropTypes from 'prop-types';

export const ContactsList = ({ contacts, filter, deleteFn }) => {
  return (
    <List>
      {contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(contact => {
          return (
            <li key={contact.id} id={contact.id}>
              {contact.name} : {contact.number}
              <DeleteBtn
                type="button"
                onClick={() => {
                  deleteFn(contact.id);
                }}
              >
                Delete
              </DeleteBtn>
            </li>
          );
        })}
    </List>
  );
};

// ContactsList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   deleteFn: PropTypes.func.isRequired,
//   filter: PropTypes.string.isRequired,
// };
