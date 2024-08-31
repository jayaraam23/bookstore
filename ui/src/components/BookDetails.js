import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FaShoppingCart} from "react-icons/fa";
import { addCart } from "../actions/Bookaction";


import styles from "./Books.module.css";

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { books = [] } = useSelector(state => state.books || {});
  const book = books.find(book => book.id === parseInt(id, 10));
  
  if (!book) {
    return <div>Loading...</div>;
  }
  
  const { 
    book_name: title, 
    price, 
    author_name: authorName, 
    publisher_company: publisherCompany, 
    release_date: releaseDate, 
    description, 
    photo_path: coverImageSrc 
  } = book;

  const handleAddCart = () => {
    dispatch(addCart(id));
  };

  return (
    <div className={styles.container}>
    <div className={styles.bookDetails}>
        <div className={styles.bookImg}>
          <img className={styles.coverImage} src={coverImageSrc} alt={title} />
        </div>

         <div className={styles.contents}>
           <h1 className={styles.title}>{title}</h1>
           <h4 className={styles.author}>
                 By <span> - {authorName}</span>
            </h4>
        <p className={styles.description}>{description}</p>
        <h4 className={styles.price}>Price: ₹{price}</h4>
        <p className={styles.publisher}>Publisher: {publisherCompany}</p>
        <p className={styles.releaseDate}>Release Date: {releaseDate ? new Date(releaseDate).toDateString() : 'N/A'}</p>
        <button className={styles.addCartButton} onClick={handleAddCart}>
          Add to Cart <FaShoppingCart />
        </button>
      </div>
    </div>
  </div>
  );
};

export default BookDetails;


