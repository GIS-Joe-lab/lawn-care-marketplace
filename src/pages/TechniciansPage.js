import React, {useState} from "react";
import {
    Container,
    Title,
    Grid,
    Group,
    TextInput,
    Select,
    Stack
} from '@mantine/core';
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
                        placeholder={"Filter by service..."}
                        data={services}
                        value={selectedService}
                        onChange={setSelectedService}
                    />
                </Group>

                {/*  Technicians Display body section  */}
                <Grid>
                    {filteredTechnicians.map(technician => (
                        <Grid.Col key={technician.id} span={{base: 12, sm: 6, lg: 4}}>
                            <TechnicianCard
                                technician={technician}
                                showBookBtn={true}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
}

export default TechniciansPage;