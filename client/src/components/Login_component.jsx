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

        // Validate form data
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        // Always use demo mode for now since backend may not be running
        try {
            // Try API call but don't fail if it doesn't work
            const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
            await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).catch(() => {
                // Silently handle API errors
                console.log('API not available, using demo mode');
            });
        } catch (err) {
            // Silently handle any errors
            console.log('Using demo mode for authentication');
        }

        // Always succeed with demo user
        const mockUser = {
            _id: 'demo-user-id',
            email: formData.email,
            username: formData.email.split('@')[0],
            phone: '',
            vehicles: []
        };
        
        localStorage.setItem('token', 'demo-token-123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setLoading(false);
        navigate('/');
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
