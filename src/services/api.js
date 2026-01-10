const API_URL = 'http://localhost:3000'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Server error. Please make sure the server is running (npm run server)')
  }
}

// Authentication APIs
export const registerUser = async (userData) => {
  return apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export const loginUser = async (username, password) => {
  return apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export const logoutUser = async (sessionToken) => {
  return apiCall('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ sessionToken }),
  })
}

// Feedback APIs
export const submitFeedback = async (feedbackData) => {
  return apiCall('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(feedbackData),
  })
}

export const getAllFeedback = async () => {
  return apiCall('/api/feedback', {
    method: 'GET',
  })
}

// Contact API (if you want to add it to backend)
export const submitContact = async (contactData) => {
  return apiCall('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  })
}

