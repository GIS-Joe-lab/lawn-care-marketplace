import React, {useState, useEffect} from 'react';
import {Alert, Button, Container, Group, Stack} from '@mantine/core';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {IconArrowLeft, IconInfoCircle, IconCheck, IconAlertCircle} from '@tabler/icons-react'
import TechnicianCard from "../components/TechnicianCard";
import BookingForm from "../components/BookingForm";
import NoTechnician from "../components/NoTechnician";
import {useBooking} from "../hooks/useBooking";

function BookingPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        selectedTechnician: contextTechnician,
        isTopRated: contextIsTopRated,
        isLoading,
        error,
        updateBookingData,
        resetBooking,
        saveBookedAppointment,
        updateBookedAppointment
    } = useBooking();

    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);

    // Check if we're editing an existing appointment
    useEffect(() => {
        if (location.state?.isEditing && location.state?.editingAppointment) {
            setIsEditing(true);
            setEditingAppointment(location.state.editingAppointment);
            
            // Pre-populate booking data with existing appointment
            updateBookingData({
                hours: location.state.editingAppointment.hours,
                sessions: location.state.editingAppointment.sessions,
                selectedTimeSlot: location.state.editingAppointment.selectedTimeSlot
            });
        }
    }, [location.state, updateBookingData]);

    // Get technician from either Context or location state
    const technician = contextTechnician || location.state?.technician || location.state?.editingAppointment?.technician;
    const technicianIsTopRated = contextIsTopRated || location.state?.isTopRated || location.state?.editingAppointment?.isTopRated;

    const handleBookingSubmit = (formData) => {
        updateBookingData({
            hours: formData.hours,
            sessions: formData.sessions,
            selectedTimeSlot: formData.selectedTimeSlot
        });

        if (isEditing && editingAppointment) {
            // Update existing appointment
            updateBookedAppointment(editingAppointment.id, {
                hours: formData.hours,
                sessions: formData.sessions,
                selectedTimeSlot: formData.selectedTimeSlot,
                totalHours: formData.totalHours,
                status: 'confirmed' // Reset to confirmed when updated
            });
        } else {
            // Create new appointment
            saveBookedAppointment(formData);
        }

        setBookingSuccess(true);

        // Auto Navigate back to home page after 3 seconds
        setTimeout(() => {
            resetBooking();
            navigate('/');
        }, 3000)
    }

    if (!technician) {
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
                            onClick={() => resetBooking()}
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
                            } Redirecting to home page in 3 seconds...
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
                        technician = {technician}
                        showBookBtn = {false}
                        isTopRated = {technicianIsTopRated}
                    />

                    {/* Booking Form */}
                    <BookingForm
                        technician = {technician}
                        onSubmit = {handleBookingSubmit}
                        isEditing={isEditing}
                    />
                </Stack>
            </Container>
        );
    }
}

export default BookingPage;