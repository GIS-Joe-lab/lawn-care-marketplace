import {useCallback, useMemo} from 'react';
import {ACTIONS, useApp} from '../context/AppContext';

export function useAppointment() {

    const {state, dispatch} = useApp();

    const totalHours = useMemo(() =>
            (state.appointmentData.hours || 0) * (state.appointmentData.sessions || 0),
        [state.appointmentData.hours, state.appointmentData.sessions]);

    const setSelectedTechnician = useCallback((technician, isTopRated) => {
        dispatch({type: ACTIONS.SET_SELECTED_TECHNICIAN, payload: {technician, isTopRated}});
    }, [dispatch]);

    const updateAppointmentData = useCallback((data) => {
        dispatch({type: ACTIONS.UPDATE_APPOINTMENT_DATA, payload: data});
    }, [dispatch]);

    const saveNewAppointment = useCallback((appointmentData) => {
        const newId = Date.now();
        const appointment = {
            ...appointmentData,
            id: newId,  // Ensure id is NOT overwritten by appointmentData
            technician: state.selectedTechnician,
            isTopRated: state.isTopRated,
            appointmentDate: new Date().toISOString()
        };

        // Update appointmentData state with the new id
        dispatch({type: ACTIONS.UPDATE_APPOINTMENT_DATA, payload: { id: newId }});
        
        // Add to booked appointments
        dispatch({type: ACTIONS.ADD_BOOKED_APPOINTMENT, payload: appointment});
    }, [state.selectedTechnician, state.isTopRated, dispatch]);

    const updateBookedAppointment = useCallback((updates, appointmentId) => {
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

    const resetAppointmentSelectionValue = useCallback(() => {
        dispatch({type: ACTIONS.RESET_APPOINTMENT});
    }, [dispatch]);

    return {
        selectedTechnician: state.selectedTechnician,
        isTopRated: state.isTopRated,
        appointmentData: state.appointmentData,
        bookedAppointments: state.bookedAppointments,
        isLoading: state.isLoading,
        error: state.error,
        totalHours,
        setSelectedTechnician,
        updateAppointmentData,
        resetAppointmentSelectionValue,
        saveNewAppointment,
        updateBookedAppointment,
        deleteBookedAppointment
    }
}