import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './AppProviders';

const App = ({ children }) => {
    return (
        <BrowserRouter>
            <AppProviders>
                {children}
            </AppProviders>
        </BrowserRouter>
    )
}

export default App
