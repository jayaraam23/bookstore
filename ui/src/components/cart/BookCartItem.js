import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart, removeCart } from "../../actions/Bookaction";
import { selectBooks } from "../selectors/bookSelectors";
import styles from './BookCart.module.css';

const BookCartItem = ({ cart }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  
  const { id, quantity } = cart;

  const [newQuantity, setNewQuantity] = useState(quantity);

  const book = books.find(book => book.id === id);
  
  if (!book) return null; 

  const { book_name: title, photo_path: coverImageSrc, price, author_name: authorName} = book;

  const handleCartRemove = () => {
    console.log('Removing cart item with id:', id);
    const action = removeCart(id);
    console.log('Dispatching action:', action);
    dispatch(action);
  };
  
  

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value > 0) {
      setNewQuantity(value);
      dispatch(updateCart(id, value));
    } else {
      alert("Please enter a value greater than or equal to 1");
      setNewQuantity(1);
      dispatch(updateCart(id, 1));
    }
  };

  return (
    <div className={styles.bookItem}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.productCover}>
            <img className={styles.coverImage} src={coverImageSrc} alt={title} />
          </div>
        </div>
        <div className={styles.col}>
          <h4>
            <Link className={styles.link} to={`/book/details/${id}`}>{title}</Link>
          </h4>
          <h6>
            By <span>{authorName}</span>
          </h6>
          <h5>Price: ₹{price}</h5>
          <h5>Total Price: ₹{(price * newQuantity).toFixed(2)}</h5>
        </div>
        <div className={styles.col}>
          <input
            onChange={handleQuantityChange}
            className={styles.inputQuantity}
            type="number"
            min="1"
            value={newQuantity}
          />
        </div>
        <div className={styles.col}>
          <button onClick={handleCartRemove} className={styles.removeButton}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCartItem;


