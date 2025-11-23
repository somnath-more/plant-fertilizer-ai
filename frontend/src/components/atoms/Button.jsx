import { Button as MuiButton } from "@mui/material";

// can i create object of the props ans pass to the component

export const Button = ({
  color = "primary",
  type,
  loading,
  children,
  onClick,
  variant = "text",
  size = "medium",
  disabled,
  className = "",
  startIcon,
  style,
}) => {
  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant={
        ["text", "outlined", "contained"].includes(variant) ? variant : "text"
      } // fallback
      startIcon={startIcon}
      color={color}
      loading={loading}
      className={`${className} normal-case`}
      sx={{
        ...(variant === "glass" && {
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }),
        ...style,
      }}
    >
      {children}
    </MuiButton>
  );
};
