import NavbarActions from "./NavbarActions";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center border-b bg-background px-6">
      {/* <SearchBar /> */}
      <div className="ml-auto items-center">
        <NavbarActions />
      </div>
    </header>
  );
}
