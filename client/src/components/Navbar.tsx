import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { isAuthenticated, user, signoutHandler } = useAuth();

  return (
    <header className="flex h-16 items-center border-b px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger size="icon-lg" />
        <span className="text-lg font-semibold">TuneHub</span>
      </div>
      <div className="ml-auto flex gap-4 ">
        {!isAuthenticated && (
          <>
            <Button variant={"default"}>
              <Link to={"/login"}>
                <span>Login</span>
              </Link>
            </Button>
            <Button variant={"default"}>
              <Link to={"/register"}>
                <span>Register</span>
              </Link>
            </Button>
          </>
        )}
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/bcu001.png" />
                <AvatarFallback>
                  {user?.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
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
      </div>
    </header>
  );
};

export default Navbar;
