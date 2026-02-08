import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'

  // Update view when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else if (currentView === 'dashboard') {
      setCurrentView('landing');
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleSignupClick = () => {
    setCurrentView('signup');
  };

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleSignupSuccess = () => {
    setCurrentView('dashboard');
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header 
        isLoggedIn={isAuthenticated} 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      
      {currentView === 'landing' && (
        <Landing onLoginClick={handleLoginClick} />
      )}
      
      {currentView === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onSignupClick={handleSignupClick}
        />
      )}
      
      {currentView === 'signup' && (
        <Signup 
          onSignupSuccess={handleSignupSuccess}
          onLoginClick={handleLoginClick}
        />
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
