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

## Design & Implementation Decisions

### Component Architecture
**Decision**: Created reusable components for consistency and maintainability
- `TechnicianCard`: Used in both listing and booking pages
- `NoTechnician`: Handles empty states across multiple pages
- `BookingSummary`: Extracted for real-time updates

**Rationale**: Follows DRY principles and ensures consistent UI patterns

### State Management
**Decision**: Used local component state with `useState` hooks
- Form state managed within `BookingForm` component
- Filter state managed within `TechniciansPage`
- Navigation state passed via React Router

**Rationale**: Simple state requirements don't warrant complex state management solutions

### Data Structure
**Decision**: Mock data stored in separate constants files
- `technicians.js`: Contains technician data with ratings and services
- `timeSlots.js`: Defines available booking time slots
- Dynamic service extraction from technician data

**Rationale**: Separates data from components, making it easy to replace with API calls later

### UI/UX Decisions
**Decision**: Implemented responsive grid system with Mantine
- Mobile: Single column layout
- Tablet: Two-column grid  
- Desktop: Three-column grid

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
│   ├── TechnicianCard.js      # Reusable technician display card
│   ├── BookingForm.js         # Booking form with validation
│   ├── BookingSummary.js      # Real-time booking summary
│   └── NoTechnician.js        # Empty state component
├── pages/
│   ├── HomePage.js            # Landing page
│   ├── TechniciansPage.js     # Technician listing and filtering
│   └── BookingPage.js         # Booking interface
├── constants/
│   ├── technicians.js         # Mock technician data
│   └── timeSlots.js           # Available time slot options
└── App.js                     # Main application component
```

## Tech Stack

- **Frontend**: React 19.1.1
- **UI Library**: Mantine 8.3.2
- **Routing**: React Router v7.9.3
- **Icons**: Tabler Icons 3.35.0
- **Build Tool**: Create React App

## UI Features

- **Responsive Grid**: Adapts to different screen sizes
- **Interactive Sliders**: Smooth rating filtering
- **Real-time Search**: Instant results as you type
- **Conditional Rendering**: Dynamic UI based on state
- **Loading States**: Smooth user feedback
- **Error Handling**: Graceful error states

## Responsive Design

- **Mobile**: Single column layout
- **Tablet**: Two-column grid
- **Desktop**: Three-column grid
- **Large Screens**: Optimized spacing and layout

## Performance Features

- **Component Reusability**: DRY principle implementation
- **Efficient Filtering**: Optimized search algorithms
- **State Management**: Clean React state patterns
- **Memory Optimization**: Proper component lifecycle

## Bonus Features & Advanced Patterns

### Advanced React Patterns Implemented

**1. Component Composition**
- Extracted `BookingSummary` as a separate component for better separation of concerns
- Used props drilling effectively for data flow between parent and child components

**2. Conditional Rendering Patterns**
- Implemented multiple conditional rendering strategies:
  - `&&` operator for top-rated badges
  - Ternary operator for technician list vs. empty state
  - Early returns for error states

**3. Dynamic Data Processing**
- Dynamic service extraction using `Set`, `flatMap`, and `sort`
- Computed values for filtering and validation
- Real-time calculations for booking summaries

**4. State Management Patterns**
- Local state with `useState` hooks
- Computed state values (derived from other state)
- State reset functionality for form clearing

**5. Event Handling Patterns**
- Controlled components with `onChange` handlers
- Form submission with validation
- Navigation state passing via React Router

### Performance Optimizations

**1. Efficient Filtering**
- Single-pass filtering algorithm
- Optimized search with `toLowerCase()` normalization
- Dynamic service list generation

**2. Component Reusability**
- `TechnicianCard` used in multiple contexts
- `NoTechnician` handles different empty states
- Consistent prop interfaces across components

**3. User Experience Enhancements**
- Real-time form validation
- Automatic navigation with user feedback
- Responsive design with Mantine's grid system
- Loading states and error handling

### Code Quality Features

**1. Clean Architecture**
- Separation of concerns (components, pages, constants)
- Single responsibility principle
- DRY (Don't Repeat Yourself) implementation

**2. Maintainable Code**
- Clear component naming conventions
- Consistent file structure
- Well-documented prop interfaces

**3. Error Handling**
- Graceful empty states
- Form validation with user feedback
- Navigation error handling

## Future Enhancements

- [ ] User authentication system
- [ ] Real-time booking notifications
- [ ] Payment integration
- [ ] Technician reviews and ratings
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Mobile app version

---