import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Stack, TextField } from "@mui/material";
import { Save } from "lucide-react";
import { Button } from "../../atoms/Button";
import GenericModal from "../../molecules/GenericModal";
import { getProfile, updateProfile } from "../../../services/api/authService";
import { validateProfile } from "./profileValidation";

const Profile = ({ onClose, onSaved }) => {
  const [profile, setProfile] = useState({ name: "", address: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;
    getProfile()
      .then((response) => {
        if (active) setProfile({
          name: response.data.name || "",
          address: response.data.address || "",
          phone: response.data.phone || "",
        });
      })
      .catch((error) => {
        if (active) setLoadError(error.message || "Could not load your profile.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateProfile(profile);
    if (error) {
      setFormError(error);
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      const response = await updateProfile({
        name: profile.name.trim(),
        address: profile.address.trim(),
        phone: profile.phone.trim(),
      });
      onSaved(response.data);
      onClose();
    } catch (saveError) {
      setFormError(saveError.message || "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <GenericModal
      open
      onClose={saving ? undefined : onClose}
      title="Your profile"
      subtitle="Edit the details shown on your account."
      maxWidth="sm"
      disableBackdropClose={saving}
      actions={
        <>
          <Button variant="outlined" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button type="submit" form="profile-form" variant="contained" disabled={loading || Boolean(loadError) || saving} loading={saving} startIcon={<Save size={18} />}>
            Save changes
          </Button>
        </>
      }
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress aria-label="Loading profile" />
        </Box>
      ) : loadError ? (
        <Alert severity="error">{loadError}</Alert>
      ) : (
        <Box component="form" id="profile-form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField label="Name" name="name" value={profile.name} onChange={handleChange} autoComplete="name" required fullWidth />
            <TextField label="Address" name="address" value={profile.address} onChange={handleChange} autoComplete="street-address" multiline minRows={2} fullWidth />
            <TextField label="Phone" name="phone" type="tel" value={profile.phone} onChange={handleChange} autoComplete="tel" fullWidth />
          </Stack>
        </Box>
      )}
    </GenericModal>
  );
};

export default Profile;
