import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

function ParkingLots() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await apiClient.getLots();
        setLots(response.data);
      } catch (err) {
        setError('Failed to fetch parking lots. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, []); // The empty dependency array ensures this runs only once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Available Parking Lots</h1>
      {lots.length > 0 ? (
        <ul>
          {lots.map(lot => (
            <li key={lot._id}>
              {lot.name} - {lot.address} (Available Spots: {lot.availableSpots})
            </li>
          ))}
        </ul>
      ) : (
        <p>No parking lots available at the moment.</p>
      )}
    </div>
  );
}

export default ParkingLots;