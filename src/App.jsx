import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';

function App() {
  return (
    <ErrorBoundary>
        <Router>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
        </Router>
    </ErrorBoundary>
  );
}

export default App;
