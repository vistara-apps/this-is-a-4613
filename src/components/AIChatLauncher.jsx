import React, { useState } from 'react'
import { Brain, Sparkles, X, Send, Lightbulb, Wifi, WifiOff } from 'lucide-react'
import AIIdeaValidator from './AIIdeaValidator'
import { isOpenAIConfigured } from '../services/openai'

const AIChatLauncher = ({ variant = 'primary' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const isPrimary = variant === 'primary'

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
          ${isPrimary
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
            : 'bg-dark-surface border border-dark-border text-dark-text hover:bg-dark-border'
          }
        `}
      >
        <Brain size={16} />
        <span>{isPrimary ? 'AI Idea Validator' : 'Get AI Help'}</span>
        <Sparkles size={14} />
      </button>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-dark-surface border border-dark-border rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                  <Brain className="text-white" size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold text-dark-text">AI Idea Validator</h2>
                    <div className="flex items-center space-x-1">
                      {isOpenAIConfigured() ? (
                        <Wifi size={14} className="text-green-400" />
                      ) : (
                        <WifiOff size={14} className="text-yellow-400" />
                      )}
                      <span className="text-xs text-gray-400">
                        {isOpenAIConfigured() ? 'Live AI' : 'Demo Mode'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-dark-muted">Get instant feedback on your AI business ideas</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-dark-muted hover:text-dark-text"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <AIIdeaValidator onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatLauncher
