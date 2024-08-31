import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  books: booksReducer,
  form: formReducer, 
  // other reducers can be added here
});

export default rootReducer;

