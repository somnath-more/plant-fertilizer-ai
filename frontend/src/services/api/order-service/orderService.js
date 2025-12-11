export const placeOrder = async (order)=>{
  try {
    const response = await fetch("http://localhost:8080/api/v1/orders", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const err = await response.json();
      return { data: null, status: false, message: err.message || "Something went wrong" };
    }

    const apiResponse = await response.json();
    return { apiResponse, status: true, message: apiResponse.message };

  } catch (err) {
    return { apiResponse: null, status: false, message: err.message || "Something went wrong" };
  }
};
