import React, { useState, useEffect } from 'react';
import apiClient from '../utils/api';

function LotsPage() {
    const [lots, setLots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // In a real app, you would get this from your authentication context
    const MOCK_USER_ID = '60d0fe4f5311236168a109ca'; // Replace with a valid user ID from your DB

    useEffect(() => {
        const fetchLots = async () => {
            try {
                const response = await apiClient.getLots();
                setLots(response.data);
            } catch (err) {
                setError('Failed to fetch lots.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLots();
    }, []);

    const handleCheckIn = async (lotId) => {
        try {
            // 1. Get the user's vehicles
            const vehiclesResponse = await apiClient.getVehiclesByUserId(MOCK_USER_ID);
            if (!vehiclesResponse.data || vehiclesResponse.data.length === 0) {
                alert('No vehicles found for this user. Please add a vehicle first.');
                return;
            }
            // For simplicity, we'll use the user's first vehicle
            const vehicleId = vehiclesResponse.data[0]._id;

            // 2. Prepare the data for the check-in request
            const sessionData = {
                lotId,
                userId: MOCK_USER_ID,
                vehicleId,
            };

            // 3. Call the check-in API endpoint
            await apiClient.checkIn(sessionData);
            alert(`Successfully checked into lot ${lotId}!`);
            // Optionally, you could refresh the lots data here to update available spots
        } catch (err) {
            const errorMessage = err.response?.data?.msg || 'An error occurred during check-in.';
            alert(`Check-in failed: ${errorMessage}`);
            console.error(err);
        }
    };

    if (loading) return <p>Loading lots...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Parking Lots</h2>
            {lots.length > 0 ? (
                <ul>
                    {lots.map(lot => (
                        <li key={lot._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <strong>{lot.name}</strong>
                            <p>Available Spots: {lot.availableSpots} / {lot.totalSpots}</p>
                            <p>Rate: ${lot.hourlyRate}/hour</p>
                            <button 
                                onClick={() => handleCheckIn(lot._id)}
                                disabled={lot.availableSpots <= 0}>
                                {lot.availableSpots > 0 ? 'Check-In' : 'Lot Full'}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No parking lots found.</p>
            )}
        </div>
    );
}

export default LotsPage;