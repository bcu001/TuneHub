import { SidebarTrigger } from '@/components/ui/sidebar';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  // AvatarImage
} from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { useSetting } from '@/hooks/useSetting';
import { KineticText } from './ui/kinetic-text';

const Navbar = () => {
  const { isAuthenticated, user, signoutHandler } = useAuth();
  const { getSettingsQuery, updateSettingQuery } = useSetting();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border/60 bg-background/80 px-4 backdrop-blur-lg sm:h-16 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger
          size="icon"
          className="size-9"
          aria-label="Toggle sidebar"
        />
        <Link
          to={'/'}
          className="text-lg font-semibold tracking-tight text-primary"
        >
          <KineticText text="TuneHub" />
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {!isAuthenticated && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link to={'/login'}>Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to={'/register'}>Register</Link>
            </Button>
          </>
        )}

        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full"
                aria-label="User menu"
              >
                <Avatar className="size-8">
                  {/* <AvatarImage src={user.image} />  need to add image in user model */}
                  <AvatarFallback className="text-sm font-semibold">
                    {user?.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to={'/setting'}>Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={signoutHandler}
                  variant="destructive"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <AnimatedThemeToggler
          variant="hexagon"
          duration={600}
          fromCenter
          theme={getSettingsQuery.data?.theme || 'dark'}
          onThemeChange={(theme) => {
            updateSettingQuery.mutate({ theme });
          }}
        />
      </div>
    </header>
  );
};

export default Navbar;
