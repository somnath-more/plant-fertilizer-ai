import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/products", {
     headers: {
       "Content-Type": "application/json",
     }
    });
    
     if (!response.status==200) {
      const err = await response.data;
      return { data: null, status:false,message:err.message || 'Something went wrong' };
    }

    const apiResponse = await response.data;
    console.log("apiResponse", apiResponse);
    
    return { data: apiResponse, status:true,message: apiResponse.message || "Products fetched successfully" };

  } catch (err) {
    return { data: null, status:false, message: err.message || "Something went wrong" };
  }
};