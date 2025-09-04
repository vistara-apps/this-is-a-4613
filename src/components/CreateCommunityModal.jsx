import React, { useState } from 'react'
import { X, Users, Tag, FileText, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const CreateCommunityModal = ({ isOpen, onClose }) => {
  const { createCommunity } = useApp()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    topic: '',
    tags: '',
    rules: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const topics = [
    'Finance', 'Healthcare', 'Art', 'Retail', 'Education', 'Technology', 
    'Marketing', 'Gaming', 'Environment', 'Social Impact', 'Other'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Community name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Community name must be at least 3 characters'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    }
    
    if (!formData.topic) {
      newErrors.topic = 'Please select a topic'
    }
    
    if (!formData.tags.trim()) {
      newErrors.tags = 'At least one tag is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      
      const communityData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        topic: formData.topic,
        tags: tagsArray,
        rules: formData.rules.trim() || 'Be respectful and constructive in all interactions.'
      }
      
      await createCommunity(communityData)
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        topic: '',
        tags: '',
        rules: ''
      })
      setErrors({})
      onClose()
    } catch (error) {
      setErrors({ submit: 'Failed to create community. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Create New Community</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* Community Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Name *
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., AI for Sustainable Energy"
                maxLength={50}
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe what your community is about and what members can expect..."
                rows={4}
                maxLength={500}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
              <p className="text-sm text-gray-500 ml-auto">{formData.description.length}/500</p>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Topic *
            </label>
            <select
              value={formData.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.topic ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a topic</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
            {errors.topic && <p className="mt-1 text-sm text-red-600">{errors.topic}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags * <span className="text-gray-500 text-xs">(comma-separated)</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.tags ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., AI, Sustainability, Clean Energy, Startups"
              />
            </div>
            {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
            <p className="mt-1 text-sm text-gray-500">
              Add relevant tags to help others discover your community
            </p>
          </div>

          {/* Community Rules */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Guidelines <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              value={formData.rules}
              onChange={(e) => handleInputChange('rules', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Set guidelines for your community members..."
              rows={3}
              maxLength={300}
            />
            <p className="mt-1 text-sm text-gray-500">{formData.rules.length}/300</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Community'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCommunityModal
