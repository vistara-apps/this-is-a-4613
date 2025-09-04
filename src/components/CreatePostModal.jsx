import React, { useState } from 'react'
import { X, Type, FileText, Send } from 'lucide-react'
import { useApp } from '../context/AppContext'

const CreatePostModal = ({ communityId, onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addPost } = useApp()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || isSubmitting) return

    setIsSubmitting(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addPost(communityId, { title: title.trim(), content: content.trim() })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-dark-surface border border-dark-border rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <h2 className="text-lg font-semibold text-dark-text">Create New Post</h2>
          <button
            onClick={onClose}
            className="text-dark-muted hover:text-dark-text"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-dark-text mb-2">
                <Type size={16} />
                <span>Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your post about?"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={200}
              />
              <p className="text-xs text-dark-muted mt-1">
                {title.length}/200 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-dark-text mb-2">
                <FileText size={16} />
                <span>Content</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, ask questions, or start a discussion..."
                rows={8}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                maxLength={2000}
              />
              <p className="text-xs text-dark-muted mt-1">
                {content.length}/2000 characters
              </p>
            </div>

            {/* Post Guidelines */}
            <div className="bg-dark-border/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-dark-text mb-2">Community Guidelines</h4>
              <ul className="text-xs text-dark-muted space-y-1">
                <li>• Be respectful and constructive</li>
                <li>• Stay on topic and relevant to the community</li>
                <li>• Provide context and details when asking questions</li>
                <li>• Search existing posts before posting</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-dark-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-dark-muted hover:text-dark-text transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!title.trim() || !content.trim() || isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostModal