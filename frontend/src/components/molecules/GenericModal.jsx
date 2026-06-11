import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

const defaultPaperSx = {
  borderRadius: 3,
  boxShadow: "0 24px 80px rgba(15, 23, 42, 0.24)",
  overflow: "hidden",
};

const GenericModal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  disableBackdropClose = false,
  paperSx,
  titleSx,
  contentSx,
  actionsSx,
}) => {
  const handleClose = (event, reason) => {
    if (disableBackdropClose && reason === "backdropClick") return;
    onClose?.(event, reason);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby={title ? "generic-modal-title" : undefined}
      slotProps={{
        paper: {
          sx: { ...defaultPaperSx, ...paperSx },
        },
      }}
    >
      {(title || subtitle || onClose) && (
        <DialogTitle
          id="generic-modal-title"
          sx={{
            px: { xs: 2.5, sm: 3 },
            py: 2.25,
            borderBottom: "1px solid",
            borderColor: "grey.100",
            ...titleSx,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {title && (
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.25 }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 0.5, lineHeight: 1.6 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {onClose && (
              <IconButton
                aria-label="Close modal"
                onClick={onClose}
                size="small"
                sx={{
                  color: "text.secondary",
                  border: "1px solid",
                  borderColor: "grey.200",
                  "&:hover": { bgcolor: "grey.50" },
                }}
              >
                <X size={18} />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: { xs: 2.5, sm: 3 },
          ...contentSx,
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 3 },
            py: 2.25,
            gap: 1.5,
            borderTop: "1px solid",
            borderColor: "grey.100",
            ...actionsSx,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default GenericModal;
