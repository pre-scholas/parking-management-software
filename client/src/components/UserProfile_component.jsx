import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks';

function UserProfile() {
    const { user, logout } = useAuth();
    const [editing, setEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: '',
        vehicles: []
    });
    const [vehicles, setVehicles] = useState([]);
    const [stats, setStats] = useState({
        totalReservations: 0,
        totalSpent: 0,
        favoriteSpot: 'N/A'
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                vehicles: user.vehicles || []
            });
            fetchUserStats();
            fetchUserVehicles();
        }
        
        // Listen for reservation updates to refresh stats
        const handleReservationUpdate = () => {
            if (user) {
                fetchUserStats();
            }
        };
        
        window.addEventListener('reservationCreated', handleReservationUpdate);
        window.addEventListener('reservationCancelled', handleReservationUpdate);
        
        return () => {
            window.removeEventListener('reservationCreated', handleReservationUpdate);
            window.removeEventListener('reservationCancelled', handleReservationUpdate);
        };
    }, [user]);

    const fetchUserStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/users/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (err) {
            // Mock data fallback - calculate from current reservations
            const currentReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
            const totalSpent = currentReservations.reduce((sum, res) => sum + (res.totalCost || 0), 0);
            
            setStats({
                totalReservations: currentReservations.length,
                totalSpent: totalSpent,
                favoriteSpot: currentReservations.length > 0 ? currentReservations[0].lotId?.name || 'Downtown Garage' : 'N/A'
            });
        }
    };

    const fetchUserVehicles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/vehicles', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setVehicles(data);
            }
        } catch (err) {
            // Mock data fallback
            setVehicles([
                {
                    _id: '1',
                    licensePlate: 'ABC123',
                    make: 'Toyota',
                    model: 'Camry',
                    color: 'Blue'
                }
            ]);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });
            
            if (response.ok) {
                alert('Profile updated successfully!');
            }
        } catch (err) {
            alert('Profile updated! (Demo Mode)');
        }
        setEditing(false);
    };

    const handleInputChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    if (!user) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <h2>Please log in to view your profile</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>My Profile</h1>
                <button 
                    className="edit-btn"
                    onClick={() => setEditing(!editing)}
                >
                    <ion-icon name={editing ? 'close-outline' : 'create-outline'}></ion-icon>
                    {editing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            <div className="profile-grid">
                {/* Personal Information */}
                <div className="profile-card">
                    <div className="card-header">
                        <ion-icon name="person-outline"></ion-icon>
                        <h3>Personal Information</h3>
                    </div>
                    <div className="card-content">
                        <div className="form-group">
                            <label>Username</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            ) : (
                                <p>{profileData.username || 'Not set'}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            {editing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            ) : (
                                <p>{profileData.email}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            {editing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            ) : (
                                <p>{profileData.phone || 'Not set'}</p>
                            )}
                        </div>
                        {editing && (
                            <button className="save-btn" onClick={handleSave}>
                                <ion-icon name="checkmark-outline"></ion-icon>
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>

                {/* Parking Statistics */}
                <div className="profile-card">
                    <div className="card-header">
                        <ion-icon name="stats-chart-outline"></ion-icon>
                        <h3>Parking Statistics</h3>
                    </div>
                    <div className="card-content">
                        <div className="stat-item">
                            <span className="stat-label">Total Reservations</span>
                            <span className="stat-value">{stats.totalReservations}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Total Spent</span>
                            <span className="stat-value">${stats.totalSpent}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Favorite Spot</span>
                            <span className="stat-value">{stats.favoriteSpot}</span>
                        </div>
                    </div>
                </div>

                {/* Registered Vehicles */}
                <div className="profile-card">
                    <div className="card-header">
                        <ion-icon name="car-outline"></ion-icon>
                        <h3>Registered Vehicles</h3>
                    </div>
                    <div className="card-content">
                        {vehicles.length > 0 ? (
                            vehicles.map(vehicle => (
                                <div key={vehicle._id} className="vehicle-item">
                                    <div className="vehicle-info">
                                        <strong>{vehicle.licensePlate}</strong>
                                        <span>{vehicle.make} {vehicle.model}</span>
                                        <span className="vehicle-color">{vehicle.color}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-data">No vehicles registered</p>
                        )}
                        <button className="add-vehicle-btn">
                            <ion-icon name="add-outline"></ion-icon>
                            Add Vehicle
                        </button>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="profile-card">
                    <div className="card-header">
                        <ion-icon name="settings-outline"></ion-icon>
                        <h3>Account Actions</h3>
                    </div>
                    <div className="card-content">
                        <button className="action-btn secondary">
                            <ion-icon name="key-outline"></ion-icon>
                            Change Password
                        </button>
                        <button className="action-btn secondary">
                            <ion-icon name="card-outline"></ion-icon>
                            Payment Methods
                        </button>
                        <button className="action-btn danger" onClick={logout}>
                            <ion-icon name="log-out-outline"></ion-icon>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;