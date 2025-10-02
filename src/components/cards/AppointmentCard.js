import React from 'react';
import {Card, Group, Stack, Text} from "@mantine/core";
import {IconClock,IconUser, IconCalendar, IconTimeline} from '@tabler/icons-react'
import { TIME_SLOTS } from '../../constants/timeSlots';
import {useAppointment} from "../../hooks/useAppointment";
import { useNavigate } from 'react-router-dom';

function AppointmentCard ({appointments}) {

    const navigate = useNavigate();
    const { setSelectedTechnician } = useAppointment();

    const handleEditAppointment = (appointment) => {

        setSelectedTechnician(appointment.technician, appointment.isTopRated);

        // Navigate to Appointment page with existing data
        navigate('/technician/appointment', {
            state: {
                appointment: appointment,
                isEditing: true
            }
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatSelectedDate = (date) => {
        if (!date) return 'No date selected';
        
        // Ensure we have a proper Date object
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Check if the date is valid
        if (isNaN(dateObj.getTime())) return 'Invalid date';
        
        return dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeSlotLabel = (value) => {
        return TIME_SLOTS.find(slot => slot.value === value)?.label || value;
    };

    return (
        <div>
            {appointments.length > 0 ? (
                <Group 
                    align="flex-start" 
                    gap="md" 
                    wrap="wrap"
                    className="appointmentsGroupCards"
                >
                    {appointments.map((appointment) => (
                        <Card
                            key={appointment.id}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            className="appointmentCard"
                            onClick={() => handleEditAppointment(appointment)}
                        >
                            <Stack gap="sm">
                                {/* Appointment ID */}
                                {appointment.id && (
                                    <Text size="xs" c="dimmed">
                                        Appointment #{appointment.id}
                                    </Text>
                                )}

                                {/* Appointment Details */}
                                <Stack gap="xs">
                                    <Group gap="xs">
                                        <IconCalendar size={16} color="var(--mantine-color-green-6)" />
                                        <Text size="sm">
                                            {formatSelectedDate(appointment.selectedDate)}
                                        </Text>
                                    </Group>

                                    <Group gap="xs">
                                        <IconClock size={16} color="var(--mantine-color-blue-6)" />
                                        <Text size="sm">
                                            {appointment.hours}h × {appointment.sessions} sessions
                                        </Text>
                                    </Group>

                                    <Group gap="xs">
                                        <IconTimeline size={16} color="var(--mantine-color-yellow-6)" />
                                        <Text size="sm">
                                            {getTimeSlotLabel(appointment.selectedTimeSlot)}
                                        </Text>
                                    </Group>

                                    <Group gap="xs">
                                        <IconUser size={16} color="var(--mantine-color-orange-6)" />
                                        <Text size="sm" fw={600}>
                                            Total: {appointment.totalHours} hours
                                        </Text>
                                    </Group>
                                </Stack>

                                {/* Appointment Date */}
                                <Text size="xs" c="dimmed">
                                    Booked: {formatDate(appointment.appointmentDate)}
                                </Text>
                            </Stack>
                        </Card>
                    ))}
                </Group>
            ) : (
                <div className="noAppointment">
                    <Text c="dimmed">No appointments found for this technician</Text>
                </div>
            )}
        </div>
    );
}

export default AppointmentCard;