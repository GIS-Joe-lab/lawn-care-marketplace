import React, {useState} from 'react';
import {TIME_SLOTS} from "../constants/timeSlots";
import {Button, Card, Divider, Grid, NumberInput, Select, Stack, Text} from "@mantine/core";
import {IconClock, IconCalendar} from "@tabler/icons-react";
import BookingSummary from "./BookingSummary";

function BookingForm ({technician, onSubmit}) {

    const [hours, setHours] = useState();
    const [sessions, setSessions] = useState();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();

    const totalHours = (hours ?? 0) * (sessions ?? 0);

    const handleSubmit = () => {
        const formData = {hours, sessions, selectedTimeSlot, totalHours};
        onSubmit(formData);
    }

    return (
        <Card shadow="sm" padding="lg" radius={"md"} withBorder >
            <Stack gap={"xl"}>
                <Grid>
                    <Grid.Col span={6}>
                        <NumberInput
                            label={"Hours per session"}
                            value={hours}
                            onChange={setHours}
                            min={1}
                            max={10}
                            step={0.5}
                            leftSection={<IconClock size={16}/>}
                        />
                        <Text mt={4} size="sm" c={"dimmed"} >Maximum 10 hour per session</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput
                            label={"Number of Sessions"}
                            value={sessions}
                            onChange={setSessions}
                            min={1}
                            max={10}
                            leftSection={<IconCalendar size={16}/>}
                        />
                        <Text mt={4} size="sm" c={"dimmed"} >Maximum 10 the session</Text>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Select
                            label={"Prefer Time slot "}
                            placeholder={"Select your preferred time"}
                            data={TIME_SLOTS}
                            value={selectedTimeSlot}
                            onChange={setSelectedTimeSlot}
                            leftSection={<IconClock size={16}/>}
                        />
                    </Grid.Col>
                </Grid>

                <Divider/>

                {/* Booking Summary */}
                {hours && sessions && selectedTimeSlot && <BookingSummary
                    technician={technician.name}
                    selectedTimeSlot={selectedTimeSlot}
                    hours={hours}
                    sessions={sessions}
                />}

                {/* Booking Page Footer*/}
                <Button
                    fullWidth
                    disabled={!hours || !sessions || !selectedTimeSlot}
                    onClick={handleSubmit}
                    leftSection={<IconCalendar size={16}/>}
                >
                    Confirm Booking
                </Button>
            </Stack>
        </Card>
    );
}

export default BookingForm;