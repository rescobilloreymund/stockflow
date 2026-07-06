import { menuItems } from "@/constants/navigation";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">Inventory</h1>
      </div>

      <nav className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
