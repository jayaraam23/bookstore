import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectBooks, selectCartItems } from "../selectors/bookSelectors";
import styles from "./BookCart.module.css"; 

const BookCartCheckOut = () => {
  const books = useSelector(selectBooks);
  const carts = useSelector(selectCartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingCost = 50;

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

  const getSubtotal = useCallback(() => {
    let subtotal = 0;
    cartItems.forEach(cart => {
      const book = books.find(book => book.id === cart.id);
      if (book) {
        subtotal += book.price * cart.quantity;
      }
    });
    return subtotal.toFixed(2);
  }, [books, cartItems]);

  useEffect(() => {
    const subtotal = getSubtotal();
    const tempTotal = (parseFloat(subtotal) + shippingCost).toFixed(2);
    setTotalPrice(tempTotal);
  }, [getSubtotal, shippingCost]);

  const subtotal = getSubtotal();

  return (
    <div className={styles.container}>
      <div className={styles.checkoutArea}>
        <h1 className={styles.heading}>Total</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>₹{subtotal}</td>
            </tr>
            <tr>
              <td>Shipping Cost</td>
              <td>₹{shippingCost}</td>
            </tr>
            <tr className={styles.totalRow}>
              <td>Total</td>
              <td>₹{totalPrice}</td>
            </tr>
            <tr>
              <td>
                <Link className={styles.backToShoppingButton} to="/user/dashboard">
                  Back To Shopping
                </Link>
              </td>
              <td>
                <button
                  className={styles.checkoutButton}
                  onClick={() => {
                    alert("Checking out");
                  }}
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookCartCheckOut;