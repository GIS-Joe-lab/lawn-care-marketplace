import React, {useState, useEffect} from 'react';
import {Alert, Button, Container, Group, Stack} from '@mantine/core';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {IconArrowLeft, IconInfoCircle, IconCheck, IconAlertCircle} from '@tabler/icons-react'
import TechnicianCard from "../components/cards/TechnicianCard";
import AppointmentForm from "../components/forms/AppointmentForm";
import NoTechnician from "../components/feedback/EmptyState";
import {useAppointment} from "../hooks/useAppointment";

function AppointmentPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        appointmentData,
        selectedTechnician,
        isTopRated,
        isLoading,
        error,
        updateAppointmentData,
        resetAppointmentSelectionValue,
        saveNewAppointment,
        updateBookedAppointment,
        deleteBookedAppointment
    } = useAppointment();

    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Check if we're editing an existing appointment
    useEffect(() => {
        if (location.state?.isEditing && location.state?.appointment) {
            setIsEditing(location.state?.isEditing);
            
            // Pre-populate appointment data with existing appointment
            updateAppointmentData({
                id: location.state.appointment.id,
                hours: location.state.appointment.hours,
                sessions: location.state.appointment.sessions,
                selectedTimeSlot: location.state.appointment.selectedTimeSlot
            });
        }
    }, [location.state, updateAppointmentData]);

    const handleAppointmentSubmit = () => {
        // Calculate totalHours from current appointmentData
        const totalHours = (appointmentData.hours || 0) * (appointmentData.sessions || 0);

        if (isEditing) {
            // Update existing appointment
            updateBookedAppointment(appointmentData.id, {
                hours: appointmentData.hours,
                sessions: appointmentData.sessions,
                selectedTimeSlot: appointmentData.selectedTimeSlot,
                totalHours
            });
        } else {
            // Create new appointment with totalHours
            saveNewAppointment({
                ...appointmentData,
                totalHours
            });
        }

        setBookingSuccess(true);
    }

    const handleAppointmentCancel =() => {
        if(window.confirm('Are you sure you want to cancel this appointment?')) {
            deleteBookedAppointment(appointmentData.id);
            resetAppointmentSelectionValue()
            navigate('/');
        }
    }

    if (!selectedTechnician) {
        return (
            <Container size={"md"} py={"xl"}>
                <Stack gap={"xl"}>
                    <NoTechnician
                        title={"No Technician Selected"}
                        message={"Please go back and select a technician first."}
                        showBackButton={true}/>
                </Stack>
            </Container>
        )
    } else {
        return (
            <Container size={"md"} py={"xl"}>
                <Stack gap={"xl"}>
                    {/*Header */}
                    <Group justify="space-between" align="center">
                        <Button
                            component={Link}
                            to="/"
                            variant="outline"
                            leftSection={<IconArrowLeft size={16} />}
                            onClick={() => resetAppointmentSelectionValue()}
                        >
                            Back to Home
                        </Button>
                    </Group>

                    {/* Success Message */}
                    {bookingSuccess && (
                        <Alert
                            color="green"
                            icon={<IconCheck size={16}/>}
                            title={isEditing ? "Appointment Updated!" : "Booking Successful!"}
                        >
                            {isEditing ? 
                                "Your appointment has been updated successfully!" : 
                                "Your booking has been confirmed. Thank you for choosing our service!"
                            }
                        </Alert>
                    )}

                    {/* Loading and Error States */}
                    {isLoading && (
                        <Group>
                            <Alert icon={<IconInfoCircle size={16}/>}>
                                Please wait while we are processing your booking.
                            </Alert>
                        </Group>
                    )}

                    {error && (
                        <Group>
                            <Alert c={"red"} icon={<IconAlertCircle size={16}/>} >
                                {error}
                            </Alert>
                        </Group>
                    )}

                    {/* Technician Information */}
                    <TechnicianCard
                        technician = {selectedTechnician}
                        showBookBtn = {false}
                        isTopRated = {isTopRated}
                    />

                    {/* Appointment Form */}
                    <AppointmentForm
                        technician = {selectedTechnician}
                        onSubmit = {handleAppointmentSubmit}
                        onCancel={handleAppointmentCancel}
                        isEditing={isEditing}
                    />
                </Stack>
            </Container>
        );
    }
}

export default AppointmentPage;