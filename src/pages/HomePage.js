import React from 'react';
import {Container, Title, Stack, Button, Group} from "@mantine/core";
import {IconArrowRight} from '@tabler/icons-react';
import {Link} from 'react-router-dom';

function HomePage() {
    return (
        <Container size="md" py="xl">
            <Stack gap="xl" ta="center">
                <Title order={1} c="green">
                    Lawn Care Marketplace
                </Title>

                <Group gap="md">
                    <Button
                        component={Link}
                        to="/technicians"
                        rightSection={<IconArrowRight size={16}/>}
                        size="lg">
                        Browse Technicians
                    </Button>
                </Group>
            </Stack>
        </Container>
    );
}

export default HomePage;