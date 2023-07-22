import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Localhost } from '../../config/api';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Localhost}/api/v1/forgetPassword`, { email });
            setMessage(response.data);
        } catch (error) {
            console.error('Failed to send password reset link:', error.message);
            setMessage('Failed to send password reset link. Please try again later.');
        }
    };

    return (
        <div className="container1">
            <h3>Forget Password</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group1">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ForgetPassword;
