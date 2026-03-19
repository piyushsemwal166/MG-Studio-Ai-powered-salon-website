"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  onUpload?: (file: File | null) => void;
  isLoading?: boolean;
};

export default function ImageUpload({ onUpload, isLoading }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // 📷 Start Camera
  const startCamera = async () => {
    setIsCameraOpen(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // 📸 Capture Image
  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "camera.jpg", {
        type: "image/jpeg",
      });

      setFile(file);
      onUpload?.(file);
    });

    // stop camera
    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());

    setIsCameraOpen(false);
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold text-foreground mb-3">
        Upload Your Photo
      </h2>

      {/* Camera Mode */}
      {isCameraOpen ? (
        <div className="flex flex-col items-center gap-3">
          <video
            ref={videoRef}
            autoPlay
            className="rounded-lg w-full max-w-sm"
          />

          <button
            onClick={capturePhoto}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Capture
          </button>
        </div>
      ) : (
        <>
          {/* Upload Area */}
          <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/40 p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (!selected) return;

                setFile(selected);
                onUpload?.(selected);
              }}
              className="hidden"
            />

            {preview ? (
              <div className="h-64 max-w-[300px] mx-auto flex items-center justify-center bg-black rounded-md border border-primary/30 shadow-md overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="h-full object-contain"
                />
              </div>
            ) : (
              <>
                <p className="text-sm font-medium">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WEBP
                </p>
              </>
            )}
          </label>

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Use Camera
            </button>

            {preview && (
              <button
                onClick={() => {
                  setFile(null);
                  setPreview("");
                  onUpload?.(null);
                }}
                className="text-xs text-primary underline"
              >
                Remove
              </button>
            )}
          </div>
        </>
      )}

      {isLoading && (
        <p className="mt-3 text-sm text-primary">
          Analyzing your hairstyle... ✨
        </p>
      )}
    </div>
  );
}