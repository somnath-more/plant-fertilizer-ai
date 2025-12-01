// src/hooks/useAlert.js
import Swal from "sweetalert2";

const useAlert = () => {
  const success = (title = "Success", message = "") => {
    Swal.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const error = (title = "Error", message = "") => {
    Swal.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const warning = (title = "Warning", message = "") => {
    Swal.fire({
      title,
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  return { success, error, warning };
};

export default useAlert;
