import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import styles from './admin.module.css';

// Use a relative URL for proxy handling in development
const BASE_URL = '';

const Admindashboard = ({ handleSubmit, reset }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin/login');
  };

  const handleFormSubmit = (values) => {
    const formDataToSend = new FormData();
    Object.keys(values).forEach((key) => {
      formDataToSend.append(key, values[key]);
    });

    fetch(`${BASE_URL}/upload-book`, {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload book');
        }
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          alert('Book uploaded successfully');
          reset();
        } else {
          alert('Failed to upload book');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" /> <span>BookStore</span>
        </div>
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <div className={styles.headerTitle}>Add Book</div>

        <div className={styles.formGroup}>
          <label htmlFor="bookName" className={styles.label}>Book Name</label>
          <Field
            name="bookName"
            component="input"
            type="text"
            className={styles.input}
            placeholder="Enter the book name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>Price</label>
          <Field
            name="price"
            component="input"
            type="number"
            className={styles.input}
            placeholder="Enter the price"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="authorName" className={styles.label}>Author Name</label>
          <Field
            name="authorName"
            component="input"
            type="text"
            className={styles.input}
            placeholder="Enter the author name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="publisherCompany" className={styles.label}>Publisher Company</label>
          <Field
            name="publisherCompany"
            component="input"
            type="text"
            className={styles.input}
            placeholder="Enter the publisher company"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="releaseDate" className={styles.label}>Release Date</label>
          <Field
            name="releaseDate"
            component="input"
            type="date"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <Field
            name="description"
            component="textarea"
            className={styles.textarea}
            placeholder="Enter a description"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="uploadOption" className={styles.label}>Upload Photo As</label>
          <Field
            name="uploadOption"
            component="select"
            className={styles.input}
          >
            <option value="file">Upload File</option>
            <option value="url">Image URL</option>
          </Field>
        </div>

        <Field name="photo" component="input" type="file" accept="image/*" style={{ display: 'none' }} />
        <Field name="photoUrl" component="input" type="url" placeholder="Enter image URL" className={styles.input} />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.bookName) {
    errors.bookName = 'Required';
  }
  if (!values.price) {
    errors.price = 'Required';
  }
  if (!values.authorName) {
    errors.authorName = 'Required';
  }
  if (!values.publisherCompany) {
    errors.publisherCompany = 'Required';
  }
  if (!values.releaseDate) {
    errors.releaseDate = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  if (values.uploadOption === 'file' && !values.photo) {
    errors.photo = 'Required';
  }
  if (values.uploadOption === 'url' && !values.photoUrl) {
    errors.photoUrl = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'addBookForm',
  validate,
})(Admindashboard);
