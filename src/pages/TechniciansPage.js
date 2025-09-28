import React, {useState} from "react";
import {Button, Container, Title, Grid, Group, Paper, TextInput, Select, Stack} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react'
import TechnicianCard from "../components/TechnicianCard";
import {Technicians} from "../constants/technicians";
import NoTechnician from "../components/NoTechnician";

function TechniciansPage() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const services = ['Lawn Mowing', 'Hedge Trimming', 'Fertilizing', 'Weed Control', 'Tree Pruning'];

    // Filter Technicians
    const filteredTechnicians = Technicians.filter(technicians => {
        const matchesSearch = technicians.name.toLocaleLowerCase().includes(searchQuery.toLowerCase());
        const matchesService = !selectedService || technicians.services.includes(selectedService);
        return matchesSearch && matchesService
    })

    // Reset All Filter
    const resetFilters = () => {
        setSearchQuery('');
        setSelectedService(null);
    }

    // Find all technician who has rating 4.8 or more and classify them as top technician
    const topRatedTechnicians = Technicians.filter(technician => technician.rating >= 4.8);

    // Check if the filterTechnician object has one or more return
    const hasTechnicians = filteredTechnicians.length > 0;
    const hasNoFilter = !searchQuery && !selectedService;

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
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.currentTarget.value)}
                    />

                    <Select
                        placeholder="Filter by service..."
                        data={services}
                        value={selectedService}
                        onChange={setSelectedService}
                        clearable
                    />

                    <Button
                        disabled={hasNoFilter}
                        onClick={resetFilters}
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
                    (<NoTechnician
                        title = "No Technicians Found"
                        message="Try adjusting your search criteria or filters"
                        showBackButton={false}
                    />)
                }
            </Stack>
        </Container>
    );
}

export default TechniciansPage;