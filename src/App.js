import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {MantineProvider, Stack} from '@mantine/core';
import {Notifications} from '@mantine/notifications';
import './App.css';

// Import pages
import HomePage from "./pages/HomePage";
import TechniciansPage from "./pages/TechniciansPage";
import AppointmentPage from "./pages/AppointmentPage";

// Import Mantine styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import {AppProvider} from "./context/AppContext";


function App() {
    return (
        <MantineProvider>
            <Notifications/>
            <AppProvider>
                <Router>
                    <Stack gap={0}>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={"/technicians"} element={<TechniciansPage/>}/>
                            <Route path={"/technician/appointment"} element={<AppointmentPage/>}/>
                        </Routes>
                    </Stack>
                </Router>
            </AppProvider>
        </MantineProvider>
    );
}

export default App;
