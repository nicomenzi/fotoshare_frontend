"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useGroupContext } from "../../context/GroupContext";
import React from "react";
import Gallery from "../../components/Gallery";

export default function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const { getGroupById } = useGroupContext();
  const group = getGroupById(unwrappedParams.id);
  if (!group) return notFound();

  // Handler to add images (demo: just adds local URLs)
  // const handleAddImages = (files: FileList) => {
  //   Array.from(files).forEach((file) => {
  //     const url = URL.createObjectURL(file);
  //     addImageToGroup(group.id, {
  //       id: Math.random().toString(36).slice(2),
  //       url,
  //       uploader: group.users[0], // Demo: first user
  //     });
  //   });
  // };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
      <div className="text-gray-500 mb-6">{group.users.length} members</div>
      <div className="flex gap-4 mb-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow disabled:opacity-50" disabled>+ Upload Image</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow disabled:opacity-50" disabled>+ Create Album</button>
      </div>
      <section className="mb-10">
        <h2 className="font-semibold mb-2">Albums</h2>
        <ul className="flex gap-4 flex-wrap">
          {group.albums.map((album) => (
            <li key={album.id}>
              <Link href={`/groups/${group.id}/albums/${album.id}`} className="block border rounded p-3 hover:bg-gray-50">
                {album.name}
              </Link>
            </li>
          ))}
          {group.albums.length === 0 && <li className="text-gray-400">No albums yet</li>}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="font-semibold mb-2">All Images</h2>
        <Gallery images={group.images} />
      </section>
      <section>
        <h2 className="font-semibold mb-2">Members</h2>
        <ul className="flex gap-3 flex-wrap">
          {group.users.map((user) => (
            <li key={user.id} className="bg-gray-200 rounded px-3 py-1 text-sm">{user.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
