import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/atoms/Button'
import { baseStyles, sizes, variants } from '../../theme/themeStyles'
import './index.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <AlertCircle size={64} />
        </div>
        
        <h1 className="not-found-title">Page Not Found</h1>
        
        <p className="not-found-subtitle">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <p className="not-found-code">Error 404</p>
        
        <Button
          onClick={() => navigate('/')}
          startIcon={<ArrowLeft size={18} />}
          className={`${baseStyles} ${variants.secondary} ${sizes.md}`}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound


