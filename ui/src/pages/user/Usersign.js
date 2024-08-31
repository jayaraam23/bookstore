import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './User.module.css';

const Usersign = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [aspectRatio, setAspectRatio] = useState(16 / 9);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);
    const navigate = useNavigate();

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

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            localStorage.setItem('isAuthenticated', 'true');
            alert("Signup Successful");
            navigate('/user/dashboard'); 
        } catch (error) {
            console.error('Signup error:', error);
            alert("Signup Failed due to a network issue");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.imageContainer}>
                    <div className={styles.imagePadding} style={{ paddingTop: imageLoaded ? `${(1 / aspectRatio) * 100}%` : '56.25%' }}></div>
                    <div className={styles.imageWrapper}>
                        <img
                            ref={imageRef}
                            src="/adminlogin.jpg"
                            alt="Signup"
                        />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSignup}>
                        <div className={styles.header}>
                            <div className={styles.logoContainer}>
                                <span><img src="/logo.png" alt="Logo" /></span>
                                <div className={styles.title}>Book Store</div>
                            </div>
                            <div className={styles.headerTitle}>Sign Up</div>
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
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div>
                            <button className={styles.submitButton1} type="submit">Submit</button>
                        </div>
                        <div className={styles.centeredText}>
                            Already have an account? <Link to="/user/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Usersign;

