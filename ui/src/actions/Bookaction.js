import {
    FETCH_BOOKS,
    ADD_CART,
    UPDATE_CART,
    REMOVE_CART,
    SET_SEARCH_STRING,
    SET_SEARCHED_BOOKS,
    CLEAR_SEARCH,
} from './actionTypes';

const BASE_URL = '/api'; // Use relative URL, the proxy will handle it

export const fetchBooks = () => async dispatch => {
    try {
        const response = await fetch(`${BASE_URL}/books`);

        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: FETCH_BOOKS,
                payload: data,
            });
        } else {
            console.error('Failed to fetch books:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

export const fetchSearchedBooks = (searchString) => async dispatch => {
    try {
        const isIdSearch = !isNaN(searchString);
        const url = isIdSearch
            ? `${BASE_URL}/books/search?id=${searchString}`
            : `${BASE_URL}/books/search?query=${searchString}`;

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            dispatch(setSearchedBooks(data));
        } else {
            console.error('Failed to fetch searched books:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching searched books:', error);
    }
};

export const addCart = (book) => ({
    type: ADD_CART,
    payload: book,
});

export const updateCart = (id, quantity) => ({
    type: UPDATE_CART,
    payload: { id, quantity },
});

export const removeCart = (id) => ({
    type: REMOVE_CART,
    payload: id,
});

export const setSearchString = (searchString) => ({
    type: SET_SEARCH_STRING,
    payload: searchString,
});

export const setSearchedBooks = (books) => ({
    type: SET_SEARCHED_BOOKS,
    payload: books,
});

export const clearSearch = () => ({
    type: CLEAR_SEARCH,
});
