import React from 'react'

const Icon = ({
  src,
  alt,
  style = {},        // default empty object
  className = "",    // default empty string
  onIconClick = () => {}, // default no-op function
}) => {
  return (
      <img src={src} alt={alt} style={style} className={className} onClick={onIconClick} />
      
   
  )
}

export default Icon
