import React, {useState} from 'react';
import {Button, Card, Container, Divider, Grid, Group, Paper, NumberInput, Select, Stack, Text, Title} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import {IconArrowLeft} from '@tabler/icons-react'
import TechnicianCard from "../components/TechnicianCard";
import {IconClock, IconCalendar} from '@tabler/icons-react';

function BookingPage() {

    const location = useLocation();
    const technician = location.state?.technician;

    const timeSlots = [
        { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)' },
        { value: 'afternoon', label: 'Afternoon (12:00 PM - 5:00 PM)' },
        { value: 'evening', label: 'Evening (5:00 PM - 8:00 PM)' },
        { value: 'weekend', label: 'Weekend (Saturday/Sunday)' }
    ]

    const [hours, setHours] = useState();
    const [sessions, setSessions] = useState();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();

    const totalHours = (hours ?? 0) * (sessions ?? 0);

    const handleBooking = function (){
        //Todo: Handle Booking by checking Technician's availability.
    }

    if (!technician )
        return (
            <Container size={"md"} py={"xl"}>
                <Stack gap={"xl"}>
                    <Card shadow="sm" padding="lg" radius={"md"} withBorder>
                        <Title order={1} c={"red"}>No Technician Selected</Title>
                        <Text>Please go back and select a technician first.</Text>
                        <Button
                            component={Link}
                            to="/technicians"
                            variant="outline"
                            leftSection={<IconArrowLeft size={16} />}
                        >
                            Back to Technicians
                        </Button>
                    </Card>
                </Stack>
            </Container>
        )
    else {
        return (
            <Container size={"md"} py={"xl"}>
                <Stack gap={"xl"}>

                    {/*Header */}
                    <Group justify="space-between" align="center">
                        <Button
                            component={Link}
                            to="/technicians"
                            variant="outline"
                            leftSection={<IconArrowLeft size={16} />}
                        >
                            Back to Technicians
                        </Button>
                    </Group>

                    {/*  Booking Main body  */}
                    {/* Technician information*/}
                    <TechnicianCard
                        technician = {technician}
                        showBookBtn = {false}
                    />

                    {/*  Booking Panel  */}
                    <Grid>
                        <Grid.Col span={6}>
                            <NumberInput
                                label={"Hours per session"}
                                value={hours}
                                onChange={setHours}
                                min={1}
                                max={8}
                                step={0.5}
                                leftSection={<IconClock size={16}/>}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <NumberInput
                                label={"Number of Sessions"}
                                value={sessions}
                                onChange={setSessions}
                                min={1}
                                max={10}
                                leftSection={<IconCalendar size={16}/>}
                            />
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <Select
                                label={"Prefer Time slot "}
                                placeholder={"Select your preferred time"}
                                data={timeSlots}
                                value={selectedTimeSlot}
                                onChange={setSelectedTimeSlot}
                                leftSection={<IconClock size={16}/>}
                            />
                        </Grid.Col>
                    </Grid>

                    <Divider/>

                    {/* Booking Summary Page */}

                    <Paper>
                        <Stack gap={"sm"}>
                            <Text fw={700} size={"md"}>Booking Summary</Text>
                            <Group justify="space-between">
                                <Text size={"sm"} fw={500}>Technician:</Text>
                                <Text size={"sm"} fw={600}>{technician.name}</Text>
                            </Group>
                            {timeSlots && (
                                <Group justify="space-between">
                                    <Text size={"sm"} fw={500}>Prefer Time Slot:</Text>
                                    <Text size={"sm"}>{timeSlots.find(slot => slot.value === selectedTimeSlot)?.label}</Text>
                                </Group>
                            )}
                            <Group justify="space-between">
                                <Text size={"sm"} fw={500}>Hours per session:</Text>
                                <Text size={"sm"}>{hours}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size={"sm"} fw={500}>Number of session:</Text>
                                <Text size={"sm"}>{sessions}</Text>
                            </Group>
                            <Divider/>
                            <Group justify="space-between">
                                <Text size={"sm"} fw={500}>Total Hours:</Text>
                                <Text size={"sm"} fw={700}>{totalHours}</Text>
                            </Group>
                        </Stack>
                    </Paper>
                    {/* Booking Page Footer*/}
                    <Button
                        fullWidth
                        disabled={!hours || !sessions || !selectedTimeSlot}
                        onClick={handleBooking}
                        leftSection={<IconCalendar size={16}/>}
                    >
                        Confirm Booking
                    </Button>
                </Stack>
            </Container>
        );
    }
}

export default BookingPage;