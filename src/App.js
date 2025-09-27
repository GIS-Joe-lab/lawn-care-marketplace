import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {MantineProvider, Stack} from '@mantine/core';
import {Notifications} from '@mantine/notifications';
import './App.css';

// Import pages
import HomePage from "./pages/HomePage";
import TechniciansPage from "./pages/TechniciansPage";

// Import Mantine styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
    return (
        <MantineProvider>
            <Notifications/>
            <Router>
                <Stack gap={0}>
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/technicians"} element={<TechniciansPage/>}/>
                    </Routes>
                </Stack>
            </Router>
        </MantineProvider>
    );
}

export default App;
