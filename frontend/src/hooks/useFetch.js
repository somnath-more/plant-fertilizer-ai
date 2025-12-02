import React, { useEffect } from 'react'
import { useState } from 'react'

const useFetch = (APIFn,deps=[]) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const fetchData=async () => {
        try {
            setLoading(true);
            const response = await APIFn();
            console.log(response,"date");
            
            setData(response);
            setError(null)
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{ 
       fetchData();
    },deps)

  return {
    data,
    error,
    loading,
    refetch: fetchData
  }
}

export default useFetch
