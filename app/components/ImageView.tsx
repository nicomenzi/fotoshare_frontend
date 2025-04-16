// ImageView.tsx
import React from "react";
import Image from 'next/image';

interface ImageViewProps {
  url: string;
  alt?: string;
  uploader?: string;
  onEdit?: () => void;
  editable?: boolean;
}

const ImageView: React.FC<ImageViewProps> = ({ url, alt = "Image", uploader, onEdit, editable }) => (
  <div className="rounded overflow-hidden shadow bg-[#F2EFE7] border border-[#9ACBD0]">
    <Image src={url} alt={alt} className="w-full h-48 object-cover bg-[#9ACBD0]" />
    <div className="px-3 py-2 text-sm text-[#006A71]">Uploaded by: <span className="font-semibold">{uploader}</span></div>
    {editable && (
      <button
        className="absolute top-2 right-2 bg-white border px-2 py-1 text-xs rounded shadow hover:bg-gray-50"
        onClick={onEdit}
      >
        Edit
      </button>
    )}
  </div>
);

export default ImageView;
