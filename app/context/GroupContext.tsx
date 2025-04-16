"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { getGroups, Group, Image } from "../../lib/api";

type GroupContextType = {
  groups: Group[];
  getGroupById: (id: string) => Group | null;
  addImageToGroup: (groupId: string, image: Image) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>(getGroups());
  const getGroupById = (id: string) => groups.find((g) => g.id === id) || null;
  const addImageToGroup = (groupId: string, image: Image) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? { ...group, images: [...group.images, image] }
          : group
      )
    );
  };
  return (
    <GroupContext.Provider value={{ groups, getGroupById, addImageToGroup }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroupContext() {
  const ctx = useContext(GroupContext);
  if (!ctx) throw new Error("useGroupContext must be used within GroupProvider");
  return ctx;
}
