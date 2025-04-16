"use client";
import { notFound } from "next/navigation";
import { useGroupContext } from "../../../../context/GroupContext";
import React from "react";
import Gallery from "../../../../components/Gallery";

export default function AlbumPage({ params }: { params: Promise<{ id: string; albumId: string }> }) {
  const unwrappedParams = React.use(params);
  const { getGroupById, addImageToGroup } = useGroupContext();
  const group = getGroupById(unwrappedParams.id);
  if (!group) return notFound();
  const album = group.albums.find((a) => a.id === unwrappedParams.albumId);
  if (!album) return notFound();
  const images = group.images.filter((img) => img.albumId === album.id);

  // Handler to add images to this album
  const handleAddImages = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      addImageToGroup(group.id, {
        id: Math.random().toString(36).slice(2),
        url,
        uploader: group.users[0], // Demo: first user
        albumId: album.id,
      });
    });
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4 bg-[#F2EFE7] min-h-screen">
      <h1 className="text-2xl font-bold mb-2 text-[#006A71]">{album.name}</h1>
      <div className="mb-6 text-[#48A6A7]">In group: {group.name}</div>
      <div className="flex gap-4 mb-8">
        <button className="bg-[#48A6A7] hover:bg-[#006A71] text-white px-4 py-2 rounded shadow disabled:opacity-50 transition-colors duration-200" disabled>+ Upload Image</button>
      </div>
      <section>
        <h2 className="font-semibold mb-2 text-[#006A71]">Images</h2>
        <Gallery images={images} />
      </section>
    </main>
  );
}
