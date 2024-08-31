import {
  FETCH_BOOKS,
  ADD_CART,
  UPDATE_CART,
  REMOVE_CART,
  SET_SEARCH_STRING,
  SET_SEARCHED_BOOKS,
  CLEAR_SEARCH,
} from '../actions/actionTypes';

const initialState = {
  books: [],
  carts: [],
  searchString: '',
  searchedBooks: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: action.payload };
    case ADD_CART:
      return { ...state, carts: [...state.carts, action.payload] };
    case UPDATE_CART:
      return {
        ...state,
        carts: state.carts.map(cartItem =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: action.payload.quantity }
            : cartItem
        ),
      };
    case REMOVE_CART:
      console.log('Current carts:', state.carts);
      console.log('Removing cart item with id:', action.payload);
      return {
        ...state,
        carts: state.carts.filter(cartItem => cartItem !== action.payload),  
      };
    
    case SET_SEARCH_STRING:
      return { ...state, searchString: action.payload };
    case SET_SEARCHED_BOOKS:
      return { ...state, searchedBooks: action.payload };
    case CLEAR_SEARCH:
      return { ...state, searchedBooks: [], searchString: '' };
    default:
      return state;
  }
};

export default booksReducer;

