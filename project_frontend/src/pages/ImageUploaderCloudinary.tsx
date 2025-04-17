import React, { useState } from "react";
import axios from "axios";

export default function ImageUploaderCloudinary() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post<{ secure_url: string }>(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      setImageURL(response.data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Image to Cloudinary</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploading && <p className="mt-2 text-gray-600">Uploading...</p>}
      {imageURL && (
        <div className="mt-4 text-center">
          <a
            href={imageURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Uploaded Image
          </a>
          <div className="mt-2">
            <img src={imageURL} alt="Uploaded" className="max-w-xs rounded shadow" />
          </div>
        </div>
      )}
    </div>
  );
}
