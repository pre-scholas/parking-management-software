import React, { useState, useEffect } from 'react';
import { useReservations } from '../hooks/useReservations';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cancelReservation } = useReservations();

  // Fetch user reservations on component mount and listen for updates
  useEffect(() => {
    fetchReservations();
    
    // Listen for new reservations
    const handleReservationCreated = (event) => {
      const newReservation = event.detail;
      setReservations(prev => [newReservation, ...prev]);
    };
    
    // Listen for cancelled reservations
    const handleReservationCancelled = (event) => {
      const { reservationId } = event.detail;
      setReservations(prev => prev.filter(res => res._id !== reservationId));
    };
    
    window.addEventListener('reservationCreated', handleReservationCreated);
    window.addEventListener('reservationCancelled', handleReservationCancelled);
    
    return () => {
      window.removeEventListener('reservationCreated', handleReservationCreated);
      window.removeEventListener('reservationCancelled', handleReservationCancelled);
    };
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Try API first, but fall back to demo mode if it fails
      try {
        const response = await fetch('http://localhost:8080/api/reservations', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.log('API not available, using demo mode');
      }
      
      // Fall back to demo mode - load from localStorage
      const demoReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
      setReservations(demoReservations);
      
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Unable to load reservations');
    } finally {
      setLoading(false);
    }
  };



  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    
    try {
      await cancelReservation(reservationId);
      alert('Reservation cancelled successfully');
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      alert('Error cancelling reservation: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = (startTime) => {
    return new Date(startTime) > new Date();
  };

  const currentReservations = reservations.filter(res => isUpcoming(res.startTime));
  const pastReservations = reservations.filter(res => !isUpcoming(res.startTime));

  if (loading) return <div className="loading">Loading reservations...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="reservations-container">
      <h1>Your Reservations</h1>
      
      {/* Current Reservations */}
      <section className="reservations-section">
        <h2>Current Reservations ({currentReservations.length})</h2>
        {currentReservations.length === 0 ? (
          <p className="no-reservations">No current reservations</p>
        ) : (
          <div className="reservations-grid">
            {currentReservations.map(reservation => (
              <div key={reservation._id} className="reservation-card current">
                <div className="reservation-header">
                  <h3>Spot {reservation.spotId?.spotIdentifier || 'N/A'}</h3>
                  <span className="status current">Active</span>
                </div>
                <div className="reservation-details">
                  <p><strong>Location:</strong> {reservation.lotId?.name || 'Unknown Lot'}</p>
                  <p><strong>Start:</strong> {formatDate(reservation.startTime)}</p>
                  <p><strong>End:</strong> {formatDate(reservation.endTime)}</p>
                  <p><strong>Cost:</strong> ${reservation.totalCost || 'TBD'}</p>
                </div>
                <button 
                  className="cancel-btn"
                  onClick={() => handleCancelReservation(reservation._id)}
                >
                  Cancel Reservation
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Reservations */}
      <section className="reservations-section">
        <h2>Past Reservations ({pastReservations.length})</h2>
        {pastReservations.length === 0 ? (
          <p className="no-reservations">No past reservations</p>
        ) : (
          <div className="reservations-grid">
            {pastReservations.map(reservation => (
              <div key={reservation._id} className="reservation-card past">
                <div className="reservation-header">
                  <h3>Spot {reservation.spotId?.spotIdentifier || 'N/A'}</h3>
                  <span className="status past">Completed</span>
                </div>
                <div className="reservation-details">
                  <p><strong>Location:</strong> {reservation.lotId?.name || 'Unknown Lot'}</p>
                  <p><strong>Start:</strong> {formatDate(reservation.startTime)}</p>
                  <p><strong>End:</strong> {formatDate(reservation.endTime)}</p>
                  <p><strong>Cost:</strong> ${reservation.totalCost || 'N/A'}</p>
                  {reservation.actualExitTime && (
                    <p><strong>Actual Exit:</strong> {formatDate(reservation.actualExitTime)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Reservations;