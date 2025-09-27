import React from 'react'
import {Badge, Button, Card, Group, Stack, Text} from "@mantine/core";

function TechnicianCard({technician}) {
    return (
        <Card shadow="sm" padding="lg" radius={"md"} withBorder>
            <Stack gap="md">
                <Group justify={"space-between"}>
                    <Text size="lg" fw="700">{technician.name}</Text>
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

                {/*ToDo: Should navigate to another page*/}
                <Button fullWidth>Book Now</Button>
            </Stack>
        </Card>
    );
}

export default TechnicianCard;