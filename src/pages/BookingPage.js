import React, {useState} from 'react';
import {Alert, Button, Container, Group, Stack} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import {IconArrowLeft, IconInfoCircle, IconCheck, IconAlertCircle} from '@tabler/icons-react'
import TechnicianCard from "../components/TechnicianCard";
import BookingForm from "../components/BookingForm";
import NoTechnician from "../components/NoTechnician";
import {useBooking} from "../hooks/useBooking";

function BookingPage() {
    const navigate = useNavigate();

    const {
        selectedTechnician,
        isTopRated,
        isLoading,
        error,
        updateBookingData
    } = useBooking();

    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleBookingSubmit = (formData) => {

        updateBookingData({
            hours: formData.hours,
            sessions: formData.sessions,
            selectedTimeSlot: formData.selectedTimeSlot
        });

        if(formData.totalHours < 10) {
            setBookingSuccess(true);

            // Auto Navigate back to technician page after 3 seconds
            setTimeout(() => {
                navigate('/technicians');
            }, 3000)
        }
    }

    if (!selectedTechnician )
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
    else {
        return (
            <Container size={"md"} py={"xl"}>
                <Stack gap={"xl"}>
                    {/*Header */}
                    <Group justify="space-between" align="center">
                        <Button
                            component={Link}
                            to="/technicians"
                            variant="outline"
                            leftSection={<IconArrowLeft size={16} />}
                        >
                            Back to Technicians
                        </Button>
                    </Group>

                    {bookingSuccess && (
                        <Alert
                            color="green"
                            icon={<IconCheck size={16}/>}
                            title="Booking Successful!"
                        >
                            Your booking has been confirmed. Redirecting to technicians page in 3 seconds...
                        </Alert>
                    )}

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

                    {/*  Booking Main body  */}
                    {/* Technician information*/}
                    <TechnicianCard
                        technician = {selectedTechnician}
                        showBookBtn = {false}
                        isTopRated = {isTopRated}
                    />

                    {/*  Booking Panel  */}
                    <BookingForm
                        technician = {selectedTechnician}
                        onSubmit = {handleBookingSubmit}
                    />
                </Stack>
            </Container>
        );
    }
}

export default BookingPage;