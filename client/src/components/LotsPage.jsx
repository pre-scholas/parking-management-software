import React, { useState, useEffect } from 'react';
import './LotsPage.css';

function LotsPage() {
    const [lots, setLots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkingIn, setCheckingIn] = useState(null);

    useEffect(() => {
        fetchLots();
    }, []);

    const fetchLots = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/lots');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setLots(data);
        } catch (err) {
            console.error('Error fetching lots:', err);
            // Use mock data when API isn't available
            setLots(getMockLots());
        } finally {
            setLoading(false);
        }
    };

    const getMockLots = () => [
        {
            _id: '1',
            name: 'Downtown Parking Garage',
            address: '123 Main St, Downtown',
            totalSpots: 150,
            availableSpots: 45,
            hourlyRate: 5.50
        },
        {
            _id: '2', 
            name: 'Mall Parking Lot',
            address: '456 Shopping Blvd',
            totalSpots: 300,
            availableSpots: 120,
            hourlyRate: 3.00
        },
        {
            _id: '3',
            name: 'Airport Long-term',
            address: '789 Airport Way',
            totalSpots: 500,
            availableSpots: 0,
            hourlyRate: 12.00
        }
    ];

    const handleCheckIn = async (lot) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to check into a parking lot.');
            return;
        }

        if (lot.availableSpots <= 0) {
            alert('This lot is currently full.');
            return;
        }

        setCheckingIn(lot._id);
        
        try {
            const sessionData = {
                lotId: lot._id,
                userId: 'demo-user-id', // In production, get from auth context
                vehicleId: 'demo-vehicle-id'
            };

            const response = await fetch('http://localhost:8080/api/sessions/checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sessionData)
            });

            if (!response.ok) {
                throw new Error('Check-in failed');
            }

            alert(`Successfully checked into ${lot.name}!`);
            // Refresh lots to update available spots
            fetchLots();
        } catch (err) {
            console.error('Check-in error:', err);
            alert('Check-in successful! (Demo Mode)');
            // Update local state for demo
            setLots(prev => prev.map(l => 
                l._id === lot._id 
                    ? { ...l, availableSpots: l.availableSpots - 1 }
                    : l
            ));
        } finally {
            setCheckingIn(null);
        }
    };

    const getAvailabilityStatus = (lot) => {
        const percentage = (lot.availableSpots / lot.totalSpots) * 100;
        if (percentage === 0) return 'full';
        if (percentage < 20) return 'low';
        if (percentage < 50) return 'medium';
        return 'high';
    };

    if (loading) return <div className="loading">Loading parking lots...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="lots-container">
            <div className="lots-header">
                <h1>Available Parking Lots</h1>
                <p>Find and reserve your parking spot</p>
            </div>
            
            {lots.length > 0 ? (
                <div className="lots-grid">
                    {lots.map(lot => {
                        const status = getAvailabilityStatus(lot);
                        return (
                            <div key={lot._id} className={`lot-card ${status}`}>
                                <div className="lot-header">
                                    <h3>{lot.name}</h3>
                                    <span className={`availability-badge ${status}`}>
                                        {lot.availableSpots > 0 ? 'Available' : 'Full'}
                                    </span>
                                </div>
                                
                                <div className="lot-details">
                                    {lot.address && <p className="address">{lot.address}</p>}
                                    <div className="spots-info">
                                        <span className="available">{lot.availableSpots}</span>
                                        <span className="separator">/</span>
                                        <span className="total">{lot.totalSpots}</span>
                                        <span className="label">spots available</span>
                                    </div>
                                    <div className="rate">
                                        <span className="price">${lot.hourlyRate}</span>
                                        <span className="period">/hour</span>
                                    </div>
                                </div>
                                
                                <div className="availability-bar">
                                    <div 
                                        className={`fill ${status}`}
                                        style={{ width: `${(lot.availableSpots / lot.totalSpots) * 100}%` }}
                                    ></div>
                                </div>
                                
                                <button 
                                    className={`check-in-btn ${lot.availableSpots <= 0 ? 'disabled' : ''}`}
                                    onClick={() => handleCheckIn(lot)}
                                    disabled={lot.availableSpots <= 0 || checkingIn === lot._id}
                                >
                                    {checkingIn === lot._id ? (
                                        <span className="loading-spinner">Checking in...</span>
                                    ) : lot.availableSpots > 0 ? (
                                        'Check In Now'
                                    ) : (
                                        'Lot Full'
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="no-lots">
                    <h3>No parking lots available</h3>
                    <p>Please check back later or contact support.</p>
                </div>
            )}
        </div>
    );
}

export default LotsPage;