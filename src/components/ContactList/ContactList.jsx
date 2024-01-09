import { Component } from 'react';
import css from './contactList.module.css';

class ContactList extends Component {
  getId = e => {
    const id = e.target.dataset.id;
    this.props.deleteContact(id);
  };
  render() {
    const { contactlist } = this.props;
    const elements = contactlist.map(contact => (
      <li key={contact.id} className={css.list_item}>
        <span className={css.list_title}>
          {contact.name}: {contact.number}
        </span>
        <button
          data-id={contact.id}
          type="button"
          className={`btn btn-primary btn-sm ${css.button}`}
          onClick={this.getId}
        >
          Delete
        </button>
      </li>
    ));
    return <ul className="list-group">{elements}</ul>;
  }
}

export default ContactList;
