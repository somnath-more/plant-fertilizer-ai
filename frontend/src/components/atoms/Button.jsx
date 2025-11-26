import { Button as MuiButton } from "@mui/material";

export const Button = ({
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
  sx,
}) => {
  console.log(className);

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant={
        variant
      }
      loading={loading}
      startIcon={startIcon}
      className={`${className} normal-case`}
      style={style}
      sx={sx}
    >
      {children}
    </MuiButton>
  );
};
