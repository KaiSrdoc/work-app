import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SidebarLayoutState {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  drawerContent: 'notifications' | 'settings';
  setDrawerContent: (content: 'notifications' | 'settings') => void;
  resetDrawer: () => void;
}

export const useSidebarLayoutStore = create<SidebarLayoutState>()(
  persist(
    (set) => ({
      isDrawerOpen: false,
      setIsDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
      drawerContent: 'notifications',
      setDrawerContent: (content) => set({ drawerContent: content }),
      resetDrawer: () => set({ isDrawerOpen: false, drawerContent: 'notifications' }),
    }),
    {
      name: 'sidebar-layout',
    },
  ),
);
