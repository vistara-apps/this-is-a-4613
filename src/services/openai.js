import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
})

// System prompt for AI business idea validation
const IDEA_VALIDATOR_SYSTEM_PROMPT = `You are an expert AI business advisor specializing in helping students validate and refine their AI startup ideas. Your role is to provide structured, actionable feedback on business ideas with a focus on:

1. Market Potential & Opportunity
2. Technical Feasibility 
3. Business Model Viability
4. Competitive Landscape
5. Implementation Roadmap

Provide responses that are:
- Constructive and encouraging
- Specific and actionable
- Educational and insightful
- Realistic about challenges
- Focused on next steps

Format your responses with clear sections and bullet points for easy reading. Keep responses concise but comprehensive (300-500 words).`

// AI Idea Validation Service
export const validateBusinessIdea = async (ideaDescription) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: IDEA_VALIDATOR_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Please analyze this AI business idea and provide structured feedback: "${ideaDescription}"`
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    return {
      success: true,
      response: response.choices[0].message.content,
      usage: response.usage
    }
  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // Return fallback response for development/demo
    if (error.code === 'invalid_api_key' || !import.meta.env.VITE_OPENAI_API_KEY) {
      return {
        success: false,
        error: 'API key not configured',
        fallbackResponse: generateFallbackResponse(ideaDescription)
      }
    }
    
    return {
      success: false,
      error: error.message || 'Failed to validate idea',
      fallbackResponse: generateFallbackResponse(ideaDescription)
    }
  }
}

// AI Chat Service for general conversations
export const sendChatMessage = async (messages, context = 'general') => {
  try {
    const systemPrompts = {
      general: "You are a helpful AI assistant focused on AI entrepreneurship and startup development. Provide practical, actionable advice to students building AI businesses.",
      community: "You are an AI assistant helping with community discussions about AI business development. Be encouraging and provide valuable insights.",
      mentorship: "You are an AI mentor helping students with AI startup questions. Focus on practical guidance and learning opportunities."
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompts[context] || systemPrompts.general
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.8,
    })

    return {
      success: true,
      response: response.choices[0].message.content,
      usage: response.usage
    }
  } catch (error) {
    console.error('OpenAI Chat Error:', error)
    return {
      success: false,
      error: error.message || 'Failed to send message',
      fallbackResponse: "I'm having trouble connecting right now. Please try again later, or feel free to ask the community for help!"
    }
  }
}

// Generate AI-powered community suggestions
export const generateCommunitySuggestions = async (userInterests, existingCommunities) => {
  try {
    const prompt = `Based on these user interests: ${userInterests.join(', ')}, and existing communities: ${existingCommunities.map(c => c.name).join(', ')}, suggest 3 new AI business community ideas that would be valuable but don't overlap with existing ones. Format as JSON array with name, description, and tags for each.`

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert at identifying gaps in AI business communities and suggesting valuable new community ideas."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 400,
      temperature: 0.9,
    })

    return {
      success: true,
      suggestions: JSON.parse(response.choices[0].message.content)
    }
  } catch (error) {
    console.error('Community Suggestions Error:', error)
    return {
      success: false,
      error: error.message,
      fallbackSuggestions: [
        {
          name: "AI Ethics & Responsible Development",
          description: "Discussing ethical considerations and responsible practices in AI development",
          tags: ["Ethics", "AI", "Responsibility", "Governance"]
        }
      ]
    }
  }
}

// Fallback response generator for when API is unavailable
const generateFallbackResponse = (ideaDescription) => {
  const responses = [
    `Great idea! "${ideaDescription}" shows promise in the AI space. Here's some structured feedback:

**Market Potential**: This type of AI solution addresses a real need in the market. Consider researching your target audience size and willingness to pay.

**Technical Feasibility**: The core AI components seem achievable with current technology. Focus on starting with an MVP to validate core assumptions.

**Business Model**: Consider subscription, freemium, or usage-based pricing models. Research what similar solutions charge.

**Next Steps**:
• Validate the problem with potential users
• Build a simple prototype or mockup
• Research competitors and differentiation
• Consider technical requirements and costs

**Challenges to Consider**:
• Data acquisition and quality
• User acquisition and retention
• Technical complexity and scaling

Keep refining your idea and don't hesitate to test it with real users early!`,

    `Interesting concept! "${ideaDescription}" has potential in the AI market. Here's my analysis:

**Strengths**:
• Addresses a clear market need
• Leverages AI effectively
• Scalable solution approach

**Areas to Explore**:
• Target market size and segments
• Revenue model and pricing strategy
• Technical implementation roadmap
• Competitive differentiation

**Recommended Actions**:
1. Conduct user interviews to validate the problem
2. Research existing solutions and gaps
3. Create a technical feasibility study
4. Develop a basic prototype or wireframes
5. Test core assumptions with potential users

**Key Questions**:
• Who is your ideal customer?
• What's your unique value proposition?
• How will you acquire users?
• What are the main technical challenges?

This is a solid starting point - keep iterating and validating!`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

// Check if OpenAI API is configured
export const isOpenAIConfigured = () => {
  return !!import.meta.env.VITE_OPENAI_API_KEY
}

export default {
  validateBusinessIdea,
  sendChatMessage,
  generateCommunitySuggestions,
  isOpenAIConfigured
}
