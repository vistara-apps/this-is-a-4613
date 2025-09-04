import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Mock data for development
const mockCommunities = [
  {
    id: 1,
    name: 'AI for Finance',
    description: 'Building intelligent financial solutions and trading algorithms',
    topic: 'Finance',
    memberCount: 1247,
    postsCount: 89,
    trending: true,
    tags: ['AI', 'Finance', 'Trading', 'FinTech'],
    createdAt: '2024-01-15',
    posts: [
      {
        id: 1,
        title: 'Building a Credit Risk AI Model - Need Feedback',
        content: 'I\'ve been working on an AI model to assess credit risk for small businesses. Looking for feedback on my approach and validation methodology.',
        author: 'Sarah Chen',
        authorId: 'user1',
        createdAt: '2024-01-20',
        likes: 24,
        comments: [
          {
            id: 1,
            content: 'This sounds promising! Have you considered incorporating alternative data sources?',
            author: 'Alex Rodriguez',
            authorId: 'user2',
            createdAt: '2024-01-20'
          }
        ]
      }
    ],
    resources: [
      {
        id: 1,
        title: 'FinTech AI Startup Guide',
        url: 'https://example.com/fintech-guide',
        description: 'Comprehensive guide for building AI-powered financial products',
        addedBy: 'user1'
      }
    ]
  },
  {
    id: 2,
    name: 'Healthcare AI Innovations',
    description: 'Revolutionizing healthcare through AI-powered solutions',
    topic: 'Healthcare',
    memberCount: 892,
    postsCount: 156,
    trending: false,
    tags: ['AI', 'Healthcare', 'Medical', 'Diagnosis'],
    createdAt: '2024-01-10',
    posts: [],
    resources: []
  },
  {
    id: 3,
    name: 'Generative Art Startups',
    description: 'Creating and monetizing AI-generated art and creative content',
    topic: 'Art',
    memberCount: 634,
    postsCount: 78,
    trending: true,
    tags: ['AI', 'Art', 'Creative', 'NFT'],
    createdAt: '2024-01-12',
    posts: [],
    resources: []
  },
  {
    id: 4,
    name: 'Python ML for Retail',
    description: 'Machine learning applications for e-commerce and retail businesses',
    topic: 'Retail',
    memberCount: 445,
    postsCount: 34,
    trending: false,
    tags: ['Python', 'ML', 'Retail', 'E-commerce'],
    createdAt: '2024-01-18',
    posts: [],
    resources: []
  }
]

const mockUser = {
  id: 'user1',
  username: 'StudentFounder',
  email: 'student@example.com',
  bio: 'CS student passionate about AI entrepreneurship',
  interests: ['AI', 'Finance', 'Startups'],
  joinedCommunities: [1, 2]
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser)
  const [communities, setCommunities] = useState(mockCommunities)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  // Filter communities based on search and tags
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = !searchQuery || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => community.tags.includes(tag))
    
    return matchesSearch && matchesTags
  })

  const joinCommunity = (communityId) => {
    if (!user.joinedCommunities.includes(communityId)) {
      setUser(prev => ({
        ...prev,
        joinedCommunities: [...prev.joinedCommunities, communityId]
      }))
      
      setCommunities(prev => prev.map(community => 
        community.id === communityId 
          ? { ...community, memberCount: community.memberCount + 1 }
          : community
      ))
    }
  }

  const leaveCommunity = (communityId) => {
    setUser(prev => ({
      ...prev,
      joinedCommunities: prev.joinedCommunities.filter(id => id !== communityId)
    }))
    
    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { ...community, memberCount: Math.max(0, community.memberCount - 1) }
        : community
    ))
  }

  const addPost = (communityId, post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      authorId: user.id,
      author: user.username,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    }

    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { 
            ...community, 
            posts: [newPost, ...community.posts],
            postsCount: community.postsCount + 1
          }
        : community
    ))
  }

  const addComment = (communityId, postId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      author: user.username,
      authorId: user.id,
      createdAt: new Date().toISOString()
    }

    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? {
            ...community,
            posts: community.posts.map(post =>
              post.id === postId
                ? { ...post, comments: [...post.comments, newComment] }
                : post
            )
          }
        : community
    ))
  }

  const value = {
    user,
    communities,
    filteredCommunities,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    joinCommunity,
    leaveCommunity,
    addPost,
    addComment,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}