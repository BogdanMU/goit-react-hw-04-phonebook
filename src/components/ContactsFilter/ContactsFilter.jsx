import PropTypes from 'prop-types';

export const ContactsFilter = ({ inputHandler }) => {
  return (
    <label htmlFor="filter">
      Find contacts by name
      <input type="text" name="filter" id="filter" onChange={inputHandler} />
    </label>
  );
};

ContactsFilter.propTypes = {
  inputHandler: PropTypes.func.isRequired,
};
