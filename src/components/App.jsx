import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { loadStorage, saveStorage } from './helpers/localeStorage';

import css from './app.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  regExpPattern = {
    name: new RegExp(
      "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    ),
    number: new RegExp(
      '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}'
    ),
  };

  saveContact = ({ name, number }) => {
    const { contacts } = this.state;
    // перевірка на коректність введених даних
    if (
      this.regExpPattern.name.test(name) &&
      this.regExpPattern.number.test(number)
    ) {
      // перевірка на наявність контакту по номеру
      if (!contacts.some(contact => contact.number === number)) {
        this.setState({
          contacts: [...contacts, { id: nanoid(), name, number }],
        });
      } else {
        alert('Такий контакт вже існує');
        return;
      }
    } else {
      alert('Введені дані некоректні');
      return;
    }
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const newList = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: [...newList] });
  };

  getFilteredContacts = () => {
    const { contacts, filter: filterKey } = this.state;
    if (!filterKey) {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filterKey)
      );
    }
  };

  componentDidUpdate = () => {
    saveStorage('contacts', this.state.contacts);
  };

  componentDidMount = () => {
    this.setState({ contacts: loadStorage('contacts') });
  };

  filterKey = key => {
    this.setState({ filter: `${key}` });
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm saveContact={this.saveContact} />
        <h2>Contacts</h2>
        <Filter filterKey={this.filterKey} />
        <ContactList
          contactlist={this.getFilteredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
