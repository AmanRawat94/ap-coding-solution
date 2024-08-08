import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-markup"; // HTML
import "prismjs/components/prism-css"; // CSS
import "prismjs/components/prism-javascript"; // JavaScript
import "prismjs/components/prism-jsx"; // React (JSX)
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../syntax-highlighting.css";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/post/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        toast.error("Error creating post");
        return;
      }

      if (res.ok) {
        setPublishError(null);
        toast.success("Post created successfully");
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ "code-block": "code-block" }],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
        const regex = /```(\w+)?\n([\s\S]*?)```/g;
        const ops = delta.ops.map((op) => {
          if (typeof op.insert === "string") {
            const matches = [...op.insert.matchAll(regex)];
            if (matches.length > 0) {
              const newOps = [];
              let str = op.insert;
              matches.forEach((match) => {
                const [code, lang, content] = match.slice(1);
                const index = str.indexOf(code);
                if (index > 0) {
                  newOps.push({ insert: str.slice(0, index) });
                }
                newOps.push({
                  insert: content.trim(),
                  attributes: {
                    "code-block": true,
                    class: `language-${lang || "jsx"}`,
                  },
                });
                str = str.slice(index + code.length);
              });
              if (str.length > 0) {
                newOps.push({ insert: str });
              }
              return newOps;
            }
          }
          return op;
        });
        delta.ops = ops.flat();
        return delta;
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const container = editor.container;
      container.querySelectorAll(`pre.ql-syntax`).forEach((block) => {
        Prism.highlightElement(block);
      });
    }
  }, [formData.content]);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
          <Select
            onChange={(e) =>
              setFormData({ ...formData, languageType: e.target.value })
            }
          >
            <option value="uncategorized">Language Type</option>
            <option value="language-html">html</option>
            <option value="language-css">css</option>
            <option value="language-javascript">javascript</option>
            <option value="language-jsx">jsx</option>
            <option value="language-typescript">typescript</option>
            <option value="language-tsx">tsx</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12 "
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          modules={modules}
          formats={formats}
          ref={quillRef}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
