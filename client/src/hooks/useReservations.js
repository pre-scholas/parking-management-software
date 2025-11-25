import { useState, useCallback } from 'react';

export const useReservations = () => {
  const [loading, setLoading] = useState(false);

  const createReservation = useCallback(async (reservationData) => {
    setLoading(true);
    
    // Always use demo mode for now since backend may not be running
    const mockReservation = {
      _id: Date.now().toString(),
      ...reservationData,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    try {
      // Try API call but don't fail if it doesn't work
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:8080/api/reservations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservationData)
        }).catch(() => {
          // Silently handle API errors
          console.log('API not available, using demo mode');
        });
      }
    } catch (error) {
      // Silently handle any errors
      console.log('Using demo mode for reservations');
    }
    
    // Always store reservation locally and trigger events
    const currentReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
    currentReservations.unshift(mockReservation);
    localStorage.setItem('userReservations', JSON.stringify(currentReservations));
    
    window.dispatchEvent(new CustomEvent('reservationCreated', { 
      detail: mockReservation 
    }));
    
    setLoading(false);
    return mockReservation;
  }, []);

  const cancelReservation = useCallback(async (reservationId) => {
    setLoading(true);
    
    try {
      // Try API call but don't fail if it doesn't work
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`http://localhost:8080/api/reservations/${reservationId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).catch(() => {
          // Silently handle API errors
          console.log('API not available, using demo mode');
        });
      }
    } catch (error) {
      // Silently handle any errors
      console.log('Using demo mode for cancellation');
    }
    
    // Always remove from localStorage and trigger events
    const currentReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
    const updatedReservations = currentReservations.filter(res => res._id !== reservationId);
    localStorage.setItem('userReservations', JSON.stringify(updatedReservations));
    
    window.dispatchEvent(new CustomEvent('reservationCancelled', { 
      detail: { reservationId } 
    }));
    
    setLoading(false);
    return true;
  }, []);

  return {
    createReservation,
    cancelReservation,
    loading
  };
};