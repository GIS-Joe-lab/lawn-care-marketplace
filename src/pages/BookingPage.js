import React, {useState} from 'react';
import {Alert, Button, Container, Group, Stack} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import {IconArrowLeft, IconInfoCircle} from '@tabler/icons-react'
import TechnicianCard from "../components/TechnicianCard";
import BookingForm from "../components/BookingForm";
import NoTechnician from "../components/NoTechnician";

function BookingPage() {

    const location = useLocation();
    const technician = location.state?.technician;
    const isTopRated = location.state?.isTopRated;
    const [isOverBooking, setIsOverBooking] = useState(false);
    const [totalBooking, setTotalBooking] = useState(0);

    const handleBookingSubmit = (formData) => {
        setTotalBooking(formData.totalHours);

        if(formData.totalHours >= 10) {
            setIsOverBooking(true)
        } else {
            setIsOverBooking(false);
            alert("Booking Successful!");
        }
    }

    if (!technician )
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
                    {isOverBooking &&
                        <Group>
                            <Alert icon={<IconInfoCircle size={16}/>} variant="light">
                                You are booking in total of {totalBooking} hours.
                            </Alert>
                        </Group>
                    }

                    {/*  Booking Main body  */}
                    {/* Technician information*/}
                    <TechnicianCard
                        technician = {technician}
                        showBookBtn = {false}
                        isTopRated = {isTopRated}
                    />

                    {/*  Booking Panel  */}
                    <BookingForm
                        technician = {technician}
                        onSubmit = {handleBookingSubmit}
                        />
                </Stack>
            </Container>
        );
    }
}

export default BookingPage;