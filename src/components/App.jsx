import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { loadStorage, saveStorage } from './helpers/localeStorage';

import css from './app.module.css';

const KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const regExpPattern = {
    name: new RegExp(
      "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    ),
    number: new RegExp(
      '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}'
    ),
  };

  const saveContact = ({ name, number }) => {
    // перевірка на коректність введених даних
    if (regExpPattern.name.test(name) && regExpPattern.number.test(number)) {
      // перевірка на наявність контакту по номеру
      if (!contacts.some(contact => contact.number === number)) {
        console.log('name', name);
        console.log('number', number);
        setContacts(prevState =>
          setContacts([...prevState, { id: nanoid(), name, number }])
        );
      } else {
        alert('Такий контакт вже існує');
        return;
      }
    } else {
      alert('Введені дані некоректні');
      return;
    }
  };

  const deleteContact = id => {
    const newList = contacts.filter(contact => contact.id !== id);
    setContacts(newList);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      );
    }
  };

  //on load page
  useEffect(() => {
    const contactList = loadStorage(KEY);
    if (contactList) {
      setContacts(contactList);
    } else {
      setContacts([]);
    }
  }, []);

  //on update state
  useEffect(() => {
    saveStorage(KEY, contacts);
  }, [contacts]);

  const filterKey = key => {
    setFilter(key);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm saveContact={saveContact} />
      <h2>Contacts</h2>
      <Filter filterKey={filterKey} />
      <ContactList
        contactlist={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
