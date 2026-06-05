import { Typography } from '@mui/material'
import React from 'react'
import Input from '../../atoms/Input'

const InputLabel = ({
    label,
     
}) => {
  return (
    <div>
     {label && <Typography sx={}/>}
     <Input/>
      
    </div>
  )
}

export default InputLabel
