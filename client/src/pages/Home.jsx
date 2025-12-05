import React from 'react';
import { useAuth, useDashboard, useNavigation } from '../hooks';

function Home() {
  const { user } = useAuth();
  const { stats, loading: statsLoading } = useDashboard();
  const { quickActions } = useNavigation();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ParkEase</h1>
          {user ? (
            <p>Hello, <strong>{user.username || user.email}</strong>! Ready to find your perfect parking spot?</p>
          ) : (
            <p>Your smart parking solution for hassle-free parking</p>
          )}
        </div>
        <div className="hero-image">
          <div className="parking-icon"><ion-icon name="car-sport-outline"></ion-icon></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Parking Overview</h2>
        {statsLoading ? (
          <div className="loading">Loading statistics...</div>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><ion-icon name="business-outline"></ion-icon></div>
              <div className="stat-info">
                <h3>{stats.totalLots}</h3>
                <p>Parking Lots</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><ion-icon name="car-outline"></ion-icon></div>
              <div className="stat-info">
                <h3>{stats.availableSpots}</h3>
                <p>Available Spots</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><ion-icon name="clipboard-outline"></ion-icon></div>
              <div className="stat-info">
                <h3>{stats.activeReservations}</h3>
                <p>Active Reservations</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><ion-icon name="cash-outline"></ion-icon></div>
              <div className="stat-info">
                <h3>${stats.totalRevenue}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className={`action-card ${action.color}`}
              onClick={action.action}
            >
              <div className="action-icon"><ion-icon name={action.icon}></ion-icon></div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
              <div className="action-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose ParkEase?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"><ion-icon name="flash-outline"></ion-icon></div>
            <h4>Real-time Availability</h4>
            <p>See live parking spot availability across all locations</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><ion-icon name="card-outline"></ion-icon></div>
            <h4>Easy Payments</h4>
            <p>Secure online payments with multiple payment options</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><ion-icon name="phone-portrait-outline"></ion-icon></div>
            <h4>Mobile Friendly</h4>
            <p>Access your parking needs from any device, anywhere</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><ion-icon name="notifications-outline"></ion-icon></div>
            <h4>Smart Notifications</h4>
            <p>Get alerts for reservations, payments, and availability</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;