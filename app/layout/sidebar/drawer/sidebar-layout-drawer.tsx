import { NotificationDrawer } from '@bluebird-monorepo/notifications';
import { useSidebarLayoutStore } from '../sidebar-layout.store';

export function SidebarLayoutDrawer() {
  const { isDrawerOpen, setIsDrawerOpen } = useSidebarLayoutStore();
  return (
    <NotificationDrawer
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      sx={{
        sheet: {
          position: 'relative',
          width: '350px !important',
          height: '100%',
          transform: 'none',
          transition: 'none',
          visibility: 'visible',
          bgcolor: 'var(--mantine-color-gray-0)',
          borderLeft: 'none',
          borderRight: '2px solid var(--mantine-color-gray-2)',
        },
        header: {
          bgcolor: 'white',
        },
      }}
    />
  );
}
