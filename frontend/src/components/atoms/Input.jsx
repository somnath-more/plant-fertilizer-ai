import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: LeftIcon,
  fullWidth = true,
  size = "medium",
  helperText,
  error = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size={size}
      helperText={helperText}
      error={error}
      type={isPassword && showPassword ? "text" : type}
      slotProps={{
        input: {
          startAdornment: LeftIcon ? (
            <InputAdornment position="start">
              <LeftIcon style={{ color: "#9ca3af" }} />
            </InputAdornment>
          ) : null,

          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          background: "#fff",
          transition: "0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",

          "&:hover": {
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          },

          "&.Mui-focused": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          },
        },
      }}
    />
  );
};

export default Input;
