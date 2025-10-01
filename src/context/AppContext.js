import React, {createContext, useContext, useReducer} from 'react';

const initialState = {

    //Filter state
    searchQuery: '',
    selectedService: '',
    selectedMinRating: 0,

    // Appointment state
    selectedTechnician: {
        id: null,
        name: null,
        rating: null,
        services: []
    },
    isTopRated: false,
    appointmentData: {
        id: null,
        hours: null,
        sessions: null,
        selectedTimeSlot: null,
        totalHours: 0
    },

    bookedAppointments: [],

    isLoading: false,
    error: null
};

export const ACTIONS = {
    // Filter actions
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_SELECTED_SERVICE: 'SET_SELECTED_SERVICE',
    SET_SELECTED_MIN_RATING: 'SET_SELECTED_MIN_RATING',
    RESET_FILTERS: 'RESET_FILTERS',

    // APPOINTMENT actions
    SET_SELECTED_TECHNICIAN: 'SET_SELECTED_TECHNICIAN',
    UPDATE_APPOINTMENT_DATA: 'UPDATE_APPOINTMENT_DATA',
    RESET_APPOINTMENT: 'RESET_APPOINTMENT',

    // Actions for booked appointment
    ADD_BOOKED_APPOINTMENT: 'ADD_BOOKED_APPOINTMENT',
    UPDATE_BOOKED_APPOINTMENT: 'UPDATE_BOOKED_APPOINTMENT',
    DELETE_BOOKED_APPOINTMENT: 'DELETE_BOOKED_APPOINTMENT',

    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
}

function appReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_SEARCH_QUERY:
            return {...state, searchQuery: action.payload};

        case ACTIONS.SET_SELECTED_SERVICE:
            return {...state, selectedService: action.payload};

        case ACTIONS.SET_SELECTED_MIN_RATING:
            return {...state, selectedMinRating: action.payload};

        case ACTIONS.RESET_FILTERS:
            return {
                ...state,
                searchQuery: '',
                selectedService: null,
                selectedMinRating: action.payload.minRating
            };
        case ACTIONS.SET_SELECTED_TECHNICIAN:
            return {
                ...state,
                selectedTechnician: action.payload.technician,
                isTopRated: action.payload.isTopRated
            };

        case ACTIONS.UPDATE_APPOINTMENT_DATA:
            return {
                ...state,
                appointmentData: {...state.appointmentData, ...action.payload}
            };

        case ACTIONS.SET_LOADING:
            return {...state, isLoading: action.payload};

        case ACTIONS.SET_ERROR:
            return {...state, error: action.payload};

        case ACTIONS.CLEAR_ERROR:
            return {...state, error: null};

        case ACTIONS.ADD_BOOKED_APPOINTMENT:
            return {...state, bookedAppointments: [...state.bookedAppointments, action.payload]};

        case ACTIONS.UPDATE_BOOKED_APPOINTMENT:
            return {
                ...state, bookedAppointments: state.bookedAppointments.map(appointment =>
                    appointment.id === action.payload.id
                        ? {...appointment, ...action.payload.updates}
                        : appointment
                )
            };

        case ACTIONS.DELETE_BOOKED_APPOINTMENT:
            return {
                ...state, bookedAppointments: state.bookedAppointments.filter(
                    appointment => appointment.id !== action.payload
                )
            };

        case ACTIONS.RESET_APPOINTMENT:
            return {
                ...state,
                selectedTechnician: null,
                isTopRated: false,
                appointmentData: {
                    id: null,
                    hours: null,
                    sessions: null,
                    selectedTimeSlot: null,
                    totalHours: 0
                }
            };

        default:
            return state;
    }
}

const AppContext = createContext();

export function AppProvider({children}) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}