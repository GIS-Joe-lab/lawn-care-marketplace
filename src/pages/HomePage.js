import React from 'react';
import {Container, Title, Stack, Button, Group} from "@mantine/core";
import {IconArrowRight} from '@tabler/icons-react';
import {Link} from 'react-router-dom';
import TechnicianAppointmentsGrid from '../components/layouts/TechnicianAppointmentsGrid';
import {useAppointment} from '../hooks/useAppointment';

function HomePage() {
    const {bookedAppointments} = useAppointment();

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