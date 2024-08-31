import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../actions/Bookaction";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa"; 
import styles from "./Books.module.css";

const Book = ({ bookDetails }) => {
  const dispatch = useDispatch();

  const {
    id,
    book_name,
    price,
    author_name,
    photo_path: coverImageSrc
  } = bookDetails;

  const handleAddCart = () => {
    dispatch(addCart(id));
  };

  return (
    <div className={styles.card}>
      <div className={styles.coverImg}>
        <img src={coverImageSrc} alt={book_name} className={styles.coverImage} />
      </div>
      <div className={styles.details}>
        <h5 className={styles.bookTitle}>
          <Link className={styles.link} to={`/book/details/${id}`}>
            {book_name}
          </Link>
        </h5>
        <h6 className={styles.authorName}>
          By{" "}
          <span > - {author_name} </span>
        </h6>
        <p className={styles.price}>Price: {price}</p>
      </div>
      <div className={styles.iconContainer}>
        <Link to={`/book/details/${id}`} className={styles.iconLink}>
          <FaInfoCircle className={styles.iconDetails} />
        </Link>
        <FaShoppingCart className={styles.iconAddCart} onClick={handleAddCart} />
      </div>
    </div>
  );
};

export default Book;




