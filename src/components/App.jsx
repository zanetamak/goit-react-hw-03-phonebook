import { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

 export class App extends Component {
  constructor() {
    super();
    this.state = {
        contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
      filter: '',
      }
  }
   
   // metoda cyklu życiowego komponentu wywoływana po tym, jak komponent został umieszczony(zamontowany) 
   // w drzewie komponentów React. próba pobrania danych z lokalnego magazynu (localStorage) pod kluczem 'contacts'.
   componentDidMount() {
    //zwraca dane w postaci JSON (jeżeli dane istnieją), a następnie te dane są parsowane 
    try {
      const json = localStorage.getItem('contacts');
      const contacts = JSON.parse(json);

      if (contacts) {
        this.setState(() => ({ contacts: contacts }));
      }
    } catch (error) {
      console.log(error);
    }
  }
// metoda cyklu życiowego, która jest wywoływana po każdej aktualizacji komponentu.
   componentDidUpdate(prevProps, prevState) {
    if (prevProps.someProp !== this.props.someProp) {
      // Sprawdza, czy stan contacts został zmieniony w porównaniu do poprzedniego stanu 
      if (prevState.contacts !== this.state.contacts) {
        const json = JSON.stringify(this.state.contacts);
        localStorage.setItem('contacts', json);
      }
    }
  }



  
  addContact = e => {
    const loweredCase = e.name.toLowerCase().trim();

    const exists = this.state.contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${e.name} is already in contacts!`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, e],
      }));
    }
  };

  addFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  render() {
    const { filter } = this.state;

    return (
        <div>
          <ContactForm addContact={this.addContact} />
          <ContactList
            contacts={this.filteredContacts()}
            deleteContact={this.deleteContact}
          >
            <Filter filter={filter} addFilter={this.addFilter} />
          </ContactList>
        </div>
    );
  }
}



