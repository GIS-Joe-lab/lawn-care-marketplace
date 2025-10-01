# Lawn Care Marketplace

A modern React application for finding and booking lawn care technicians. Built with React, Mantine UI, and React Router v7.

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher) https://nodejs.org/en/download
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/GIS-Joe-lab/lawn-care-marketplace.git
   cd lawn-care-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   Notice: This could take up to 10 seconds for initial start.


4. **Open your browser**
   Navigate to `http://localhost:3000`

## Key Features

### Core Functionality
- **Browse Technicians**: View 18+ lawn care professionals with ratings and services
- **Advanced Filtering**: Filter by name, service type, and minimum rating
- **Book Appointments**: Select hours, sessions, and preferred time slots
- **Manage Appointments**: Create, edit, and delete bookings
- **Appointment History**: View all appointments grouped by technician on homepage
- **Top-Rated Highlighting**: Visual badges for technicians rated ≥4.8

### Technical Implementation
- **Context API**: Global state management with useReducer
- **Custom Hooks**: Business logic abstraction (`useAppointment`, `useTechnician`)
- **React Router v7**: Multi-page navigation with state passing
- **Mantine UI**: Modern, responsive design components
- **Performance Optimized**: Memoized computations and efficient filtering
- **CRUD Operations**: Full appointment lifecycle management

## Design & Implementation Decisions

### Component Architecture
**Decision**: Created reusable components for consistency and maintainability
- `TechnicianCard`: Used in both listing and booking pages
- `NoTechnician`: Handles empty states across multiple pages
- `AppointmentSummary`: Extracted for real-time updates

**Rationale**: Follows DRY principles and ensures consistent UI patterns

### State Management
**Decision**: Implemented advanced state management with Context API and useReducer
- Global state managed through `AppContext` using useReducer pattern
- Centralized actions for state updates (filters, appointments, technician selection)
- Custom hooks (`useAppointment`, `useTechnician`) abstract business logic
- Computed values with `useMemo` for performance optimization

**Rationale**: Provides scalable architecture for shared state across components while maintaining clean separation of concerns

### Data Structure
**Decision**: Mock data stored in separate constants files
- `technicians.js`: Contains technician data with ratings and services
- `timeSlots.js`: Defines available booking time slots
- Dynamic service extraction from technician data

**Rationale**: Separates data from components, making it easy to replace with API calls later

### UI/UX Decisions
**Decision**: Added interactive filtering with real-time updates
- Search by name with `toLowerCase()` normalization
- Service filtering with dynamic dropdown
- Rating slider with min/max constraints

**Decision**: Top-rated technician highlighting (≥4.8 rating)
- Visual distinction with crown badge
- Helps users identify premium services

### Form Validation
**Decision**: Client-side validation with disabled states
- All form fields required before submission
- Number inputs with min/max constraints
- Real-time summary updates

**Decision**: Automatic navigation after successful booking
- 3-second delay with `setTimeout()`
- Provides user feedback before redirect

## Project Structure

```
src/
├── components/
│   ├── TechnicianCard.js              # Reusable technician display card
│   ├── AppointmentForm.js             # Booking form with validation
│   ├── AppointmentSummary.js          # Real-time booking summary
│   ├── AppointmentCard.js             # Individual appointment display
│   ├── AppointmentControlPanel.js     # Form inputs for booking
│   ├── TechnicianAppointmentCard.js   # Technician with appointments
│   ├── TechnicianAppointmentsGrid.js  # Grid of grouped appointments
│   └── NoTechnician.js                # Empty state component
├── pages/
│   ├── HomePage.js                    # Landing page with appointment history
│   ├── TechniciansPage.js             # Technician listing and filtering
│   └── AppointmentPage.js             # Booking/editing interface
├── context/
│   └── AppContext.js                  # Global state with Context API + useReducer
├── hooks/
│   ├── useAppointment.js              # Custom hook for appointment logic
│   └── useTechnician.js               # Custom hook for technician filtering
├── constants/
│   ├── technicians.js                 # Mock technician data
│   └── timeSlots.js                   # Available time slot options
└── App.js                             # Main application component with providers
```

## Tech Stack

- **Frontend**: React 19.1.1
- **UI Library**: Mantine 8.3.2
- **Routing**: React Router v7.9.3
- **Icons**: Tabler Icons 3.35.0
- **Build Tool**: Create React App

## Bonus Features & Advanced Patterns

### Advanced React Patterns Implemented

**1. Context API + useReducer**
- Centralized state management with `AppContext`
- Action-based state updates following Redux patterns
- Predictable state flow with reducer functions
- Type-safe actions with `ACTIONS` constants

**2. Custom Hooks**
- `useAppointment`: Encapsulates appointment CRUD operations
- `useTechnician`: Manages filtering and technician data
- Business logic separation from UI components
- Computed values with `useMemo` for performance

**3. Component Composition**
- Highly reusable components (`TechnicianCard`, `AppointmentCard`)
- Composite components (`TechnicianAppointmentsGrid`)
- Props-based composition for flexibility
- Separation of concerns between container and presentational components

**4. Advanced State Management**
- Global state for appointments and filters
- Local state for UI-specific concerns
- State synchronization across routes
- Optimistic updates with reducer pattern

**5. Dynamic Data Processing**
- Dynamic service extraction using `Set`, `flatMap`, and `sort`
- Computed values for filtering and validation
- Real-time calculations for booking summaries
- Memoized filtered results for performance

**6. Appointment Management**
- Create, Read, Update, Delete (CRUD) operations
- Edit existing appointments with pre-populated data
- Delete with confirmation dialog (`window.confirm`)
- Appointment history grouped by technician

**7. Event Handling Patterns**
- Controlled components with `onChange` handlers
- Form submission with validation
- Navigation state passing via React Router
- Confirmation dialogs for destructive actions

---