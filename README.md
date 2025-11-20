# parking-management-software

## Project Overview Key features

1. User Authentication: Secure sign-up, login, and profile management.
2. Parking Spot Management: CRUD (Create, Read, Update, Delete) operations for parking spots, with real-time availability updates.
3. Booking System: Allows users to search for spots by location, date, and time, book a spot, and view/cancel existing bookings.
4. Payment Gateway Integration: Processes payments for bookings.
5. Notifications: Sends push notifications and email confirmations for bookings, cancellations, and other alerts.
6. Admin Dashboard: Provides administrators with a central portal to manage the facility, view reports, and handle user queries.

## Technology Stack = MERN-Stack

1. MongoDB => Stores all documents: Parking Lot Configurations, Spot Status, User Data, Reservations, and Payments.

2. Express.JS => The API layer. Handles routing, security (JWT), authentication, and connects the React frontend to the MongoDB database.

3. Node.JS => The server-side runtime environment. Hosts Express and integrates the critical *Socket.IO library for real-time data broadcasting.

4. React => The client-side dashboard/app. It renders the visual parking map and constantly listens for real-time status updates via WebSockets.

***********************

## Phase 1: Database Design (MongoDB/Mongoose Schema)

We'll use Mongoose (an ODM for MongoDB) to define structured schemas for consistency.

1. UserSchema: Stores user and admin details.
   .username, email, password
   .role: ('user', 'admin', 'operator')
   .createdAt, updatedAt
   .lastLogin
   .licensePlate: Array of references to userVehicle documents
2. LotSchema (The Garage): Defines the overall structure.
   .name, address
   .totalSpots, availableSpots (This is calculated and updated frequently)
   .hourlyRate
3. SpotSchema (The Critical Document): The state of each individual parking space.
   .lotId: Reference to the parent lot.
   .spotIdentifier: e.g., 'A1,'B15', 'Level 2/Spot 03'.
   .status: ('available', 'occupied', 'reserved', 'maintenance') - This is the field that triggers real-time updates.
   .spotType: ('car', 'motorcycle', 'truck','EV', 'handicap', 'compact').
4. ReservationSchema: Tracks current and historical bookings.
   .userId: Reference to the User who booked.
   .spotId: Reference to the spot reserved.
   .startTime, endTime, actualExitTime
5. PaymentSchema: For transaction records.
   .reservationId: Reference to the associated booking.
   .amount, date, paymentMethod

***********************

### Phase 2: Frontend Development (React)

The React application will be a two-part system: the **User App** (for booking) and the **Admin Dashboard**.

- **Lot Map Component:** This component fetches all `SpotSchema` data on initial load. It renders a visual, clickable grid of the parking lot layout. It uses different colors to represent the `status` (e.g., green for available, red for occupied, yellow for reserved).

1. **State Management:** Use the **Context API** or a library like **Zustand** to manage global state for user authentication, lot configurations, and the real-time `availableSpots` count.
2. **Key Components:**

  (*)  - **Socket Listener Hook:** A custom hook (`useRealTimeParking`) that initializes the Socket.IO connection and listens specifically for the `'spot_status_update'` event. When it receives data, it updates the component's state instantly, causing the relevant parking spot to change color on the map without a page refresh.(*)
  
    - **Reservation Component:** A form to collect license plate, duration, and integrate a payment widget.
  
    - **Admin Reporting Component:** Charts and tables (using a library like **Recharts**) to display real-time occupancy rates, daily revenue, and peak usage times.
