// import { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../redux/filterSlice';
import { selectFilter, selectContacts } from '../redux/selectors';
import { fetchContacts } from '../redux/operations';
import { addContact, removeContact } from '../redux/operations';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addContactInputRef = useRef();

  const contactList = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const contactAdd = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const id = nanoid();
    const newContact = { id: id, name: name, phone: number };
    dispatch(addContact(newContact));
    form.reset();
  };

  const handleFilterChange = e => {
    const searchTerm = e.target.value;
    const filteredContacts = contactList.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(filterContacts(filteredContacts));

    if (searchTerm === '') {
      dispatch(filterContacts(''));
    }
  };

  const remove = e => {
    const number = e.currentTarget.attributes.number.value;
    console.log(number);
    dispatch(removeContact(number));

    if (filter !== '') {
      const newFilter = [...filter];
      const index = filter.findIndex(contact => contact.number === number);
      newFilter.splice(index, 1);
      dispatch(filterContacts(newFilter));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm inputRef={addContactInputRef} add={contactAdd} />
      <h2>Contacts</h2>
      <Filter filter={handleFilterChange} />
      <ContactList contacts={contactList} delite={remove} filter={filter} />
    </div>
  );
};
