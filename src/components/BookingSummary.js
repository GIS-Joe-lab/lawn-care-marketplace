import React from 'react';
import {Divider, Group, Paper, Stack, Text} from "@mantine/core";
import {TIME_SLOTS} from "../constants/timeSlots";

function BookingSummary ({technicianName, selectedTimeSlot, hours, sessions}) {

    const totalHours = hours * sessions;

    return (
        <Paper>
            <Stack gap={"sm"}>
                <Text fw={700} size={"md"}>Booking Summary</Text>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Technician:</Text>
                    <Text size={"sm"} fw={600}>{technicianName}</Text>
                </Group>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Prefer Time Slot:</Text>
                    <Text size={"sm"}>{TIME_SLOTS.find(slot => slot.value === selectedTimeSlot)?.label}</Text>
                </Group>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Hours per session:</Text>
                    <Text size={"sm"}>{hours}</Text>
                </Group>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Number of session:</Text>
                    <Text size={"sm"}>{sessions}</Text>
                </Group>
                <Divider/>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Total Hours:</Text>
                    <Text size={"sm"} fw={700}>{totalHours}</Text>
                </Group>
            </Stack>
        </Paper>
    );
}

export default BookingSummary;