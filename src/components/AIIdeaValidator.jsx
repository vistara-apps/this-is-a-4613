import React, { useState } from 'react'
import { Send, Lightbulb, TrendingUp, Target, DollarSign, Users, AlertCircle } from 'lucide-react'

const AIIdeaValidator = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI idea validator. Describe your AI business idea and I'll help you refine it with structured feedback on market potential, technical feasibility, and business model. What's your idea?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Predefined idea prompts for quick start
  const ideaPrompts = [
    "AI-powered financial advisor for college students",
    "Personalized workout generator using computer vision",
    "AI writing assistant for academic research",
    "Smart meal planning app with nutrition optimization"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response (in real app, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (idea) => {
    // Mock AI validation response
    return `Great idea! Here's my analysis of "${idea}":

**Market Potential** 🎯
• Target market size appears promising
• Growing demand for AI-powered solutions in this space
• Consider researching specific pain points of your target users

**Technical Feasibility** ⚙️
• Technology stack is achievable with current AI capabilities
• Consider starting with an MVP to validate core assumptions
• May require partnerships with domain experts

**Business Model** 💰
• Multiple monetization paths available (subscription, freemium, B2B)
• Low initial costs if leveraging existing AI APIs
• Focus on user acquisition and retention metrics

**Next Steps** 🚀
• Validate demand through user interviews
• Build a simple prototype or landing page
• Join relevant communities to connect with potential users

Would you like me to dive deeper into any of these areas?`
  }

  const handlePromptClick = (prompt) => {
    setInputValue(prompt)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] p-4 rounded-lg
                ${message.type === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-dark-border text-dark-text'
                }
              `}
            >
              {message.type === 'ai' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb size={16} className="text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">AI Validator</span>
                </div>
              )}
              <p className="whitespace-pre-line">{message.content}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-dark-border text-dark-text p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className="text-sm text-dark-muted ml-2">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Idea Prompts */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-dark-muted mb-3">Quick start with these ideas:</p>
          <div className="grid grid-cols-1 gap-2">
            {ideaPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-left p-3 bg-dark-border hover:bg-purple-600/20 rounded-lg text-sm text-dark-text hover:text-purple-400 transition-colors"
              >
                💡 {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-dark-border p-6">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your AI business idea..."
            className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default AIIdeaValidator