import React, {createContext, useContext, useReducer} from 'react';

const initialState = {

    //Filter state
    searchQuery: '',
    selectedService: '',
    selectedMinRating: 0,

    // Booking state
    selectedTechnician: null,
    isTopRated: false,
    bookingData: {
        hours: null,
        sessions: null,
        selectedTimeSlot: null,
        totalHours: 0
    },

    isLoading: false,
    error: null
};

export const ACTIONS = {
    // Filter actions
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_SELECTED_SERVICE: 'SET_SELECTED_SERVICE',
    SET_SELECTED_MIN_RATING: 'SET_SELECTED_MIN_RATING',
    RESET_FILTERS: 'RESET_FILTERS',

    // Booking actions
    SET_SELECTED_TECHNICIAN: 'SET_SELECTED_TECHNICIAN',
    UPDATE_BOOKING_DATA: 'UPDATE_BOOKING_DATA',

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

        case ACTIONS.UPDATE_BOOKING_DATA:
            return {
                ...state,
                bookingData: {...state.bookingData, ...action.payload}
            };

        case ACTIONS.SET_LOADING:
            return {...state, isLoading: action.payload};

        case ACTIONS.SET_ERROR:
            return {...state, error: action.payload};

        case ACTIONS.CLEAR_ERROR:
            return {...state, error: null};

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