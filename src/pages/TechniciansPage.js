import React, {useState} from "react";
import {Button, Container, Title, Grid, TextInput, Select, Slider, Stack} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react'
import TechnicianCard from "../components/TechnicianCard";
import {Technicians} from "../constants/technicians";
import NoTechnician from "../components/NoTechnician";

function TechniciansPage() {

    const minRating = Math.min(...Technicians.map(t => t.rating))
    const maxRating = Math.max(...Technicians.map(t => t.rating))
    const services = [...new Set(Technicians.flatMap(technician => technician.services))].sort();
    const topRatedTechnicians = Technicians.filter(technician => technician.rating >= 4.8);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedMinRating, setSelectedMinRating] = useState(minRating);

    // Filter Technicians
    const filteredTechnicians = Technicians.filter(technicians => {
        const matchesSearch = technicians.name.toLocaleLowerCase().includes(searchQuery.toLowerCase());
        const matchesService = !selectedService || technicians.services.includes(selectedService);
        return matchesSearch && matchesService && technicians.rating >= selectedMinRating
    })

    // Check if the filterTechnician object has one or more return
    const hasTechnicians = filteredTechnicians.length > 0;
    const hasNoFilter = !searchQuery && !selectedService && selectedMinRating === minRating;

    // Reset All Filter
    const resetFilters = () => {
        setSearchQuery('');
        setSelectedService(null);
        setSelectedMinRating(minRating)
    }
    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">

                {/* Header section*/}
                <Title order={1} c="green">
                    Our Lawn Care Technicians
                </Title>

                {/* Search and Filter section*/}
                <Grid>
                    <Grid.Col span={3}>
                        <TextInput
                            placeholder="Search by name..."
                            leftSection={<IconSearch size={16}/>}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.currentTarget.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Select
                            placeholder="Filter by service..."
                            data={services}
                            value={selectedService}
                            onChange={setSelectedService}
                            clearable
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Slider
                            label={`Minimum Rating ${selectedMinRating.toFixed(1)}`}
                            color={"green"}
                            value={selectedMinRating}
                            onChange={setSelectedMinRating}
                            min={minRating}
                            max={maxRating}
                            step={0.1}
                            marks={[
                                {value: minRating, label:minRating.toString()},
                                {value: maxRating, label:maxRating.toString()}
                            ]}
                            />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button
                            disabled={hasNoFilter}
                            onClick={resetFilters}
                            color="red"
                            size="sm"
                        >
                            Clear All Filters
                        </Button>
                    </Grid.Col>
                </Grid>

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