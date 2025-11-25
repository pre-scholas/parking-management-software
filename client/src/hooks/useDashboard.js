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
      // Mock data fallback
      setStats({
        totalLots: 3,
        availableSpots: 165,
        activeReservations: 2,
        totalRevenue: 1250.75
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
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