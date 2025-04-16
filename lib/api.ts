// Simple in-memory mock data and API functions for groups, albums, images, and users
export type User = { id: string; name: string };
export type Image = { id: string; url: string; uploader: User; albumId?: string };
export type Album = { id: string; name: string; groupId: string };
export type Group = { id: string; name: string; users: User[]; albums: Album[]; images: Image[] };

// Initial mock data
type Data = { groups: Group[] };

let data: Data = {
  groups: [
    {
      id: '1',
      name: 'Friends',
      users: [
        { id: 'u1', name: 'Alice' },
        { id: 'u2', name: 'Bob' },
      ],
      albums: [
        { id: 'a1', name: 'Ski Trip', groupId: '1' },
      ],
      images: [
        { id: 'img1', url: 'https://picsum.photos/300?random=1', uploader: { id: 'u1', name: 'Alice' }, albumId: 'a1' },
        { id: 'img3', url: 'https://picsum.photos/300?random=3', uploader: { id: 'u3', name: 'Alice' }, albumId: 'a1' },
        { id: 'img4', url: 'https://picsum.photos/300?random=4', uploader: { id: 'u4', name: 'Alice' }, albumId: 'a1' },
        { id: 'img5', url: 'https://picsum.photos/300?random=5', uploader: { id: 'u5', name: 'Alice' }, albumId: 'a1' },
        { id: 'img6', url: 'https://picsum.photos/300?random=6', uploader: { id: 'u6', name: 'Alice' }, albumId: 'a1' },
        { id: 'img7', url: 'https://picsum.photos/300?random=7', uploader: { id: 'u7', name: 'Alice' }, albumId: 'a1' },

        { id: 'img2', url: 'https://picsum.photos/300?random=2', uploader: { id: 'u2', name: 'Bob' } },
      ],
    },
  ],
};

export function getGroups() {
  return data.groups;
}

export function getGroup(id: string) {
  return data.groups.find((g) => g.id === id) || null;
}

// Add more functions as needed for future backend integration
