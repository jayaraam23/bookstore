import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/Protectedroute';
import Adminlogin from './pages/admin/Adminlogin';
import UserDashboard from './pages/user/UserDasbroad';
import Admindashboard from './pages/admin/AdmindashBoard';
import BookDetails from './components/BookDetails';
import Layout from './Layout';
import BookCart from './components/cart/BookCart';
import Userlogin from './pages/user/Userlogin';
import UserSignup from './pages/user/Usersign';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Userlogin />} />
                <Route path="/user/login" element={<Userlogin />} />
                <Route path="/user/signup" element={<UserSignup />} />
                <Route path="/user/dashboard" element={<Layout><UserDashboard /></Layout>} />
                <Route path="/book/details/:id" element={<Layout><BookDetails /></Layout>} />
                <Route path="/book/cart" element={<Layout><BookCart /></Layout>} />
                <Route path="/admin/login" element={<Adminlogin />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute element={<Admindashboard />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

