import {Card, Stack} from "@mantine/core";
import AppointmentCard from "./AppointmentCard";
import TechnicianCard from "./TechnicianCard";

function TechnicianAppointmentCard ({technician, isTopRated, appointments}) {

    return (
        <Card 
            key={technician.id} 
            shadow="sm" 
            padding="md" 
            radius="md" 
            withBorder
            className="technician-card"
        >
            <Stack gap="md">
                <TechnicianCard
                    technician={technician}
                    showBookBtn={false}
                    isTopRated={isTopRated}
                    appointments={appointments}
                />

                {/* Appointment Cards */}
                <AppointmentCard appointments={appointments}/>
            </Stack>
        </Card>
    );
}

export default TechnicianAppointmentCard