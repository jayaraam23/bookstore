import { createSelector } from 'reselect';

export const selectBooks = state => state.books.books;
export const selectCartItems = state => state.books.carts;
export const selectSearchString = state => state.books.searchString;
export const selectSearchedBooks = state => state.books.searchedBooks;

export const selectBookById = (state, bookId) =>
  state.books.books.find(book => book.id === bookId);

export const selectTotalPrice = createSelector(
  [selectBooks, selectCartItems],
  (books, carts) => {
    return carts.reduce((total, cartItem) => {
      const book = books.find(book => book.id === cartItem.id);
      return book ? total + book.price * cartItem.quantity : total;
    }, 0).toFixed(2);
  }
);
