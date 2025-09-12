import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./Pages/LoginForm";
// import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Requests from "./Pages/Requests";
import FAQ from "./Pages/FAQ";
import Reports from "./Pages/Reports";

import Sidebar from './Components/Sidebar';
import Wallet from "./Pages/Wallet";
import SecretInfo from "./Pages/SecretInfo";
import Navbar from './Components/Navbar';

import { ErrorProvider, ErrorBoundary } from './contexts/ErrorContext';

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material';



function App() { 
  // 🔹 هنا عرّفنا الـ theme
  const theme = createTheme({
    palette: {
  
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
  });

  // Layout للصفحات التي تحتاج Sidebar + Navbar
  const AdminLayout = ({ children }) => (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <Navbar />
        <Box flex={1} p={3} overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );

  return (
    <ErrorBoundary>
      <ErrorProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box dir="rtl">
            <Router>
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                {/* <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} /> */}
                <Route path="/dashboard" element={<AdminLayout><Reports /></AdminLayout>} />
                <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
                <Route path="/requests" element={<AdminLayout><Requests /></AdminLayout>} />
                <Route path="/faq" element={<AdminLayout><FAQ /></AdminLayout>} />
                
                <Route path="/secret-info" element={<AdminLayout><SecretInfo /></AdminLayout>} />
               
                <Route path="/wallet" element={<AdminLayout><Wallet/></AdminLayout>} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
              
            </Router>
          </Box>
        </ThemeProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
}

export default App; 











