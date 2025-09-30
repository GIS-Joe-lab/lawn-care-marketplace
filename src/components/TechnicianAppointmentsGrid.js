import React, { useMemo } from 'react';
import { Card, Group, Stack, Text, Title} from '@mantine/core';
import TechnicianAppointmentCard from "./TechnicianAppointmentCard";

function TechnicianAppointmentsGrid({bookedAppointments}) {

    const techniciansWithAppointments = useMemo(() => {
        const grouped = bookedAppointments.reduce((acc, appointment) => {
            const techId = appointment.technician.id;
            if (!acc[techId]) {
                acc[techId] = {
                    technician: appointment.technician,
                    isTopRated: appointment.isTopRated,
                    appointments: []
                };
            }
            acc[techId].appointments.push(appointment);
            return acc;
        }, {});

        return Object.values(grouped);
    }, [bookedAppointments]);

    if (bookedAppointments.length === 0) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md" ta="center">
                    <Title order={3} c="dimmed">No Booked Appointments</Title>
                    <Text c="dimmed">Your booked appointments will appear here</Text>
                </Stack>
            </Card>
        );
    }

    return (
        <Stack gap="md">
            <Group align="flex-start" gap="md" wrap="wrap">
                {techniciansWithAppointments.map(({ technician, isTopRated, appointments }) => (
                    <TechnicianAppointmentCard
                        key={technician.id}
                        technician={technician}
                        isTopRated={isTopRated}
                        appointments={appointments}
                    />
                ))}
            </Group>
        </Stack>
    );
}

export default TechnicianAppointmentsGrid;