export const validateProfile = ({ name, address, phone }) => {
  if (!name?.trim()) return "Name is required.";
  if (name.trim().length > 100) return "Name must be 100 characters or fewer.";
  if ((address || "").trim().length > 255) return "Address must be 255 characters or fewer.";

  const contact = (phone || "").trim();
  const digitCount = contact.replace(/\D/g, "").length;
  if (contact && (!/^\+?[0-9][0-9 ()-]{6,29}$/.test(contact) || digitCount < 7 || digitCount > 15)) {
    return "Enter a valid phone number.";
  }

  return "";
};
