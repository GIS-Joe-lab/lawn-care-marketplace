import React, {useState} from "react";
import {Button, Container, Title, Grid, Group, Paper, TextInput, Select, Stack} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react'
import TechnicianCard from "../components/TechnicianCard";

const technicians = [
    {
        id: 1,
        name: 'John Smith',
        rating: 4.8,
        services: ['Lawn Mowing', 'Hedge Trimming']
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        rating: 4.9,
        services: ['Lawn Mowing', 'Fertilizing', 'Weed Control']
    },
    {
        id: 3,
        name: 'Mike Wilson',
        rating: 4.6,
        services: ['Tree Pruning', 'Hedge Trimming']
    },
    {
        id: 4,
        name: 'Emily Davis',
        rating: 4.7,
        services: ['Lawn Mowing', 'Fertilizing', 'Weed Control']
    },
    {
        id: 5,
        name: 'David Brown',
        rating: 4.5,
        services: ['Lawn Mowing', 'Leaf Removal', 'Hedge Trimming']
    },
    {
        id: 6,
        name: 'Lisa Anderson',
        rating: 4.9,
        services: ['Fertilizing', 'Weed Control', 'Mulching']
    }
];

function TechniciansPage() {

    const [searchQeury, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const services = ['Lawn Mowing', 'Hedge Trimming', 'Fertilizing', 'Weed Control', 'Tree Pruning'];

    // Filter Technicians
    const filteredTechnicians = technicians.filter(technicians => {
        const matchesSearch = technicians.name.toLocaleLowerCase().includes(searchQeury.toLowerCase());
        const matchesService = !selectedService || technicians.services.includes(selectedService);
        return matchesSearch && matchesService
    })

    // Reset All Filter
    const resetFilter = () => {
        setSearchQuery('');
        setSelectedService(null);
    }

    // Find all technician who has rating 4.8 or more and classify them as top technician
    const topRatedTechnicians = technicians.filter(technician => technician.rating >= 4.8);

    // Check if the filterTechnician object has one or more return
    const hasTechnicians = filteredTechnicians.length > 0;
    const hasFilter = !searchQeury && !selectedService;

    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">

                {/* Header section*/}
                <Title order={1} c="green">
                    Our Lawn Care Technicians
                </Title>

                {/* Search and Filter section*/}
                <Group grow>
                    <TextInput
                        placeholder="Search by name..."
                        leftSection={<IconSearch size={16}/>}
                        value={searchQeury}
                        onChange={(event) => setSearchQuery(event.currentTarget.value)}
                    />

                    <Select
                        lable="Filter Service"
                        placeholder="Filter by service..."
                        data={services}
                        value={selectedService}
                        onChange={setSelectedService}
                        clearable
                    />

                    <Button
                        disabled={hasFilter}
                        onClick={resetFilter}
                        color="red"
                        size="sm"
                    >
                        Clear All Filters
                    </Button>
                </Group>

                {/*  Technicians Display body section  */}
                {hasTechnicians ?
                    // With Technician result
                    (<Grid>
                        {filteredTechnicians.map(technician => (
                            <Grid.Col key={technician.id} span={{base: 12, sm: 6, lg: 4}}>
                                <TechnicianCard
                                    technician={technician}
                                    showBookBtn={true}
                                    isTopRated={topRatedTechnicians.includes(technician)}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>) :
                    // Without Technician result
                    (<Paper p="xl" ta="center" withBorder radius={"md"}>
                        <Stack gap="md">
                            <Title order={3} c={"dimmed"}>No technicians found</Title>
                        </Stack>
                    </Paper>)
                }
            </Stack>
        </Container>
    );
}

export default TechniciansPage;