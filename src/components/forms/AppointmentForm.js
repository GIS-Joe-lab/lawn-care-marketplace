import React from 'react';
import {Alert, Button, Card, Divider, Stack} from "@mantine/core";
import {IconCalendar, IconCancel} from "@tabler/icons-react";
import AppointmentSummary from "../layouts/AppointmentSummary";
import AppointmentControlPanel from "./AppointmentControlPanel";
import {useAppointment} from "../../hooks/useAppointment";

function AppointmentForm({onSubmit, onCancel, isEditing = false}) {

    const {appointmentData} = useAppointment();

    const canBook = appointmentData.hours && appointmentData.sessions && appointmentData.selectedTimeSlot;

    const handleSubmit = () => onSubmit()
    const handleCancelAppointment = () => onCancel();

    return (
        <Card shadow="sm" padding="lg" radius={"md"} withBorder>
            <Stack gap={"xl"}>
                {/* Show editing indicator */}
                {isEditing && (
                    <Alert color="blue" title="Editing Existing Appointment">
                        You are editing an existing appointment. Changes will update the current appointment.
                    </Alert>
                )}

                {/* Appointment Control Panel*/}
                <AppointmentControlPanel/>
                <Divider/>

                {/* Appointment Summary */}
                {canBook && <AppointmentSummary/>}

                {/* Appointment Page Footer*/}
                <Button
                    fullWidth
                    disabled={!canBook}
                    onClick={handleSubmit}
                    leftSection={<IconCalendar size={16}/>}
                >
                    {isEditing ? "Update Appointment" : "Confirm Booking"}
                </Button>
                {isEditing && (
                    <Button
                        fullWidth
                        onClick={handleCancelAppointment}
                        c={"red"}
                        variant={"outline"}
                        leftSection={<IconCancel size={16}/>}
                    >Cancel Appointment</Button>
                )}
            </Stack>
        </Card>
    );
}

export default AppointmentForm;