import React, { useState } from 'react'
import { User, Edit3, MapPin, Calendar, Mail, Globe, Github, Linkedin, BookOpen, Users, MessageSquare, Award } from 'lucide-react'
import { useApp } from '../context/AppContext'
import UserProfileEdit from './UserProfileEdit'

const UserProfile = ({ userId, onNavigate }) => {
  const { user, communities } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  
  // For now, we'll show the current user's profile
  // In a real app, this would fetch user data by userId
  const profileUser = user
  
  const joinedCommunities = communities.filter(c => 
    profileUser.joinedCommunities.includes(c.id)
  )
  
  const totalPosts = joinedCommunities.reduce((sum, c) => 
    sum + c.posts.filter(p => p.authorId === profileUser.id).length, 0
  )
  
  const totalComments = joinedCommunities.reduce((sum, c) => 
    sum + c.posts.reduce((postSum, p) => 
      postSum + p.comments.filter(comment => comment.authorId === profileUser.id).length, 0
    ), 0
  )

  const stats = [
    {
      label: 'Communities',
      value: joinedCommunities.length,
      icon: Users,
      color: 'text-blue-500'
    },
    {
      label: 'Posts',
      value: totalPosts,
      icon: MessageSquare,
      color: 'text-green-500'
    },
    {
      label: 'Comments',
      value: totalComments,
      icon: MessageSquare,
      color: 'text-purple-500'
    },
    {
      label: 'Ideas Validated',
      value: profileUser.ideasValidated || 7,
      icon: Award,
      color: 'text-orange-500'
    }
  ]

  if (isEditing) {
    return (
      <UserProfileEdit 
        user={profileUser}
        onSave={() => setIsEditing(false)}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-start justify-between -mt-16">
            <div className="flex items-end space-x-4">
              {/* Profile Picture */}
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                {profileUser.avatar ? (
                  <img 
                    src={profileUser.avatar} 
                    alt={profileUser.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>
              
              {/* Basic Info */}
              <div className="pt-16">
                <h1 className="text-2xl font-bold text-gray-900">{profileUser.displayName || profileUser.username}</h1>
                <p className="text-gray-600">@{profileUser.username}</p>
                {profileUser.location && (
                  <div className="flex items-center space-x-1 text-gray-500 mt-1">
                    <MapPin size={14} />
                    <span className="text-sm">{profileUser.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
          
          {/* Bio */}
          {profileUser.bio && (
            <div className="mt-4">
              <p className="text-gray-700">{profileUser.bio}</p>
            </div>
          )}
          
          {/* Additional Info */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            {profileUser.email && (
              <div className="flex items-center space-x-1">
                <Mail size={14} />
                <span>{profileUser.email}</span>
              </div>
            )}
            {profileUser.website && (
              <div className="flex items-center space-x-1">
                <Globe size={14} />
                <a href={profileUser.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {profileUser.website}
                </a>
              </div>
            )}
            {profileUser.github && (
              <div className="flex items-center space-x-1">
                <Github size={14} />
                <a href={`https://github.com/${profileUser.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {profileUser.github}
                </a>
              </div>
            )}
            {profileUser.linkedin && (
              <div className="flex items-center space-x-1">
                <Linkedin size={14} />
                <a href={`https://linkedin.com/in/${profileUser.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {profileUser.linkedin}
                </a>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>Joined {new Date(profileUser.joinedAt || '2024-01-15').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interests & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profileUser.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {(profileUser.skills || ['React', 'Python', 'Machine Learning', 'Business Strategy']).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Communities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communities ({joinedCommunities.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {joinedCommunities.map((community) => (
            <div
              key={community.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate('community', community)}
            >
              <h4 className="font-medium text-gray-900 mb-1">{community.name}</h4>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{community.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{community.memberCount} members</span>
                <span>{community.postsCount} posts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* This would show recent posts, comments, etc. */}
          <div className="text-center py-8 text-gray-500">
            <BookOpen size={48} className="mx-auto mb-2 opacity-50" />
            <p>Recent activity will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
