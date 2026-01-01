import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';

function App() {
    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#fff',
                        color: '#1f2937',
                        boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.15)',
                        borderRadius: '0.75rem',
                        padding: '1.25rem',
                        fontSize: '1.1rem',
                        maxWidth: '500px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#4f46e5',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
