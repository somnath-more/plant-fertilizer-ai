import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import { Alert, TextField } from "@mui/material";
import { ArrowLeft, Globe2, Send } from "lucide-react";
import { Button } from "../../atoms/Button";
import useAlert from "../../../hooks/useAlert";
import { ADD_BLOG } from "../../../services/api/blogService";
import { baseStyles, sizes, variants } from "../../../theme/themeStyles";
import "./index.css";

export default function CreateBlog({ onCancel, onPublished }) {
  const notify = useAlert();
  const ejInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === "function") {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "create-blog-editor",
      minHeight: 360,
      placeholder: "Tell growers what they should know next...",
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
          config: {
            placeholder: "Section heading",
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          config: { services: { youtube: true } },
        },


      },
    });

    ejInstance.current = editor;
  };

  const handleSaveBlog = async () => {
    if (!ejInstance.current || submitting) return;

    if (!title.trim()) {
      setFormError("Blog title is required.");
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");

      const savedBlocksData = await ejInstance.current.save();
      const blogPayload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        coverImage: coverImage.trim(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        content: JSON.stringify(savedBlocksData),
      };

      const response = await ADD_BLOG(blogPayload);

      if (!response.status) {
        setFormError(response.message);
        notify.error("Blog not published", response.message);
        return;
      }

      notify.success("Blog published", response.message);
      onPublished?.(response.data);
    } catch (error) {
      const message = error.message || "Editor saving failed.";
      setFormError(message);
      notify.error("Blog not published", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="create-blog-page">
      <div className="create-blog-shell">
        <div className="create-blog-toolbar">
          <Button
            variant="text"
            onClick={onCancel}
            disabled={submitting}
            startIcon={<ArrowLeft size={18} />}
            className="!text-gray-700 !font-semibold"
          >
            Blog
          </Button>

   

          <Button
            variant="contained"
            onClick={handleSaveBlog}
            loading={submitting}
            disabled={submitting}
            startIcon={<Send size={17} />}
            className={`${baseStyles} ${variants.primary} ${sizes.sm}`}
          >
            Publish
          </Button>
        </div>

        <div className="create-blog-editor-layout">
          <aside className="create-blog-meta">
            <p className="create-blog-kicker">Story settings</p>
            <TextField
              label="Tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              fullWidth
              placeholder="Organic, Fertilizer, AI"
              helperText="Separate tags with commas."
            />
            <TextField
              label="Cover Image URL"
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              fullWidth
              placeholder="https://..."
            />
          </aside>

          <article className="create-blog-canvas">
            {formError && <Alert severity="error">{formError}</Alert>}

            <textarea
              className="create-blog-title"
              placeholder="Add a compelling title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              rows={1}
            />

            <textarea
              className="create-blog-subtitle"
              placeholder="Add a short subtitle"
              value={subtitle}
              onChange={(event) => setSubtitle(event.target.value)}
              rows={2}
            />

            {coverImage && (
              <img className="create-blog-cover" src={coverImage} alt="" />
            )}

            <div id="create-blog-editor" className="create-blog-editor" />
          </article>
        </div>
      </div>
    </section>
  );
}
