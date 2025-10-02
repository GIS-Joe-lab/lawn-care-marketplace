import React from "react";
import {Button, Container, Grid, TextInput, Select, Slider, Stack} from '@mantine/core';
import {IconHome, IconSearch} from '@tabler/icons-react'
import TechnicianCard from "../components/cards/TechnicianCard";
import NoTechnician from "../components/feedback/EmptyState";
import {useTechnician} from "../hooks/useTechnician";
import {Link} from "react-router-dom";

function TechniciansPage() {
    const {
        searchQuery,
        selectedService,
        selectedMinRating,
        minRating,
        maxRating,
        services,
        topRatedTechnicians,
        filteredTechnicians,
        hasTechnicians,
        hasNoFilter,
        setSearchQuery,
        setSelectedService,
        setSelectedMinRating,
        resetFilters
    } = useTechnician();

    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">

                {/* Search and Filter section*/}
                <Grid>
                    <Grid.Col span={1}>
                        <Button
                            component={Link}
                            variant="subtle"
                            size={"sm"}
                            to={"/"}
                        >
                            <IconHome size={32}/>
                        </Button>
                    </Grid.Col>
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
                    <Grid.Col span={2}>
                        <Slider
                            label={`Minimum Rating ${selectedMinRating.toFixed(1)}`}
                            color={"green"}
                            value={selectedMinRating}
                            onChange={setSelectedMinRating}
                            min={minRating}
                            max={maxRating}
                            step={0.1}
                            inverted
                            marks={[
                                {value: minRating, label: minRating.toString()},
                                {value: maxRating, label: maxRating.toString()}
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
                <div className="technicians-grid-container">
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
                            title="No Technicians Found"
                            message="Try adjusting your search criteria or filters"
                            showBackButton={false}
                        />)
                    }
                </div>
            </Stack>
        </Container>
    );
}

export default TechniciansPage;