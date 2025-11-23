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
      variant={variant}
      startIcon={startIcon}
      color={color}
      loading={loading}
      className={`${className} normal-case`}
      sx={{
        ...style,
      }}
    >
      {children}
    </MuiButton>
  );
};
