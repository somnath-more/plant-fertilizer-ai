import React, { useEffect } from 'react'
import { useState } from 'react'

/**
 * Custom hook to fetch data using standardized API response format
 * @param {Function} APIFn - Async function that returns {status, message, data}
 * @param {Array} deps - Dependency array for useEffect
 * @returns {Object} {data, error, loading, refetch}
 */
const useFetch = (APIFn, deps = []) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)    
            setError(null)
            
            const response = await APIFn()
            console.log("Fetch response:", response)
            
            // Check status flag from standardized response
            if (!response?.status) {
                setError({
                    message: response?.message || 'Failed to fetch data',
                    statusCode: response?.statusCode,
                })
                setData(null)
                return
            }

            // Extract data from standardized response
            setData(response.data)
            setError(null)
        } catch (err) {
            console.error("Fetch error:", err)
            setError({
                message: err.message || 'An error occurred while fetching data',
            })
            setData(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, deps)

    return {
        data,
        error,
        loading,
        refetch: fetchData
    }
}

export default useFetch

