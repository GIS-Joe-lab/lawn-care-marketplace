import React from 'react';
import {Card, Group, Stack, Text} from "@mantine/core";
import {IconClock, IconUser, IconCalendar} from '@tabler/icons-react'
import { TIME_SLOTS } from '../constants/timeSlots';
import {useBooking} from "../hooks/useBooking";
import { useNavigate } from 'react-router-dom';

function AppointmentCard ({appointments}) {

    const navigate = useNavigate();
    const { setSelectedTechnician } = useBooking();

    const handleEditAppointment = (appointment) => {

        setSelectedTechnician(appointment.technician, appointment.isTopRated);

        // Navigate to booking page with existing data
        navigate('/technician/booking', {
            state: {
                editingAppointment: appointment,
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
                    style={{
                        maxWidth: '100%'
                    }}
                >
                    {appointments.map((appointment) => (
                        <Card
                            key={appointment.id}
                            shadow="sm"
                            padding="md"
                            radius="md"
                            withBorder
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                minWidth: '200px',
                                maxWidth: '300px',
                                flex: '1 1 200px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
                            }}
                            onClick={() => handleEditAppointment(appointment)}
                        >
                            <Stack gap="sm">
                                {/* Appointment ID */}
                                <Text size="xs" c="dimmed">
                                    Appointment #{appointment.id}
                                </Text>

                                {/* Appointment Details */}
                                <Stack gap="xs">
                                    <Group gap="xs">
                                        <IconClock size={16} color="var(--mantine-color-blue-6)" />
                                        <Text size="sm">
                                            {appointment.hours}h × {appointment.sessions} sessions
                                        </Text>
                                    </Group>

                                    <Group gap="xs">
                                        <IconCalendar size={16} color="var(--mantine-color-green-6)" />
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

                                {/* Booking Date */}
                                <Text size="xs" c="dimmed">
                                    Booked: {formatDate(appointment.bookingDate)}
                                </Text>
                            </Stack>
                        </Card>
                    ))}
                </Group>
            ) : (
                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    <Text c="dimmed">No appointments found for this technician</Text>
                </div>
            )}
        </div>
    );
}

export default AppointmentCard;