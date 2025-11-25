// Validation middleware for common request validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const validateReservation = (req, res, next) => {
  const { user, lot, startTime, endTime, vehicleInfo } = req.body;

  if (!user || !lot || !startTime || !endTime || !vehicleInfo) {
    return res.status(400).json({
      message: 'Missing required fields: user, lot, startTime, endTime, vehicleInfo'
    });
  }

  if (!vehicleInfo.licensePlate) {
    return res.status(400).json({
      message: 'Vehicle license plate is required'
    });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    return res.status(400).json({
      message: 'End time must be after start time'
    });
  }

  if (start < new Date()) {
    return res.status(400).json({
      message: 'Start time cannot be in the past'
    });
  }

  next();
};

export const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: 'Please provide a valid email address'
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long'
    });
  }

  next();
};