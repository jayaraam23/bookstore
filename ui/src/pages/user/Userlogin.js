import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './User.module.css';

const Userlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      const responseBody = await response.text();
      console.log('Response Body:', responseBody);
  
      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}: ${responseBody}`);
      }
  
      const data = JSON.parse(responseBody);
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('isAuthenticated', 'true');
  
      alert('Login Successful');
      navigate('/user/dashboard');
    } catch (error) {
      localStorage.removeItem('isAuthenticated');
      alert(`Login Failed: ${error.message}`);
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
              alt="Login"
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleLogin}>
            <div className={styles.header}>
              <div className={styles.logoContainer}>
                <span><img src="/logo.png" alt="Logo" /></span>
                <div className={styles.title}>Book Store</div>
              </div>
              <div className={styles.headerTitle}>User Login</div>
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
            <div>
              <button className={styles.submitButton} type="submit">Login</button>
              <button className={styles.submitButton}>
                <Link to="/user/signup" className={styles.link}>Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userlogin;

// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../../actions/userActions';
// import styles from './User.module.css';


// const Userlogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [aspectRatio, setAspectRatio] = useState(16 / 9);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const imageRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo, error } = userLogin;
//   console.log(userLogin);
  

//   useEffect(() => {
//     const handleLoad = () => {
//       if (imageRef.current) {
//         const { naturalWidth: width, naturalHeight: height } = imageRef.current;
//         setAspectRatio(width / height);
//         setImageLoaded(true);
//       }
//     };

//     const img = imageRef.current;
//     img?.addEventListener('load', handleLoad);
//     return () => img?.removeEventListener('load', handleLoad);
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/user/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('userInfo', JSON.stringify(data));
//       localStorage.setItem('isAuthenticated', 'true');

//       alert('Login Successful');
//       navigate('/user/dashboard');
//     } catch (error) {
//       localStorage.removeItem('isAuthenticated');
//       alert(`Login Failed: ${error.message}`);
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.mainContainer}>
//         <div className={styles.imageContainer}>
//           <div className={styles.imagePadding} style={{ paddingTop: imageLoaded ? `${(1 / aspectRatio) * 100}%` : '56.25%' }}></div>
//           <div className={styles.imageWrapper}>
//             <img
//               ref={imageRef}
//               src="/adminlogin.jpg"
//               alt="Login"
//             />
//           </div>
//         </div>
//         <div className={styles.formContainer}>
//           <form onSubmit={handleLogin}>
//             <div className={styles.header}>
//               <div className={styles.logoContainer}>
//                 <span><img src="/logo.png" alt="Logo" /></span>
//                 <div className={styles.title}>Book Store</div>
//               </div>
//               <div className={styles.headerTitle}>User Login</div>
//             </div>
//             <div className={styles.formGroup}>
//               <label htmlFor="username">Username</label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//                 required
//               />
//             </div>
//             <div className={styles.formGroup}>
//               <label htmlFor="password">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//               />
//             </div>
//             <div>
//               <button className={styles.submitButton} type="submit">Login</button>
//               <button className={styles.submitButton}>
//                 <Link to="/user/signup" className={styles.link}>Sign Up</Link>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Userlogin;

