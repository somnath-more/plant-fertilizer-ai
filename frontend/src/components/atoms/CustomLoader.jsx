import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";

const CustomLoader = (props) => {
  return (
    <div className='d-flex justify-center align-center '>
      <CircularProgress {...props} />
    </div>
  )
}

export default CustomLoader
