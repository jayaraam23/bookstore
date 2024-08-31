import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Book from "../../components/Book";
import { clearSearch, fetchBooks } from '../../actions/Bookaction';

import styles from './userDashboard.module.css';

const UserDashboard = () => {
    const books = useSelector(state => state.books.books || []);
    const searchedBooks = useSelector(state => state.searchedBooks || []);
    const searchString = useSelector(state => state.searchString || null);

    const dispatch = useDispatch();

    const handleClearSearch = () => {
        dispatch(clearSearch());
    };

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>
                    {searchString ? (
                        <Fragment>
                            Searching for '{searchString}'
                            <span onClick={handleClearSearch} className={styles.button}>
                                X
                            </span>
                        </Fragment>
                    ) : (
                        "All Books"
                    )}
                </h1>
                <div className={styles.row}>
                    {(searchedBooks.length === 0 ? books : searchedBooks).map(book => (
                        <div key={book.id} className={styles.bookCard}>
                            <Book bookDetails={book} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserDashboard;


