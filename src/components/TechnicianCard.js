import React from 'react'
import {Badge, Button, Card, Group, Stack, Text} from "@mantine/core";
import {IconCrown} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom';
import {useAppointment} from "../hooks/useAppointment";

function TechnicianCard({technician, showBookBtn, isTopRated, appointments}) {
    const navigate = useNavigate();
    const {setSelectedTechnician} = useAppointment();

    const handleBookNow = () => {
        setSelectedTechnician(technician, isTopRated)
        navigate('/technician/appointment');
    }
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                <Stack style={{ cursor: 'default' }}>
                    <Group justify="space-between" >
                        <Group gap="md">
                            <Text size="lg" fw="700">{technician.name}</Text>
                            {isTopRated && (
                                <Badge color="yellow" size="sm" leftSection={<IconCrown />}>
                                    Top Rated
                                </Badge>
                            )}
                            <Badge color="green" size="sm">
                                {technician.rating}
                            </Badge>
                        </Group>
                        {appointments && (
                            <Text size="sm" c="dimmed">
                                {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
                            </Text>
                        )}
                    </Group>

                    {/* Services */}
                    <Group gap="xs">
                        <Text size="sm" fw="700">Services:</Text>
                        {technician.services.map(service => (
                            <Badge key={service} size="sm">
                                {service}
                            </Badge>
                        ))}
                    </Group>
                </Stack>

                {showBookBtn &&
                    <Button onClick={handleBookNow} fullWidth>
                        Book Now
                    </Button>}
            </Stack>
        </Card>
    );
}

export default TechnicianCard;