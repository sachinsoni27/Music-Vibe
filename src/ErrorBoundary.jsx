import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // You can log the error to an external service here
    // console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      const err = this.state.error
      return (
        <div style={{ padding: 24, color: '#fff', background: '#8b0000', minHeight: '100vh' }}>
          <h1 style={{ marginTop: 0 }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{err && err.toString()}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
