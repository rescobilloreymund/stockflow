"use client";
import { navigationSections } from "@/config/navigation";
import SidebarSection from "./SidebarSection";

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r bg-background">
      <div className="border-b px-6 py-5">
        <h1 className="text-lg font-bold">Inventory</h1>

        <p className="text-sm text-muted-foreground">Management System</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          {navigationSections.map((section) => (
            <SidebarSection key={section.id} section={section} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
