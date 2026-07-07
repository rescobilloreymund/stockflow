import ThemeToggle from "./ThemeToggle";
import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";

export default function NavbarActions() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <NotificationButton />
      <UserMenu />
    </div>
  );
}
