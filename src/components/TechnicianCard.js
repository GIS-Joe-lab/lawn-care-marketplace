import React from 'react'
import {Badge, Button, Card, Group, Stack, Text} from "@mantine/core";
import {IconCrown} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom';
import {useBooking} from "../hooks/useBooking";

function TechnicianCard({technician, showBookBtn, isTopRated}) {
    const navigate = useNavigate();
    const {setSelectedTechnician} = useBooking();

    const handleBookNow = () => {
        setSelectedTechnician(technician, isTopRated)
        navigate('/technician/booking');
    }
    return (
        <Card shadow="sm" padding="lg" radius={"md"} withBorder>
            <Stack gap="md">
                <Group justify={"space-between"}>
                    <Text size="lg" fw="700">{technician.name}</Text>
                    {isTopRated && (
                        <Badge
                            color="yellow"
                            leftSection={<IconCrown size={16}/>}
                            size="sm"
                        >
                            Top Rated
                        </Badge>
                    )}
                    <Badge color="green">
                        {technician.rating}
                    </Badge>
                </Group>

                <Stack gap="xs">
                    <Text size="sm" fw={"700"}>Services:</Text>
                    <Group gap="xs">
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