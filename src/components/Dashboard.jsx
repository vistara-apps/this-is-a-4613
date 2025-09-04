import React, { useState } from 'react'
import { TrendingUp, Users, MessageSquare, BookOpen, Plus, Search, Filter } from 'lucide-react'
import CommunityCard from './CommunityCard'
import StatsCard from './StatsCard'
import AIChatLauncher from './AIChatLauncher'
import CreateCommunityModal from './CreateCommunityModal'
import { useApp } from '../context/AppContext'

const Dashboard = ({ onNavigate }) => {
  const { 
    user, 
    filteredCommunities, 
    searchQuery, 
    setSearchQuery, 
    selectedTags,
    setSelectedTags 
  } = useApp()
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const joinedCommunities = filteredCommunities.filter(c => user.joinedCommunities.includes(c.id))
  const trendingCommunities = filteredCommunities.filter(c => c.trending)
  const allTags = [...new Set(filteredCommunities.flatMap(c => c.tags))]

  const stats = [
    {
      title: 'Communities Joined',
      value: joinedCommunities.length,
      icon: Users,
      color: 'purple',
      trend: '+2 this week'
    },
    {
      title: 'Active Discussions',
      value: joinedCommunities.reduce((sum, c) => sum + c.postsCount, 0),
      icon: MessageSquare,
      color: 'blue',
      trend: '+12 new posts'
    },
    {
      title: 'Learning Progress',
      value: '3/5',
      icon: BookOpen,
      color: 'green',
      trend: '2 paths active'
    },
    {
      title: 'Ideas Validated',
      value: '7',
      icon: TrendingUp,
      color: 'orange',
      trend: '+3 this month'
    }
  ]

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-dark-text mb-2">
            Welcome back, {user.username}! 👋
          </h1>
          <p className="text-dark-muted">
            Discover new AI communities and accelerate your startup journey
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <AIChatLauncher variant="primary" />
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            <span>Create Community</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Search and Filters */}
      <div className="glass-effect rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" size={20} />
            <input
              type="text"
              placeholder="Search communities, topics, or interests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-dark-muted hover:text-dark-text transition-colors">
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Tag Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {allTags.slice(0, 8).map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-purple-600 text-white'
                  : 'bg-dark-border text-dark-muted hover:bg-purple-600 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* My Communities */}
      {joinedCommunities.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-dark-text mb-4">My Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {joinedCommunities.map(community => (
              <CommunityCard
                key={community.id}
                community={community}
                variant="featured"
                isJoined={true}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      )}

      {/* Trending Communities */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="text-purple-500" size={24} />
          <h2 className="text-2xl font-semibold text-dark-text">Trending Communities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {trendingCommunities.map(community => (
            <CommunityCard
              key={community.id}
              community={community}
              variant="minimal"
              isJoined={user.joinedCommunities.includes(community.id)}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* All Communities */}
      <section>
        <h2 className="text-2xl font-semibold text-dark-text mb-4">
          Discover Communities
          {searchQuery && (
            <span className="text-sm font-normal text-dark-muted ml-2">
              ({filteredCommunities.length} results)
            </span>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCommunities
            .filter(c => !joinedCommunities.includes(c))
            .map(community => (
              <CommunityCard
                key={community.id}
                community={community}
                variant="minimal"
                isJoined={user.joinedCommunities.includes(community.id)}
                onNavigate={onNavigate}
              />
            ))}
        </div>
      </section>

      {/* Create Community Modal */}
      <CreateCommunityModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

export default Dashboard
