import React, { useState } from 'react'
import { ArrowLeft, Users, MessageSquare, Plus, Search, BookOpen, Share, MoreVertical } from 'lucide-react'
import PostThread from './PostThread'
import CreatePostModal from './CreatePostModal'
import ResourceLink from './ResourceLink'
import { useApp } from '../context/AppContext'

const CommunityView = ({ community, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('posts')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, joinCommunity, leaveCommunity } = useApp()

  const isJoined = user.joinedCommunities.includes(community.id)
  const filteredPosts = community.posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleJoinToggle = () => {
    if (isJoined) {
      leaveCommunity(community.id)
    } else {
      joinCommunity(community.id)
    }
  }

  const tabs = [
    { id: 'posts', label: 'Posts', icon: MessageSquare, count: community.postsCount },
    { id: 'resources', label: 'Resources', icon: BookOpen, count: community.resources.length },
    { id: 'members', label: 'Members', icon: Users, count: community.memberCount },
  ]

  return (
    <div className="min-h-full bg-dark-bg">
      {/* Header */}
      <div className="bg-dark-surface border-b border-dark-border">
        <div className="max-w-6xl mx-auto px-4 py-6 lg:px-6">
          {/* Back button and actions */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2 text-dark-muted hover:text-dark-text transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-dark-muted hover:text-dark-text">
                <Share size={20} />
              </button>
              <button className="p-2 text-dark-muted hover:text-dark-text">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Community Info */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {community.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-dark-text">{community.name}</h1>
                  <p className="text-dark-muted">{community.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {community.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-dark-muted">
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span>{community.memberCount} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare size={16} />
                  <span>{community.postsCount} posts</span>
                </div>
                <div>
                  Created {new Date(community.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleJoinToggle}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-colors
                  ${isJoined
                    ? 'bg-dark-border text-dark-text hover:bg-red-600 hover:text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                  }
                `}
              >
                {isJoined ? 'Leave Community' : 'Join Community'}
              </button>
              
              {isJoined && (
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>New Post</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 lg:px-6">
        {/* Tabs */}
        <div className="flex items-center space-x-1 mb-6 bg-dark-surface rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-dark-muted hover:text-dark-text'
                }
              `}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${activeTab === tab.id ? 'bg-white/20' : 'bg-dark-border'}
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostThread key={post.id} post={post} communityId={community.id} />
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto text-dark-muted mb-4" size={48} />
                  <h3 className="text-lg font-medium text-dark-text mb-2">
                    {searchQuery ? 'No posts found' : 'No posts yet'}
                  </h3>
                  <p className="text-dark-muted mb-4">
                    {searchQuery 
                      ? 'Try adjusting your search terms'
                      : 'Be the first to start a discussion in this community!'
                    }
                  </p>
                  {isJoined && !searchQuery && (
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Create First Post
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            {community.resources.length > 0 ? (
              community.resources.map(resource => (
                <ResourceLink key={resource.id} resource={resource} />
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto text-dark-muted mb-4" size={48} />
                <h3 className="text-lg font-medium text-dark-text mb-2">No resources yet</h3>
                <p className="text-dark-muted">Community resources will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="text-center py-12">
            <Users className="mx-auto text-dark-muted mb-4" size={48} />
            <h3 className="text-lg font-medium text-dark-text mb-2">
              {community.memberCount} Members
            </h3>
            <p className="text-dark-muted">Member directory coming soon</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          communityId={community.id}
          onClose={() => setShowCreatePost(false)}
        />
      )}
    </div>
  )
}

export default CommunityView