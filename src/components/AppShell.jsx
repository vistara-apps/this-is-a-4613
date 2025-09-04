import React, { useState } from 'react'
import { 
  Home, 
  Search, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Settings,
  Menu,
  X,
  User,
  Bell
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const AppShell = ({ children, onNavigate, currentView }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useApp()

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, active: currentView === 'dashboard' },
    { id: 'discover', label: 'Discover', icon: Search, active: currentView === 'discover' },
    { id: 'communities', label: 'My Communities', icon: Users, active: currentView === 'communities' },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare, active: currentView === 'discussions' },
    { id: 'learning', label: 'Learning Paths', icon: BookOpen, active: currentView === 'learning' },
  ]

  return (
    <div className="flex h-screen bg-dark-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-dark-surface border-r border-dark-border
        transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NF</span>
              </div>
              <h1 className="text-xl font-bold text-dark-text">NicheFoundry</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-dark-muted hover:text-dark-text"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setSidebarOpen(false)
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${item.active 
                    ? 'bg-purple-600 text-white' 
                    : 'text-dark-muted hover:text-dark-text hover:bg-dark-border'
                  }
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-dark-border">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-dark-border transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-text truncate">{user.username}</p>
                <p className="text-xs text-dark-muted truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-dark-surface border-b border-dark-border px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-dark-muted hover:text-dark-text"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-lg font-semibold text-dark-text capitalize">
                {currentView === 'dashboard' ? 'Welcome back!' : currentView}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-dark-muted hover:text-dark-text">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
              </button>
              <button className="text-dark-muted hover:text-dark-text">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell