       

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginForm from "./Pages/LoginForm"; 
import Dashboard from "./Pages/Dashboard"; 
import Users from "./Components/Users";
import Requests from "./Components/Requests";
import FAQ from "./Components/FAQ"; 
import Reports from "./Components/Reports";
import Notifications from "./Components/Notifications"; 
import Settings from "./Components/Settings";
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material';
import Ranks from "./Components/Ranks";

function App() { 
  // 🔹 هنا عرّفنا الـ theme
  const theme = createTheme({
    palette: {
      mode: "light", // جرّب تغيّرها ل "dark" إذا بدك
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
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Box dir="rtl"> 
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
            <Route path="/requests" element={<AdminLayout><Requests /></AdminLayout>} />
            <Route path="/faq" element={<AdminLayout><FAQ /></AdminLayout>} />
            <Route path="/reports" element={<AdminLayout><Reports /></AdminLayout>} />
            <Route path="/notifications" element={<AdminLayout><Notifications /></AdminLayout>} />
            <Route path="/settings" element={<AdminLayout><Settings /></AdminLayout>} />
            <Route path="/ranks" element={<AdminLayout><Ranks /></AdminLayout>} />
            <Route path="*" element={<Navigate to="/login" replace />} />   
          </Routes>
        </Router> 
      </Box>
    </ThemeProvider> 
  ); 
}

export default App;










