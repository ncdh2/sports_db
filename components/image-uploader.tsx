// "use client";

// import React, { useState } from "react";
// import { useUploadThing } from "@/lib/uploadthing";
// import { Button } from "@/components/ui/button";
// import { Upload, X, Image } from "lucide-react";
// import NextImage from "next/image";
// import { Input } from "./ui/input";

// interface ImageUploaderProps {
//   onImageUpload: (url: string) => void;
//   initialImage?: string;
// }

// export function ImageUploader({
//   onImageUpload,
//   initialImage,
// }: ImageUploaderProps) {
//   const [preview, setPreview] = useState<string | null>(initialImage || null);
//   const [isUploading, setIsUploading] = useState(false);
//   const { startUpload } = useUploadThing("athleteProfileImage");

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const file = files[0];
//     if (!file) return;

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result as string);
//     };
//     reader.readAsDataURL(file);

//     // Upload file
//     setIsUploading(true);
//     try {
//       const uploadedFiles = await startUpload([file]);
//       if (uploadedFiles && uploadedFiles.length > 0) {
//         const uploadedUrl = uploadedFiles[0].url;
//         onImageUpload(uploadedUrl);
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       setPreview(null);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleRemove = () => {
//     setPreview(null);
//     onImageUpload("");
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
//         {preview ? (
//           <div className="relative w-48 h-48">
//             <NextImage
//               src={preview}
//               alt="Profile preview"
//               fill
//               className="object-cover rounded-lg"
//               crossOrigin="anonymous"
//             />
//             <Button
//               onClick={handleRemove}
//               className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full hover:bg-destructive/90"
//               type="button"
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           </div>
//         ) : (
//           <div className="text-center">
//             <Image className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
//             <label htmlFor="image-upload" className="cursor-pointer">
//               <Button
//                 variant="outline"
//                 type="button"
//                 disabled={isUploading}
//                 className="mt-2"
//               >
//                 <Upload className="w-4 h-4 mr-2" />
//                 {isUploading ? "Uploading..." : "Upload Profile Picture"}
//               </Button>
//             </label>
//             <p className="text-sm text-muted-foreground mt-2">
//               JPG, PNG up to 4MB
//             </p>
//           </div>
//         )}
//         <Input
//           id="image-upload"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           disabled={isUploading}
//           className="hidden"
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";
import NextImage from "next/image";
import { Input } from "./ui/input";

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  initialImage?: string;
}

export function ImageUploader({
  onImageUpload,
  initialImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { startUpload } = useUploadThing("athleteProfileImage");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const uploadedFiles = await startUpload([file]);
      if (uploadedFiles && uploadedFiles.length > 0) {
        onImageUpload(uploadedFiles[0].url);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUpload("");
    // Reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
        {preview ? (
          <div className="relative w-48 h-48">
            <NextImage
              src={preview}
              alt="Profile preview"
              fill
              className="object-cover rounded-lg"
              crossOrigin="anonymous"
            />
            <Button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full hover:bg-destructive/90"
              type="button"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Image className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <Button
              variant="outline"
              type="button"
              disabled={isUploading}
              className="mt-2"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Profile Picture"}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              JPG, PNG up to 4MB
            </p>
          </div>
        )}

        {/* Hidden input controlled via ref */}
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </div>
    </div>
  );
}
