import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [stats, setStats] = useState({
    totalLots: 0,
    availableSpots: 0,
    activeReservations: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.warn('Dashboard API not available, using mock data:', err.message);
      // Mock data fallback - calculate from current reservations
      const currentReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
      const activeReservations = currentReservations.filter(res => 
        new Date(res.startTime) > new Date()
      ).length;
      const totalRevenue = currentReservations.reduce((sum, res) => sum + (res.totalCost || 0), 0);
      
      setStats({
        totalLots: 3,
        availableSpots: 165 - activeReservations,
        activeReservations: activeReservations,
        totalRevenue: totalRevenue
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    
    // Listen for reservation updates to refresh dashboard stats
    const handleReservationUpdate = () => {
      fetchDashboardStats();
    };
    
    window.addEventListener('reservationCreated', handleReservationUpdate);
    window.addEventListener('reservationCancelled', handleReservationUpdate);
    
    return () => {
      window.removeEventListener('reservationCreated', handleReservationUpdate);
      window.removeEventListener('reservationCancelled', handleReservationUpdate);
    };
  }, []);

  const refreshStats = () => {
    setLoading(true);
    fetchDashboardStats();
  };

  return {
    stats,
    loading,
    error,
    refreshStats
  };
};