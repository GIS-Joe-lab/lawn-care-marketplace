import React from 'react';
import {Container, Grid, Title, Stack, Button, Group} from "@mantine/core";
import {IconArrowRight} from '@tabler/icons-react';
import {Link} from 'react-router-dom';
import TechnicianAppointmentsGrid from '../components/TechnicianAppointmentsGrid';
import {useBooking} from '../hooks/useBooking';

function HomePage() {
    const {bookedAppointments} = useBooking();

    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <Stack gap="xl" ta="center">
                    <Title order={1} c="green">
                        Lawn Care Marketplace
                    </Title>
                </Stack>

                {/*Header*/}
                <Group gap="md">
                    <Title order={2} c="green">Upcoming Appointments</Title>

                    {/*Browse Technicians */}
                    <Button
                        component={Link}
                        to="/technicians"
                        rightSection={<IconArrowRight size={16}/>}
                        size="lg">
                        Browse Technicians
                    </Button>
                </Group>

                {/*Technician Appointment Grid*/}
                <TechnicianAppointmentsGrid
                    bookedAppointments={bookedAppointments}
                />
            </Stack>
        </Container>
    );
}

export default HomePage;