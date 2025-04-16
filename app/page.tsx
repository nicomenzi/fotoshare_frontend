"use client";
import Link from "next/link";
import { useGroupContext } from "./context/GroupContext";

export default function Home() {
  const { groups } = useGroupContext();
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">FotoShare Groups</h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow disabled:opacity-50"
          disabled
        >
          + Create Group
        </button>
      </div>
      <ul className="space-y-4">
        {groups.map((group) => (
          <li key={group.id}>
            <Link href={`/groups/${group.id}`} className="block p-4 rounded border hover:bg-gray-50 transition">
              <div className="font-semibold text-lg">{group.name}</div>
              <div className="text-sm text-gray-500">{group.users.length} members · {group.albums.length} albums · {group.images.length} images</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
