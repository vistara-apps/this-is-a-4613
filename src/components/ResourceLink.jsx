import React from 'react'
import { ExternalLink, BookOpen, Calendar, User } from 'lucide-react'

const ResourceLink = ({ resource, variant = 'default' }) => {
  const handleClick = () => {
    window.open(resource.url, '_blank', 'noopener,noreferrer')
  }

  const isPreview = variant === 'preview'

  return (
    <div
      onClick={handleClick}
      className={`
        group cursor-pointer border border-dark-border rounded-lg overflow-hidden card-hover
        ${isPreview ? 'bg-dark-border/30' : 'bg-dark-surface'}
      `}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-purple-600/20 rounded-lg flex-shrink-0">
              <BookOpen size={20} className="text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-dark-text group-hover:text-purple-400 transition-colors truncate">
                {resource.title}
              </h4>
              <p className="text-sm text-dark-muted line-clamp-2 mt-1">
                {resource.description}
              </p>
            </div>
          </div>
          <ExternalLink 
            size={16} 
            className="text-dark-muted group-hover:text-purple-400 transition-colors flex-shrink-0 ml-2" 
          />
        </div>

        {/* Resource metadata */}
        <div className="flex items-center justify-between text-xs text-dark-muted">
          <div className="flex items-center space-x-4">
            {resource.addedBy && (
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span>Added by {resource.addedBy}</span>
              </div>
            )}
            {resource.addedAt && (
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{new Date(resource.addedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          <div className="px-2 py-1 bg-dark-border rounded text-xs">
            {new URL(resource.url).hostname}
          </div>
        </div>
      </div>

      {/* Preview mode additional info */}
      {isPreview && (
        <div className="px-4 pb-4">
          <div className="text-xs text-dark-muted bg-dark-surface rounded p-2">
            Click to open in new tab
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceLink