import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to home page
            navigate('/');
        } catch (err) {
            console.error('Auth error:', err);
            // Demo mode - simulate successful login
            if (formData.email && formData.password) {
                const mockUser = {
                    _id: 'demo-user-id',
                    email: formData.email,
                    username: formData.email.split('@')[0]
                };
                localStorage.setItem('token', 'demo-token-123');
                localStorage.setItem('user', JSON.stringify(mockUser));
                navigate('/');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>ParkEase</h1>
                    <p>Your Smart Parking Solution</p>
                </div>
                
                <div className="auth-tabs">
                    <button 
                        className={`tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner">
                                {isLogin ? 'Signing In...' : 'Creating Account...'}
                            </span>
                        ) : (
                            isLogin ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>Demo Mode: Use any email/password to continue</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
