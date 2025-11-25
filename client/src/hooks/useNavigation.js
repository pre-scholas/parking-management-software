import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Find Parking',
      description: 'Browse available lots',
      icon: 'car-outline',
      action: () => navigate('/lots'),
      color: 'primary'
    },
    {
      title: 'My Reservations',
      description: 'View & manage bookings',
      icon: 'calendar-outline',
      action: () => navigate('/reservations'),
      color: 'success'
    },
    {
      title: 'Profile Settings',
      description: 'Update your account',
      icon: 'person-outline',
      action: () => navigate('/profile'),
      color: 'secondary'
    }
  ];

  const navigateTo = (path) => {
    navigate(path);
  };

  return {
    quickActions,
    navigateTo,
    navigate
  };
};