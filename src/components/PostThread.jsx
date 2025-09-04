import React, { useState } from 'react'
import { Heart, MessageSquare, Share, MoreHorizontal, Clock, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

const PostThread = ({ post, communityId, variant = 'default' }) => {
  const [isExpanded, setIsExpanded] = useState(variant !== 'collapsed')
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  
  const { addComment } = useApp()

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    addComment(communityId, post.id, newComment)
    setNewComment('')
  }

  const isCollapsed = variant === 'collapsed'

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden card-hover">
      {/* Post Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-dark-text">{post.author}</p>
              <div className="flex items-center space-x-2 text-sm text-dark-muted">
                <Clock size={14} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button className="text-dark-muted hover:text-dark-text">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-dark-text mb-2">
            {post.title}
          </h3>
          
          <div className={`text-dark-text ${isCollapsed && !isExpanded ? 'line-clamp-3' : ''}`}>
            {post.content}
          </div>
          
          {isCollapsed && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-400 hover:text-purple-300 text-sm mt-2"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-border">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 text-sm transition-colors ${
                liked ? 'text-red-400' : 'text-dark-muted hover:text-red-400'
              }`}
            >
              <Heart size={16} className={liked ? 'fill-current' : ''} />
              <span>{likeCount}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-sm text-dark-muted hover:text-purple-400 transition-colors"
            >
              <MessageSquare size={16} />
              <span>{post.comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-sm text-dark-muted hover:text-blue-400 transition-colors">
              <Share size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-dark-border">
          {/* Existing Comments */}
          {post.comments.length > 0 && (
            <div className="p-6 space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-dark-text text-sm">{comment.author}</span>
                      <span className="text-xs text-dark-muted">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-dark-text text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <div className="p-6 border-t border-dark-border bg-dark-bg">
            <form onSubmit={handleComment} className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostThread