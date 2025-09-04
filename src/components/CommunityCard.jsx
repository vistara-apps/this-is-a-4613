import React from 'react'
import { Users, MessageSquare, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

const CommunityCard = ({ community, variant = 'minimal', isJoined, onNavigate }) => {
  const { joinCommunity, leaveCommunity } = useApp()

  const handleJoinToggle = (e) => {
    e.stopPropagation()
    if (isJoined) {
      leaveCommunity(community.id)
    } else {
      joinCommunity(community.id)
    }
  }

  const handleCardClick = () => {
    onNavigate('community', community)
  }

  const isFeatured = variant === 'featured'

  return (
    <div
      onClick={handleCardClick}
      className={`
        group relative overflow-hidden rounded-lg border border-dark-border cursor-pointer
        card-hover transition-all duration-200
        ${isFeatured 
          ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm' 
          : 'bg-dark-surface hover:bg-dark-border/50'
        }
      `}
    >
      {/* Trending Badge */}
      {community.trending && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center space-x-1 px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
            <TrendingUp size={12} />
            <span>Trending</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-dark-text mb-2 group-hover:text-purple-400 transition-colors">
              {community.name}
            </h3>
            <p className="text-sm text-dark-muted line-clamp-2">
              {community.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {community.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-dark-border text-dark-muted text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {community.tags.length > 3 && (
            <span className="px-2 py-1 bg-dark-border text-dark-muted text-xs rounded-md">
              +{community.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-dark-muted">
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{community.memberCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare size={16} />
            <span>{community.postsCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{new Date(community.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleJoinToggle}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isJoined
                ? 'bg-dark-border text-dark-text hover:bg-red-600 hover:text-white'
                : 'bg-purple-600 text-white hover:bg-purple-700'
              }
            `}
          >
            {isJoined ? 'Leave' : 'Join'}
          </button>

          <div className="flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm mr-1">View</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Featured Community Extra Info */}
        {isFeatured && (
          <div className="mt-4 pt-4 border-t border-dark-border">
            <div className="flex items-center justify-between text-xs text-dark-muted">
              <span>Last activity: 2h ago</span>
              <span>Your posts: {Math.floor(Math.random() * 10)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}

export default CommunityCard