import React, { useState } from "react";
import { Image, User } from "../../lib/api";

interface GalleryProps {
  images: Image[];
  onAddImages?: (files: FileList) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onAddImages }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = () => {
    // Optionally, call a prop or handle deletion here
    alert(`Delete images: ${Array.from(selected).join(", ")}`);
    setSelected(new Set());
  };

  const handleDownload = async () => {
    const selectedImages = images.filter(img => selected.has(img.id));
    
    try {
      // Check if Web Share API is available
      if (!navigator.share) {
        console.log("Web Share API not available");
        alert("Sharing not supported on this browser");
        return;
      }
      
      // Fetch all selected images as files
      const imageFiles = await Promise.all(
        selectedImages.map(async (img) => {
          const response = await fetch(img.url);
          const blob = await response.blob();
          return new File([blob], `image-${img.id}.jpg`, { type: blob.type });
        })
      );
      
      // Prepare share data with all files
      const shareData = {
        title: 'Share Images',
        files: imageFiles
      };
      
      // Check if sharing files is supported and share them
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
      
      // Fallback to URL sharing if file sharing isn't supported
      await navigator.share({
        title: 'Share Images',
        text: `Check out ${selectedImages.length} image(s)`,
        url: window.location.href
      });
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share content");
    }
  };

  return (
    <div>
      {selected.size > 0 && (
        <div className="mb-2 flex gap-2">
          <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          <button onClick={handleDownload} className="px-3 py-1 bg-blue-500 text-white rounded">Download</button>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className={`border rounded overflow-hidden relative cursor-pointer ${selected.has(img.id) ? 'ring-4 ring-blue-400' : ''}`}
            onClick={() => toggleSelect(img.id)}
          >
            <img src={img.url} alt="Gallery" className="w-full h-40 object-cover" />
            {selected.has(img.id) && (
              <div className="absolute inset-0 bg-blue-400 bg-opacity-30 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
