import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import useAuth from '@/hooks/useAuth';
import { Home, Search, ListMusic, Heart, Shield } from 'lucide-react';

import { Link, useLocation } from 'react-router';

interface menuProps {
  title: string;
  path: string;
  icon: React.ElementType;
}

const menu: menuProps[] = [
  { title: 'Home', path: '/', icon: Home },
  { title: 'Search', path: '/search', icon: Search },
  { title: 'Playlists', path: '/playlists', icon: ListMusic },
];

const library: menuProps[] = [
  { title: 'Liked Songs', path: '/liked', icon: Heart },
];

const AppSidebar = () => {
  const { isAuthenticated, user } = useAuth();
  const { setOpenMobile } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <Link
          to="/"
          onClick={() => setOpenMobile(false)}
          className="text-lg font-bold tracking-tight text-primary"
        >
          TuneHub
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path} onClick={() => setOpenMobile(false)}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isAuthenticated &&
                library.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                      tooltip={item.title}
                    >
                      <Link to={item.path} onClick={() => setOpenMobile(false)}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              {!isAuthenticated && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={'/login'} onClick={() => setOpenMobile(false)}>
                      <span>Log in to access library</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {isAuthenticated && user?.role === 'admin' && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin')}
                    tooltip="Admin Dashboard"
                  >
                    <Link to={'/admin'} onClick={() => setOpenMobile(false)}>
                      <Shield className="size-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
