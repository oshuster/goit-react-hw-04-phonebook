import { useState } from 'react';

import css from './contactForm.module.css';

const ContactForm = ({ saveContact }) => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    saveContact(formData);
    setFormData({
      name: '',
      number: '',
    });
  };

  const { name, number } = formData;
  return (
    <form className={css.save_form} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputName1" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          className="form-control"
          aria-describedby="nameHelp"
          required
          onChange={handleInput}
        />
        <div id="nameHelp" className="form-text">
          Please enter your name.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPhone1" className="form-label">
          Phone number
        </label>
        <input
          type="tel"
          className="form-control"
          id="exampleInputPhone1"
          name="number"
          value={number}
          onChange={handleInput}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add contact
      </button>
    </form>
  );
};

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleInput = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.saveContact(this.state);
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <form className={css.save_form} onSubmit={this.handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="exampleInputName1" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             className="form-control"
//             aria-describedby="nameHelp"
//             required
//             onChange={this.handleInput}
//           />
//           <div id="nameHelp" className="form-text">
//             Please enter your name.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPhone1" className="form-label">
//             Phone number
//           </label>
//           <input
//             type="tel"
//             className="form-control"
//             id="exampleInputPhone1"
//             name="number"
//             value={number}
//             onChange={this.handleInput}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

export default ContactForm;
