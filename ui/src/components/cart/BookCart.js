import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../selectors/bookSelectors';
import BookCartItem from './BookCartItem';
import BookCartCheckOut from './BookCartCheckOut';
import styles from './BookCart.module.css';

const BookCart = () => {
  const carts = useSelector(selectCartItems);

  const countFrequency = (data) => {
    return data.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };

  const itemFrequency = countFrequency(carts);

  const cartItems = Object.entries(itemFrequency).map(([id, quantity]) => ({
    id: parseInt(id, 10),
    quantity
  }));

  if (cartItems.length === 0) {
    return (
      <h1 className={styles.emptyCartMessage}>
        Your cart is Empty. Add Some.
      </h1>
    );
  } else {
    return (
      <div className={styles.bookCartContainer}>
        <h1 className={styles.cartHeading}>Book Cart</h1>
        <div className={styles.cartItemsContainer}>
          {cartItems.map(cart => (
            <BookCartItem key={cart.id} cart={cart} />
          ))}
        </div>
        <BookCartCheckOut />
      </div>
    );
  }
};

export default BookCart;

