// REGISTER USER

// services/auth.service.js

export const registerUser = async (user) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    

    if (!response.ok) {
      const err = await response.json();
      return { data: null, status:false,message:err.message || 'Something went wrong' };
    }

    const apiResponse = await response.json();
    
    return { apiResponse, status:true,message: apiResponse.message };

  } catch (err) {
    return { apiResponse: null, status:false, message: err.message || "Something went wrong" };
  }
};
export const loginUser = async (user) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    

    if (!response.ok) {
      const err = await response.json();
      return { data: null, status:false,message:err.message || 'Something went wrong' };
    }

    const apiResponse = await response.json();
    return { apiResponse, status:true,message: apiResponse.message };

  } catch (err) {
    return { apiResponse: null, status:false, message: err.message || "Something went wrong" };
  }
};
