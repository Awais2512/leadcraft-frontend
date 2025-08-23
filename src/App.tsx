import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './components/UserProfile';
import { JobsList } from './components/JobsList';
import { ThemeToggle } from './components/ThemeToggle';

type View = 'landing' | 'signin' | 'signup' | 'forgot-password' | 'dashboard' | 'profile' | 'jobs';

interface User {
  name: string;
  email: string;
  initials: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [user, setUser] = useState<User | undefined>(undefined);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('leadcraft_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleSignUp = (userData: { fullName: string; email: string }) => {
    const newUser: User = {
      name: userData.fullName,
      email: userData.email,
      initials: userData.fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    };
    
    setUser(newUser);
    localStorage.setItem('leadcraft_user', JSON.stringify(newUser));
    setCurrentView('dashboard');
  };

  const handleSignIn = (email: string, password: string) => {
    // In a real app, you would validate credentials here
    const mockUser: User = {
      name: 'John Doe',
      email: email,
      initials: 'JD'
    };
    
    setUser(mockUser);
    localStorage.setItem('leadcraft_user', JSON.stringify(mockUser));
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setUser(undefined);
    localStorage.removeItem('leadcraft_user');
    setCurrentView('landing');
  };

  const handleCreateProposal = () => {
    // In a real app, this would navigate to proposal creation
    alert('Create Proposal feature coming soon!');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleResetSent = () => {
    // In a real app, you might want to show a success message or redirect
    console.log('Password reset link sent successfully');
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
  };

  const handleViewDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewJobs = () => {
    setCurrentView('jobs');
  };

  const handleSettings = () => {
    // In a real app, this would navigate to settings
    alert('Settings feature coming soon!');
  };

  const handleAddJob = () => {
    // In a real app, this would navigate to job creation form
    alert('Add New Job feature coming soon!');
  };

  const handleViewJob = (jobId: string) => {
    // In a real app, this would navigate to job details
    alert(`View Job ${jobId} feature coming soon!`);
  };

  const handleEditJob = (jobId: string) => {
    // In a real app, this would navigate to job edit form
    alert(`Edit Job ${jobId} feature coming soon!`);
  };

  // Render based on current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <div>
            <Header
              isAuthenticated={!!user}
              user={user}
              onSignIn={() => setCurrentView('signin')}
              onSignUp={() => setCurrentView('signup')}
              onSignOut={handleSignOut}
            />
            <LandingPage
              onGetStarted={() => setCurrentView('signup')}
              onSignIn={() => setCurrentView('signin')}
            />
          </div>
        );
      
      case 'signin':
        return (
          <div className="relative">
            <div className="absolute top-6 right-6 z-10">
              <ThemeToggle />
            </div>
            <SignInForm
              onSignUp={() => setCurrentView('signup')}
              onForgotPassword={handleForgotPassword}
              onSignIn={handleSignIn}
            />
          </div>
        );
      
      case 'signup':
        return (
          <div className="relative">
            <div className="absolute top-6 right-6 z-10">
              <ThemeToggle />
            </div>
            <SignUpForm
              onSignIn={() => setCurrentView('signin')}
              onSignUp={handleSignUp}
            />
          </div>
        );
      
      case 'forgot-password':
        return (
          <div className="relative">
            <div className="absolute top-6 right-6 z-10">
              <ThemeToggle />
            </div>
            <ForgotPasswordForm
              onBackToSignIn={() => setCurrentView('signin')}
              onResetSent={handleResetSent}
            />
          </div>
        );
      
      case 'dashboard':
        return (
          <div>
            <Header
              isAuthenticated={true}
              user={user}
              currentPage="dashboard"
              onSignOut={handleSignOut}
              onProfile={handleViewProfile}
              onDashboard={handleViewDashboard}
              onJobs={handleViewJobs}
              onSettings={handleSettings}
            />
            <Dashboard
              user={user!}
              onCreateProposal={handleCreateProposal}
            />
          </div>
        );
      
      case 'profile':
        return (
          <div>
            <Header
              isAuthenticated={true}
              user={user}
              currentPage="profile"
              onSignOut={handleSignOut}
              onProfile={handleViewProfile}
              onDashboard={handleViewDashboard}
              onJobs={handleViewJobs}
              onSettings={handleSettings}
            />
            <UserProfile user={user!} />
          </div>
        );
      
      case 'jobs':
        return (
          <div>
            <Header
              isAuthenticated={true}
              user={user}
              currentPage="jobs"
              onSignOut={handleSignOut}
              onProfile={handleViewProfile}
              onDashboard={handleViewDashboard}
              onJobs={handleViewJobs}
              onSettings={handleSettings}
            />
            <JobsList
              onAddJob={handleAddJob}
              onViewJob={handleViewJob}
              onEditJob={handleEditJob}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {renderCurrentView()}
    </div>
  );
}