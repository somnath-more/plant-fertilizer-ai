import React from 'react'

const Icon = ({src, alt,style,className,onIconClick}) => {
  return (
      <img src={src} alt={alt} style={style} className={className} onClick={onIconClick} />
      
   
  )
}

export default Icon
