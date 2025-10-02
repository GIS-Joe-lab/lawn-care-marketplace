import React from 'react';
import {Divider, Group, Paper, Stack, Text} from "@mantine/core";
import {TIME_SLOTS} from "../../constants/timeSlots";
import {useAppointment} from "../../hooks/useAppointment";

function AppointmentSummary () {

    const {appointmentData, selectedTechnician} = useAppointment();
    const totalHours = appointmentData.hours * appointmentData.sessions;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Paper>
            <Stack gap={"sm"}>
                <Text fw={700} size={"md"}>Appointment Summary</Text>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Technician:</Text>
                    <Text size={"sm"} fw={600}>{selectedTechnician.name}</Text>
                </Group>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Prefer Date:</Text>
                    <Text size={"sm"}>{formatDate(appointmentData.selectedDate)}</Text>
                </Group>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Prefer Time Slot:</Text>
                    <Text size={"sm"}>{TIME_SLOTS.find(slot => slot.value === appointmentData.selectedTimeSlot)?.label}</Text>
                </Group>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Hours per session:</Text>
                    <Text size={"sm"}>{appointmentData.hours}</Text>
                </Group>
                <Group justify="space-between">
                    <Text size={"sm"} fw={500}>Number of session:</Text>
                    <Text size={"sm"}>{appointmentData.sessions}</Text>
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

export default AppointmentSummary;