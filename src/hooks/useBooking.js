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

    const saveBookedAppointment = useCallback((bookingData) => {
        const appointment = {
            id: Date.now(),
            technician: state.selectedTechnician,
            isTopRated: state.isTopRated,
            ...bookingData,
            bookingDate: new Date().toISOString(),
            status: 'confirmed'
        };

        dispatch({type: ACTIONS.ADD_BOOKED_APPOINTMENT, payload: appointment});
    }, [state.selectedTechnician, state.isTopRated, dispatch]);

    const updateBookedAppointment = useCallback((appointmentId, updates) => {
        dispatch({
            type: ACTIONS.UPDATE_BOOKED_APPOINTMENT,
            payload: { id: appointmentId, updates }
        });
    }, [dispatch]);

    const deleteBookedAppointment = useCallback((appointmentId) => {
        dispatch({
            type: ACTIONS.DELETE_BOOKED_APPOINTMENT,
            payload: appointmentId
        });
    }, [dispatch]);

    const resetBooking = useCallback(() => {
        dispatch({type: ACTIONS.RESET_BOOKING});
    }, [dispatch]);

    const clearBookedAppointments = useCallback(() => {
        dispatch({type: ACTIONS.CLEAR_BOOKED_APPOINTMENTS});
    }, [dispatch]);

    const addBookedAppointmentDirect = useCallback((appointment) => {
        dispatch({type: ACTIONS.ADD_BOOKED_APPOINTMENT, payload: appointment});
    }, [dispatch]);


    return {
        selectedTechnician: state.selectedTechnician,
        isTopRated: state.isTopRated,
        bookingData: state.bookingData,
        bookedAppointments: state.bookedAppointments,
        isLoading: state.isLoading,
        error: state.error,
        totalHours,
        isOverBooking,
        setSelectedTechnician,
        updateBookingData,
        resetBooking,
        submitBooking,
        saveBookedAppointment,
        updateBookedAppointment,
        deleteBookedAppointment,
        clearBookedAppointments,
        addBookedAppointmentDirect
    }
}