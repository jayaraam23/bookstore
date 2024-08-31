import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchString, fetchSearchedBooks } from '../../actions/Bookaction';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; 
import styles from './Navbar.module.css';

const Search = () => {
  const [keywords, setKeywords] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); 
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.books.searchedBooks);

  const handleChange = e => {
    const value = e.target.value;
    setKeywords(value);
    dispatch(setSearchString(value));
  };

  useEffect(() => {
    if (keywords !== '') {
      dispatch(fetchSearchedBooks(keywords));
    }
  }, [keywords, dispatch]);

  return (
    <div className={styles.searchContainer}>
      <FaSearch 
        className={styles.searchIcon} 
        onClick={() => setIsSearchVisible(!isSearchVisible)} 
      />

      {(isSearchVisible || window.innerWidth >= 769) && (
        <input
          onChange={handleChange}
          className={styles.searchInput}
          type="search"
          placeholder="e.g. The Prophet"
          value={keywords}
        />
      )}

      {(isSearchVisible || window.innerWidth >= 769) && searchResults.length > 0 && (
        <ul className={styles.searchResults}>
          {searchResults.map(book => (
            <li key={book.id} className={styles.searchResultItem}>
              <Link to={`/book/details/${book.id}`}>{book.book_name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
