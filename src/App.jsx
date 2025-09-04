import React, { useState } from 'react'
import AppShell from './components/AppShell'
import Dashboard from './components/Dashboard'
import CommunityView from './components/CommunityView'
import UserProfile from './components/UserProfile'
import { AppProvider } from './context/AppContext'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedCommunity, setSelectedCommunity] = useState(null)

  const handleNavigate = (view, community = null) => {
    setCurrentView(view)
    setSelectedCommunity(community)
  }

  return (
    <AppProvider>
      <AppShell onNavigate={handleNavigate} currentView={currentView}>
        {currentView === 'dashboard' && (
          <Dashboard onNavigate={handleNavigate} />
        )}
        {currentView === 'community' && selectedCommunity && (
          <CommunityView 
            community={selectedCommunity} 
            onNavigate={handleNavigate} 
          />
        )}
        {currentView === 'profile' && (
          <UserProfile 
            onNavigate={handleNavigate} 
          />
        )}
      </AppShell>
    </AppProvider>
  )
}

export default App
