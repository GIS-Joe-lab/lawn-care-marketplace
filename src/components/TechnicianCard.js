import React from 'react'
import {Badge, Button, Card, Group, Stack, Text} from "@mantine/core";
import {IconCrown} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function TechnicianCard({technician, showBookBtn, isTopRated}) {
    return (
        <Card shadow="sm" padding="lg" radius={"md"} withBorder>
            <Stack gap="md">
                <Group justify={"space-between"}>
                    <Text size="lg" fw="700">{technician.name}</Text>
                    {isTopRated && (
                        <Badge
                            color="yellow"
                            leftSection={<IconCrown size={16} />}
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
                    <Button
                        component={Link}
                        to={"/technician/booking"}
                        state={{technician: technician, isTopRated: isTopRated}}
                        fullWidth>
                        Book Now
                    </Button>}
            </Stack>
        </Card>
    );
}

export default TechnicianCard;