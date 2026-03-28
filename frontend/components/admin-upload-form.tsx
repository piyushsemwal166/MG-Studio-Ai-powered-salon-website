'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';
import { barbers } from '@/lib/data';

interface UploadFormProps {
  onSuccess: () => void;
}

interface SignatureResponse {
  success: boolean;
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  resourceType: 'image' | 'video';
  signature: string;
}

export function UploadForm({ onSuccess }: UploadFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    barberId: '',
    barberName: '',
    type: 'image',
    title: '',
    caption: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBarberSelect = (barberId: string) => {
    const barber = barbers.find((b) => b.id === parseInt(barberId));
    if (barber) {
      setFormData((prev) => ({
        ...prev,
        barberId,
        barberName: barber.name,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !formData.barberId || !formData.title) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const signatureResponse = await fetch('/api/admin/cloudinary-signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barberId: formData.barberId,
          type: formData.type,
        }),
      });

      if (!signatureResponse.ok) {
        const signatureError = await signatureResponse.json();
        throw new Error(signatureError.error || 'Failed to prepare upload');
      }

      const signatureData = (await signatureResponse.json()) as SignatureResponse;

      const cloudinaryData = new FormData();
      cloudinaryData.append('file', selectedFile);
      cloudinaryData.append('api_key', signatureData.apiKey);
      cloudinaryData.append('timestamp', String(signatureData.timestamp));
      cloudinaryData.append('signature', signatureData.signature);
      cloudinaryData.append('folder', signatureData.folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/${signatureData.resourceType}/upload`,
        {
          method: 'POST',
          body: cloudinaryData,
        }
      );

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json();
        throw new Error(uploadError.error?.message || 'Cloudinary upload failed');
      }

      const uploadResult = await uploadResponse.json();

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barberId: formData.barberId,
          barberName: formData.barberName,
          type: formData.type,
          title: formData.title,
          caption: formData.caption,
          url: uploadResult.secure_url,
          cloudinaryId: uploadResult.public_id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload post');
      }

      toast.success('Post uploaded successfully!');
      setSelectedFile(null);
      setPreview('');
      setFormData({
        barberId: '',
        barberName: '',
        type: 'image',
        title: '',
        caption: '',
      });
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Upload New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Barber */}
        <div>
          <label className="block text-sm font-medium mb-2">Barber *</label>
          <Select
            value={formData.barberId}
            onValueChange={handleBarberSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a barber" />
            </SelectTrigger>
            <SelectContent>
              {barbers.map((barber) => (
                <SelectItem key={barber.id} value={barber.id.toString()}>
                  {barber.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Type *</label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            File Upload *
          </label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              accept={
                formData.type === 'video'
                  ? 'video/*'
                  : 'image/*'
              }
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.type === 'video'
                  ? 'MP4, WebM (max 100MB)'
                  : 'JPG, PNG, GIF (max 10MB)'}
              </p>
            </label>
          </div>
          {selectedFile && (
            <div className="mt-4 flex items-center justify-between bg-muted p-3 rounded">
              <span className="text-sm">{selectedFile.name}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview('');
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Preview:</p>
            {formData.type === 'video' ? (
              <video
                src={preview}
                className="max-w-full h-auto rounded-lg max-h-48"
                controls
                playsInline
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg max-h-48"
              />
            )}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="e.g., Fade Cutting, Hair Styling"
          />
        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium mb-2">Caption</label>
          <Textarea
            value={formData.caption}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, caption: e.target.value }))
            }
            placeholder="Add a caption for this post..."
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Uploading...' : 'Upload Post'}
        </Button>
      </form>
    </Card>
  );
}
