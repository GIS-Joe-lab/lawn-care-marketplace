import React from 'react';
import {TIME_SLOTS} from "../constants/timeSlots";
import {Alert, Button, Card, Divider, Grid, NumberInput, Select, Stack, Text} from "@mantine/core";
import {IconClock, IconCalendar} from "@tabler/icons-react";
import BookingSummary from "./BookingSummary";
import {useBooking} from "../hooks/useBooking";

function BookingForm({technician, onSubmit, onCancel, isEditing = false}) {

    const {bookingData, updateBookingData} = useBooking();

    const canBook = bookingData.hours && bookingData.sessions && bookingData.selectedTimeSlot;

    const hours = bookingData.hours || '';
    const sessions = bookingData.sessions || '';
    const selectedTimeSlot = bookingData.selectedTimeSlot || '';

    const totalHours = (hours || 0) * (sessions || 0);

    const handleSubmit = () => {
        const formData = {hours, sessions, selectedTimeSlot, totalHours};
        onSubmit(formData);
    }

    const handleCancelAppointment = () => {
        onCancel();
    }

    return (
        <Card shadow="sm" padding="lg" radius={"md"} withBorder>
            <Stack gap={"xl"}>
                {/* Show editing indicator */}
                {isEditing && (
                    <Alert color="blue" title="Editing Existing Appointment">
                        You are editing an existing appointment. Changes will update the current booking.
                    </Alert>
                )}

                <Grid>
                    <Grid.Col span={6}>
                        <NumberInput
                            label={"Hours per session"}
                            value={hours}
                            onChange={(value) => updateBookingData({hours: value})}
                            min={1}
                            max={10}
                            step={0.5}
                            leftSection={<IconClock size={16}/>}
                        />
                        <Text mt={4} size="sm" c={"dimmed"}>Maximum 10 hours per session</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput
                            label={"Number of Sessions"}
                            value={sessions}
                            onChange={(value) => updateBookingData({sessions: value})}
                            min={1}
                            max={10}
                            leftSection={<IconCalendar size={16}/>}
                        />
                        <Text mt={4} size="sm" c={"dimmed"}>Maximum 10 sessions</Text>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Select
                            label={"Prefer Time slot "}
                            placeholder={"Select your preferred time"}
                            data={TIME_SLOTS}
                            value={selectedTimeSlot}
                            onChange={(value) => updateBookingData({selectedTimeSlot: value})}
                            leftSection={<IconClock size={16}/>}
                        />
                    </Grid.Col>
                </Grid>

                <Divider/>

                {/* Booking Summary */}
                {canBook && <BookingSummary
                    technician={technician.name}
                    selectedTimeSlot={selectedTimeSlot}
                    hours={hours}
                    sessions={sessions}
                />}

                {/* Booking Page Footer*/}
                <Button
                    fullWidth
                    disabled={!canBook}
                    onClick={handleSubmit}
                    leftSection={<IconCalendar size={16}/>}
                >
                    {isEditing ? "Update Appointment" : "Confirm Booking"}
                </Button>
                {isEditing && (
                    <Button
                        fullWidth
                        onClick={handleCancelAppointment}
                    >Cancel Appointment</Button>
                )}
            </Stack>
        </Card>
    );
}

export default BookingForm;