import { useState } from "react";
import {
  Alert,
  Box,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { PackagePlus, Save, UploadCloud, X } from "lucide-react";
import { Button } from "../../atoms/Button";
import GenericModal from "../../molecules/GenericModal";
import useAlert from "../../../hooks/useAlert";
import { ADD_PRODUCT } from "../../../services/api/productService";
import { baseStyles, sizes, variants } from "../../../theme/themeStyles";
import "./index.css";

const initialProduct = {
  name: "Seeding Cover",
  description: "Seed cover from insectisde.",
  price: 249.99,
  stock: 120,
  category: "Organic Material",
  npkRatio: "5-3-3",
  weight: "1kg",
  organic: true,
  featured: true,
  imageMeta: null,
};

const categories = [
  "Organic Material",
  "Fertilizer",
  "Pesticide",
  "Soil Care",
  "Plant Food",
];

const AddProduct = ({ open, onClose, onProductAdded, modalSx }) => {
  const notify = useAlert();
  const [product, setProduct] = useState(initialProduct);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files && Array.from(event.target.files);
    if (!files || files.length === 0) return;
    console.log("Selected files length:", files?.length);

    if (previewUrls.length) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    const imageMeta = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setImageFiles(files);
    setPreviewUrls(filePreviews);
    setProduct((prev) => ({
      ...prev,
      imageMeta,
    }));
  };

  const handleClose = () => {
    if (submitting) return;
    setFormError("");
    onClose?.();
  };

  const handleSubmit = async (event) => {
    console.log("Submitting product:", product);
    event.preventDefault();
    notify.warning("Adding product", "Please wait while we add your product...");

    if (!product.name.trim() || !product.description.trim()) {
      setFormError("Product name and description are required.");
      return;
    }

    if (Number(product.price) <= 0 || Number(product.stock) < 0) {
      setFormError("Price must be greater than 0 and stock cannot be negative.");
      return;
    }

    const payload = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
        imageMeta: product.imageMeta || [],
      };

      try {
        setSubmitting(true);
        setFormError("");

        // Build FormData to send one JSON object plus files
        const formData = new FormData();
        formData.append('productRequest', JSON.stringify(payload));

        imageFiles.forEach((file) => {
          formData.append('file', file);
        });
      

      const response = await ADD_PRODUCT(formData);

      if (!response.status) {
        setFormError(response.message);
        notify.error("Product not added", response.message);
        return;
      }

      notify.success("Product added", response.message);
      setProduct(initialProduct);
      setImageFiles([]);
      setPreviewUrls([]);
      onProductAdded?.(response.data);
      onClose?.();
    } catch (error) {
      const message = error.message || "Something went wrong";
      setFormError(message);
      notify.error("Product not added", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <GenericModal
      open={open}
      onClose={handleClose}
      title="Add Product"
      subtitle="Create a new fertilizer or gardening product for the store."
      maxWidth="md"
      disableBackdropClose={submitting}
      paperSx={modalSx}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={submitting}
            startIcon={<X size={18} />}
            className={`${baseStyles} ${variants.outline} ${sizes.sm}`}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-product-form"
            variant="contained"
            loading={submitting}
            disabled={submitting}
            startIcon={<Save size={18} />}
            className={`${baseStyles} ${variants.primary} ${sizes.sm}`}
          >
            Save Product
          </Button>
        </>
      }
    >
      <Box component="form" id="add-product-form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2.5}>
          {formError && <Alert severity="error">{formError}</Alert>}

          <Box className="add-product-grid">
            <TextField
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              select
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
              fullWidth
              slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              required
              fullWidth
              slotProps={{ htmlInput: { min: 0, step: "1" } }}
            />
            <TextField
              label="NPK Ratio"
              name="npkRatio"
              value={product.npkRatio}
              onChange={handleChange}
              fullWidth
              placeholder="5-3-3"
            />
            <TextField
              label="Weight"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              fullWidth
              placeholder="1kg"
            />
          </Box>

          <div className="upload-box">
            <input
              id="product-image"
              name="imageFiles"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="product-image" className="upload-label">
              <div className="upload-button">
                <UploadCloud size={18} />
                Upload images
              </div>
              <div className="upload-caption">JPEG, PNG, or GIF · max 5MB each</div>
            </label>
            {previewUrls.length > 0 && (
              <div className="preview-grid">
                {previewUrls.map((url, index) => (
                  <img
                    key={`${url}-${index}`}
                    src={url}
                    alt={`${product.name}-${index + 1}`}
                    className="image-preview"
                  />
                ))}
              </div>
            )}
          </div>

          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            minRows={3}
          />

          <Box className="add-product-switches">
            <FormControlLabel
              control={
                <Switch
                  name="organic"
                  checked={product.organic}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Organic"
            />
            <FormControlLabel
              control={
                <Switch
                  name="featured"
                  checked={product.featured}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Featured"
            />
            <Box className="add-product-badge">
              <PackagePlus size={18} />
              Ready to publish
            </Box>
          </Box>
        </Stack>
      </Box>
    </GenericModal>
  );
};

export default AddProduct;
