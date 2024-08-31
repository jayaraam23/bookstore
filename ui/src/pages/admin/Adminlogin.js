import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin.module.css';

const Adminlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const imageRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      if (imageRef.current) {
        const { naturalWidth: width, naturalHeight: height } = imageRef.current;
        setAspectRatio(width / height);
        setImageLoaded(true);
      }
    };

    const img = imageRef.current;
    img?.addEventListener('load', handleLoad);
    return () => img?.removeEventListener('load', handleLoad);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/admin/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        alert('Login Successful');
        navigate('/admin/dashboard');
      } else {
        localStorage.removeItem('isAuthenticated');
        setError('Login Failed');
      }
    } catch {
      setError('Login Failed due to a network issue');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.imageContainer}>
          <div
            className={styles.imagePadding}
            style={{ paddingTop: imageLoaded ? `${(1 / aspectRatio) * 100}%` : '56.25%' }}
          ></div>
          <div className={styles.imageWrapper}>
            <img ref={imageRef} src="/adminlogin.jpg" alt="Login" />
          </div>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleLogin}>
            <div className={styles.header}>
              <div className={styles.logoContainer}>
                <span><img src="/logo.png" alt="Logo" /></span>
                <div className={styles.title}>Book Store</div>
              </div>
              <div className={styles.headerTitle}>Admin Login</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button className={styles.submitButton} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
