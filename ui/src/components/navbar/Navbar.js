import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  FaShoppingCart } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import Search from './Search';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.books.carts);
 
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/user/login');
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
          <span>BookStore</span>
        </div>

        <div className={styles.searchContainer}>
          <Search />
        </div>

        <div className={styles.iconsContainer}>
          <div className={styles.userIcon} onClick={handleLogout}>
            <IoLogOut size={30} />
          </div>
          <Link className={styles.cartButton} to="/book/cart">
            <FaShoppingCart />
            <span className={styles.cartCount}>
              {cartItems.length !== 0 ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;