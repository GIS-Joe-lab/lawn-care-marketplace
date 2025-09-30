import {useCallback, useMemo} from 'react';
import {ACTIONS, useApp} from '../context/AppContext';

export function useBooking() {

    const {state, dispatch} = useApp();

    const totalHours = useMemo(() =>
            (state.bookingData.hours || 0) * (state.bookingData.sessions || 0),
        [state.bookingData.hours, state.bookingData.sessions]);

    const isOverBooking = totalHours >= 10;

    const setSelectedTechnician = useCallback((technician, isTopRated) => {
        dispatch({type: ACTIONS.SET_SELECTED_TECHNICIAN, payload: {technician, isTopRated}});
    }, [dispatch]);

    const updateBookingData = useCallback((data) => {
        dispatch({type: ACTIONS.UPDATE_BOOKING_DATA, payload: data});
    }, [dispatch]);

    const submitBooking = useCallback(() => {

        return {
            ...state.bookingData,
            totalHours
        };
    }, [state.bookingData, totalHours])

    return {
        selectedTechnician: state.selectedTechnician,
        isTopRated: state.isTopRated,
        isLoading: state.isLoading,
        error: state.error,
        totalHours,
        isOverBooking,
        setSelectedTechnician,
        updateBookingData,
        submitBooking
    }
}