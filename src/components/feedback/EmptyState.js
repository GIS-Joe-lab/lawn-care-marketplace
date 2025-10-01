import React from 'react';
import {Button, Paper, Stack, Text, Title} from "@mantine/core";
import {Link} from 'react-router-dom';
import {IconArrowLeft} from "@tabler/icons-react";


function EmptyState ({title, message, showBackButton}) {
    return (
        <Paper p="xl" ta="center" withBorder radius={"md"}>
            <Stack gap="md">
                <Title order={1} c="dimmed">{title}</Title>
                {message && (<Text order={3} c="dimmed">{message}</Text>)}

                {showBackButton && (<Button
                    component={Link}
                    to="/technicians"
                    variant="outline"
                    leftSection={<IconArrowLeft size={16} />}
                >
                    Back to Technicians Page
                </Button>)}
            </Stack>
        </Paper>
    );
}

export default EmptyState;